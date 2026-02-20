export const saveProdectIdToLocalStorage = (
  productId: string,
  quantity: number,
) => {
  try {
    const existingIds = JSON.parse(
      localStorage.getItem("cartProductIds") || "{}",
    );
    if (!existingIds[productId]) {
      existingIds[productId] = quantity;
    } else {
      existingIds[productId] += quantity;
    }
    localStorage.setItem("cartProductIds", JSON.stringify(existingIds));
  } catch (error) {
    console.error("Error saving product ID to localStorage:", error);
  }
};

export const removeProductIdFromLocalStorage = (productId: string) => {
  try {
    const existingIds = JSON.parse(
      localStorage.getItem("cartProductIds") || "{}",
    );
    delete existingIds[productId];
    localStorage.setItem("cartProductIds", JSON.stringify(existingIds));
  } catch (error) {
    console.error("Error removing product ID from localStorage:", error);
  }
};

export const getProdectIdFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("cartProductIds") || "{}");
  } catch (error) {
    console.error("Error getting product IDs from localStorage:", error);
    return {};
  }
};

export const clearProdectIdFromLocalStorage = () => {
  try {
    localStorage.removeItem("cartProductIds");
  } catch (error) {
    console.error("Error clearing product IDs from localStorage:", error);
  }
};
