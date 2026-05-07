#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CAMERAS_PATH = resolve(__dirname, '..', 'data', 'cameras.json');

const TIMEOUT_MS = 20000;
const CONCURRENCY = 6;
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

/**
 * Probe a single target. Strategy depends on the kind:
 * - 'youtubeEmbed' (embedType=youtube videoId): oEmbed must return 200 — if
 *   the owner disabled embedding the player won't render on the site, so
 *   that's a real failure for our purposes.
 * - everything else: HEAD then GET fallback. Accept any status < 400 plus
 *   401/403 for sourceUrl (some camera portals reject HEAD/automated UAs
 *   but still serve the page in real browsers).
 */
async function probe(target) {
  if (target.kind === 'youtubeEmbed') {
    const oembed = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${target.videoId}&format=json`;
    return fetchOnce(oembed, 'GET');
  }
  const head = await fetchOnce(target.url, 'HEAD');
  if (head.ok) return head;
  if (head.status === 401 || head.status === 403 || head.status === 405 || head.status === 0) {
    const get = await fetchOnce(target.url, 'GET');
    // Auth-walled but reachable pages are good enough for sourceUrl probes.
    if (target.kind === 'sourceUrl' && (get.status === 401 || get.status === 403)) {
      return { ok: true, status: get.status, reason: null };
    }
    return get;
  }
  return head;
}

async function fetchOnce(url, method) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'user-agent': UA, accept: '*/*' },
    });
    return {
      ok: res.ok,
      status: res.status,
      reason: res.ok ? null : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 0,
      reason: err?.name === 'AbortError' ? 'timeout' : (err?.message ?? 'fetch error'),
    };
  } finally {
    clearTimeout(timer);
  }
}

async function runPool(items, worker, size) {
  const results = new Array(items.length);
  let cursor = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (true) {
        const i = cursor++;
        if (i >= items.length) return;
        results[i] = await worker(items[i], i);
      }
    }),
  );
  return results;
}

async function main() {
  const raw = readFileSync(CAMERAS_PATH, 'utf8');
  const cameras = JSON.parse(raw);

  const targets = [];
  for (const cam of cameras) {
    targets.push({
      id: cam.id,
      name: cam.name,
      kind: 'sourceUrl',
      url: cam.sourceUrl,
    });
    if (cam.embedType === 'youtube') {
      targets.push({
        id: cam.id,
        name: cam.name,
        kind: 'youtubeEmbed',
        videoId: cam.embedUrl,
        url: `https://www.youtube.com/watch?v=${cam.embedUrl}`,
      });
    } else if (
      (cam.embedType === 'iframe' || cam.embedType === 'link') &&
      /^https?:\/\//.test(cam.embedUrl)
    ) {
      targets.push({
        id: cam.id,
        name: cam.name,
        kind: 'embedUrl',
        url: cam.embedUrl,
      });
    }
  }

  const results = await runPool(
    targets,
    async (t) => ({ ...t, ...(await probe(t)) }),
    CONCURRENCY,
  );

  const failures = results.filter((r) => !r.ok);
  const summary = {
    total: cameras.length,
    probesRun: results.length,
    failed: failures.length,
    checkedAt: new Date().toISOString(),
  };

  console.log(JSON.stringify(summary, null, 2));
  if (failures.length > 0) {
    console.log('\n--- Failures ---');
    for (const f of failures) {
      console.log(`[${f.id}] ${f.kind} ${f.url}\n  → ${f.reason}`);
    }
  }

  if (process.env.GITHUB_OUTPUT) {
    const fs = await import('node:fs');
    const lines = [
      `failed=${failures.length}`,
      `total=${results.length}`,
      'report<<EOF',
      failures
        .map((f) => `- **${f.name}** (\`${f.id}\`, ${f.kind}): ${f.reason}\n  ${f.url}`)
        .join('\n') || '(none)',
      'EOF',
    ];
    fs.appendFileSync(process.env.GITHUB_OUTPUT, lines.join('\n') + '\n');
  }

  process.exit(failures.length === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
