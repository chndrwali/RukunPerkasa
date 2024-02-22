export const truncateText = (str: string) => {
  if (str.length < 25) return str; // Return the original string if it's already short enough

  return str.substring(0, 25) + '...'; // Use concatenation (+) to combine strings
};
