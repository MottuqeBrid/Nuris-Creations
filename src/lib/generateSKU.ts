/**
 * Generates a unique SKU for products
 * Format: NC-{TIMESTAMP}-{RANDOM}
 * Example: NC-1704567890-A3F2
 */
export function generateSKU(): string {
  // Get current timestamp (last 8 digits for brevity)
  const timestamp = Date.now().toString().slice(-8);

  // Generate 4-character random alphanumeric string
  const randomStr = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `NC-${timestamp}-${randomStr}`;
}
