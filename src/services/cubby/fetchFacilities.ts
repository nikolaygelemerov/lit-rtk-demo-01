import { CubbyFacility, Id } from '@types';

// Overload signatures
export async function fetchFacilities(): Promise<CubbyFacility[]>;
export async function fetchFacilities(facilityId: Id): Promise<CubbyFacility | null>;

// Implementation
export async function fetchFacilities(
  facilityId?: Id
): Promise<CubbyFacility[] | CubbyFacility | null> {
  const referer = 'localhost';
  const bearerToken = STOREFRONT_KEY;

  try {
    // eslint-disable-next-line compat/compat
    const response = await fetch('http://localhost:8080/marketing/v1/search', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        Referer: referer
      },
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as CubbyFacility[];

    if (facilityId) {
      const facility = data.find((facility) => facility.facility.id === facilityId);

      if (facility) {
        return facility;
      }
    } else {
      return data;
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return null;
}
