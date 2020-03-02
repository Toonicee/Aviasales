import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import { transferFormatter, arrivalTimes } from '../../helper/index';
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

  return segments.map(({ origin, destination, date, duration, stops }) => {
    const carr = stops.reduce((acc, item) => `${item}, ${acc}`, '');
    const h = Math.floor(duration / 60);
    const min = duration - h * 60;
    const newdate = new Date(date);

    const departureTime = `${newdate.getHours()}:${
      newdate.getMinutes() < 10 ? `0${newdate.getMinutes()}` : newdate.getMinutes()
    }`;
    return (
      <TicketPreviewSegment key={uniqueId()}>
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
          <TicketPreviewLabel>{transferFormatter(stops)}</TicketPreviewLabel>
          <TicketPreviewInput>{carr}</TicketPreviewInput>
        </TicketPreviewFlight>
      </TicketPreviewSegment>
    );
  });
};
export default TicketSegment;
