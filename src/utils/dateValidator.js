
export const isFutureDate = (selectedDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // remove time component
  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);
  return selected >= today;
};
