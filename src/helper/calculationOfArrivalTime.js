const calculationOfArrivalTime = (data, hours, min) => {
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

export default calculationOfArrivalTime;
