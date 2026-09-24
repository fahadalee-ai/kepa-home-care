import { SERVICES, type Service } from "./mock-data";

export type ServiceDetail = Service;

export const SERVICE_DETAILS: ServiceDetail[] = SERVICES;

export function serviceDetailById(id: string) {
  return SERVICE_DETAILS.find((s) => s.id === id);
}
