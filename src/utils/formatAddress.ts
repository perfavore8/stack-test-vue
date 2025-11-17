import { type Address } from '../types/organization.ts';

export function formatAddress(address: Address): string {
  const parts = [];
  if (address.city) parts.push(`г. ${address.city}`);
  if (address.street) parts.push(`ул. ${address.street}`);
  if (address.house) parts.push(`д. ${address.house}`);

  return parts.join(', ');
}
