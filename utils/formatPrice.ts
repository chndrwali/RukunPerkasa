export const formatPrice = (amount: number) => {
  const kurs = 15594;

  const convertedAmount = amount * kurs;

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 2,
  });

  return formatter.format(convertedAmount);
};
