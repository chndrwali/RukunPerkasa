export const formatPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR', // Use the correct Indonesian rupiah currency code
    minimumFractionDigits: 2, // Ensure two decimal places
  });

  return formatter.format(amount);
};
