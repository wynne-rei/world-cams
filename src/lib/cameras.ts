import camerasData from '../../data/cameras.json';
import type { Camera } from '@/types/camera';

export function getAllCameras(): Camera[] {
  return camerasData as Camera[];
}

export function getCameraById(id: string): Camera | undefined {
  return getAllCameras().find((c) => c.id === id);
}

export function getCameraIds(): string[] {
  return getAllCameras().map((c) => c.id);
}
