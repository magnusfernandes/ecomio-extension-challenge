import { Trip, TripResponse } from '../models';

const BASE_URL = 'http://localhost:3400/api/v1';

export const fetchSustainabilityScore = async (trips: Trip[]) => {
  let payload = {
    trips,
  };

  const resp = await fetch(`${BASE_URL}/trips/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return await resp.json();
};
