import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import transferFormatter from '../../helper/transferFormatter';
import calculationOfArrivalTime from '../../helper/calculationOfArrivalTime';
import {
  TicketPreviewSegment,
  TicketPreviewLabel,
  TicketPreviewInput,
  TicketPreviewFlight,
} from './styled-components/styled-components';

const TicketSegment = ({ segments }) => {
  TicketSegment.defaultProps = {
    segments: [],
  };

  TicketSegment.propTypes = {
    segments: PropTypes.instanceOf(Array),
  };

  const getNormalTime = (h, min) => `${h}:${min < 10 ? `0${min}` : min}`;

  return segments.map(({ origin, destination, date, duration, stops }) => {
    const transplant = stops.reduce((acc, item) => `${item} ${acc}`, '');
    const hours = Math.floor(duration / 60);
    const minutes = duration - hours * 60;
    const newdate = new Date(date);

    const departureTime = getNormalTime(newdate.getHours(), newdate.getMinutes());
    return (
      <TicketPreviewSegment key={uniqueId()}>
        <TicketPreviewFlight>
          <TicketPreviewLabel>{`${origin} - ${destination}`}</TicketPreviewLabel>
          <TicketPreviewInput>{`${departureTime} - ${calculationOfArrivalTime(
            newdate,
            hours,
            minutes
          )}`}</TicketPreviewInput>
        </TicketPreviewFlight>
        <TicketPreviewFlight>
          <TicketPreviewLabel>В пути</TicketPreviewLabel>
          <TicketPreviewInput>{getNormalTime(hours, minutes)}м</TicketPreviewInput>
        </TicketPreviewFlight>
        <TicketPreviewFlight>
          <TicketPreviewLabel>{transferFormatter(stops)}</TicketPreviewLabel>
          <TicketPreviewInput>{transplant}</TicketPreviewInput>
        </TicketPreviewFlight>
      </TicketPreviewSegment>
    );
  });
};
export default TicketSegment;
