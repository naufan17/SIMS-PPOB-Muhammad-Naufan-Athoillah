/**
 * Formats a date string into Indonesian standard format
 * @param dateString - The date string to format
 * @returns Formatted date string (e.g., "11 Januari 2026 12:00 WIB")
 */
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date);
};

/**
 * Formats a number into IDR currency format
 * @param amount - The amount to format
 * @param prefix - Optional prefix (e.g., "+ ", "- ")
 * @returns Formatted currency string (e.g., "Rp 50.000")
 */
export const formatCurrency = (amount: number, prefix: string = '') => {
  const formatted = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);

  return `${prefix}${formatted}`;
};
