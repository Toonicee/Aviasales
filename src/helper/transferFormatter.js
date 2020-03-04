const transferFormatter = stops => {
  let postfix;
  if (stops.length === 1) {
    postfix = `${stops.length} пересадка`;
  }
  if (stops.length > 1) {
    postfix = `${stops.length} пересадки`;
  }
  if (stops.length === 0) {
    postfix = 'без пересадок';
  }
  return postfix;
};

export default transferFormatter;
