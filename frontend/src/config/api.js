export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const DEFAULT_CAR_IMAGE = "/images/default-car.png";

async function parseResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage =
      payload?.errors?.join(", ") ||
      payload?.message ||
      "Something went wrong while talking to the server.";
    throw new Error(errorMessage);
  }

  return payload;
}

export async function fetchRecommendations(preferences) {
  const response = await fetch(`${API_BASE_URL}/api/recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(preferences)
  });

  const payload = await parseResponse(response);
  return Array.isArray(payload?.data) ? payload.data : [];
}

export async function compareCars(carIds) {
  const response = await fetch(`${API_BASE_URL}/api/compare`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ carIds })
  });

  const payload = await parseResponse(response);
  return Array.isArray(payload?.data) ? payload.data : [];
}
