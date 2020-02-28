import React from 'react';
import {
  TicketPreviewSegment,
  TicketPreviewLabel,
  TicketPreviewInput,
  TicketPreviewFlight,
} from './styled-components/styled-components';

const TicketSegment = props => {
  const { segments } = props;
  return segments.map(({ origin, destination, date, duration, stops }) => {
    const carr = stops.reduce((acc, item) => `${item}, ${acc}`, '');
    const h = Math.floor(duration / 60);
    const min = duration - h * 60;
    const newdate = new Date(date);
    let stop;
    switch (stops.length) {
      case 1:
        stop = '1 пересадка';
        break;
      case 2 && 3:
        stop = `${stops.length} пересадки`;
        break;
      default:
        stop = 'без пересадок';
    }

    const arrivalTimes = (dat, hours, minutes) => {
      let h = dat.getHours() + hours;
      const allMinetes = dat.getMinutes() + minutes;
      let minut = 0;
      if (h >= 24) {
        h -= 24;
        if (h >= 24) {
          h -= 24;
        }
      }
      if (allMinetes >= 60) {
        minut = allMinetes - 60;
        h += 1;
      } else {
        minut = allMinetes;
      }

      return `${h < 10 ? `0${h}` : h}:${minut < 10 ? `0${minut}` : minut}`;
    };
    const departureTime = `${newdate.getHours()}:${
      newdate.getMinutes() < 10 ? `0${newdate.getMinutes()}` : newdate.getMinutes()
    }`;
    return (
      <TicketPreviewSegment>
        <TicketPreviewFlight>
          <TicketPreviewLabel>{`${origin} - ${destination}`}</TicketPreviewLabel>
          <TicketPreviewInput>{`${departureTime} - ${arrivalTimes(
            newdate,
            h,
            min
          )}`}</TicketPreviewInput>
        </TicketPreviewFlight>
        <TicketPreviewFlight>
          <TicketPreviewLabel>В пути</TicketPreviewLabel>
          <TicketPreviewInput>{`${h}ч ${min < 10 ? `0${min}` : min}м`}</TicketPreviewInput>
        </TicketPreviewFlight>
        <TicketPreviewFlight>
          <TicketPreviewLabel>{stop}</TicketPreviewLabel>
          <TicketPreviewInput>{carr}</TicketPreviewInput>
        </TicketPreviewFlight>
      </TicketPreviewSegment>
    );
  });
};
// {origin: "MOW", destination: "HKT", date: "2020-03-03T23:58:00.000Z", stops: Array(3), duration: 1268}
export default TicketSegment;
