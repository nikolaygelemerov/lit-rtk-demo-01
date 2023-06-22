import { CubbyFacility, Id } from '@types';

// Overload signatures
export async function fetchFacilities(): Promise<CubbyFacility[]>;
export async function fetchFacilities(facilityId: Id): Promise<CubbyFacility | null>;

// Implementation
export async function fetchFacilities(
  facilityId?: Id
): Promise<CubbyFacility[] | CubbyFacility | null> {
  const referer = 'localhost';
  // TODO - Replace with STOREFRONT_KEY
  const bearerToken = 'e629e838-3786-45b0-adcc-3f681ae97366';

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
