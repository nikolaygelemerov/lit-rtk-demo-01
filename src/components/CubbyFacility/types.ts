export type Id = number;
type Price = number;
type Size = number;

export interface CubbyPricingGroupFacility {
  category: string;
  name: string;
  value: number;
}

export interface CubbyPricingGroup {
  availableSpaceCount: number;
  facilities: CubbyPricingGroupFacility[];
  facilityId: Id;
  id: Id;
  name: string;
  price: Price;
  size: Size;
}

export interface CubbyGroup {
  name: string;
  pricingGroups: CubbyPricingGroup[];
}

export interface CubbyFacility {
  facility: { description: string; id: Id; name: string };
  groups: CubbyGroup[];
}
