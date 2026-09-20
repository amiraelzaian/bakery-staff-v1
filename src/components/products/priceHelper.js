export function getDisplayPrice(product) {
  if (product.sizes?.length > 0) {
    const prices = product.sizes.map((s) => s.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max ? `${min} EGP` : `${min}–${max} EGP`;
  }
  if (product.price != null) return `${product.price} EGP`;
  return "—";
}