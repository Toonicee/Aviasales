const ticketSorting = (array, name = 'cheapest') => {
  return array.sort((prev, next) => {
    if (name === 'cheapest') {
      return prev.price - next.price;
    }
    if (name === 'fastest') {
      return (
        prev.segments.reduce((acc, { duration }) => duration + acc, 0) -
        next.segments.reduce((acc, { duration }) => duration + acc, 0)
      );
    }
    return null;
  });
};

export default ticketSorting;
