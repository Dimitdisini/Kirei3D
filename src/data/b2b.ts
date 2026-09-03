export interface B2BProductOption {
  id: string;
  label: string;
  basePrice: number;
}

export const b2bProductOptions: B2BProductOption[] = [
  { id: 'trophy', label: 'Trophy / Piala Turnamen 3D (Base: Rp 85.000)', basePrice: 85000 },
  { id: 'medal', label: 'Medali Finisher Strava / Lari (Base: Rp 35.000)', basePrice: 35000 },
  { id: 'merch', label: 'Custom Keycap / Keychain Logo (Base: Rp 25.000)', basePrice: 25000 },
];

export const getTierDiscount = (qty: number): number => {
  if (qty >= 200) return 0.25; // 25%
  if (qty >= 100) return 0.2; // 20%
  if (qty >= 50) return 0.15; // 15%
  return 0.1; // 10%
};
