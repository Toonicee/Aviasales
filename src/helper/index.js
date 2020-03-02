export const transferFormatter = stops => {
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

export const arrivalTimes = (data, hours, min) => {
  let hour = data.getHours() + hours;
  const allMinetes = data.getMinutes() + min;
  let minut = 0;
  if (hour >= 24) {
    hour -= 24;
    if (hour >= 24) {
      hour -= 24;
    }
  }
  if (allMinetes >= 60) {
    minut = allMinetes - 60;
    hour += 1;
  } else {
    minut = allMinetes;
  }

  return `${hour < 10 ? `0${hour}` : hour}:${minut < 10 ? `0${minut}` : minut}`;
};

export const sortingArray = (array, index = 'descending') => {
  if (index === 'descending') {
    return array.sort((ticketMin, ticketMax) => {
      if (ticketMin.price < ticketMax.price) return -1;
      if (ticketMin.price > ticketMax.price) return 1;
      return 0;
    });
  }
  if (index === 'ascending') {
    return array.sort((ticketMin, ticketMax) => {
      if (ticketMin.price > ticketMax.price) return -1;
      if (ticketMin.price < ticketMax.price) return 1;
      return 0;
    });
  }
  return false;
};

export const prettify = num => {
  const price = num.toString();
  return price.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, `$1 `);
};
