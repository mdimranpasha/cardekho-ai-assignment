export function formatPrice(priceLakh) {
  if (priceLakh == null) {
    return "N/A";
  }

  return `Rs. ${Number(priceLakh).toFixed(2)} lakh`;
}

export function formatMileage(mileageKmpl) {
  if (mileageKmpl == null) {
    return "N/A";
  }

  return `${Number(mileageKmpl).toFixed(1)} km/l`;
}

export function formatLabel(value) {
  if (!value) {
    return "N/A";
  }

  return value
    .toString()
    .toLowerCase()
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
