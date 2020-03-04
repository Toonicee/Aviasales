const ticketSorting = (array, index = 'cheapest') => {
  return array.sort((prev, next) => {
    if (index === 'cheapest') {
      return prev.price - next.price;
    }
    if (index === 'fastest') {
      return (
        prev.segments.reduce((acc, { duration }) => duration + acc, 0) -
        next.segments.reduce((acc, { duration }) => duration + acc, 0)
      );
    }
    return null;
  });
};

export default ticketSorting;
