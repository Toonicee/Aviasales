import React from 'react';
import { uniqueId } from 'lodash';
import PropTypes from 'prop-types';

import { prettify } from '../../helper';
import TicketSegment from '../TicketSegment';
import {
  TicketWrapper,
  TicketHeader,
  TicketCarrier,
  TicketPrice,
} from './styled-components/styled-components';

const Ticket = ({ tickets }) => {
  Ticket.defaultProps = {
    tickets: [],
  };

  Ticket.propTypes = {
    tickets: PropTypes.instanceOf(Array),
  };
  let count = 0;
  return (
    <>
      {tickets.map(({ price, carrier, segments }) => {
        count += 1;
        if (count > 5) {
          return null;
        }

        return (
          <TicketWrapper key={uniqueId()}>
            <TicketHeader>
              <TicketPrice>
                <span>{`${prettify(price)} Р`}</span>
              </TicketPrice>
              <div className="ticket-preview__carriers">
                <TicketCarrier>
                  <img
                    className="ticket-carrier__img"
                    src={`//pics.avs.io/99/36/${carrier}.png`}
                    width="100"
                    height="40"
                    alt="Логотип авиокомпании"
                  />
                </TicketCarrier>
              </div>
            </TicketHeader>
            <TicketSegment key={uniqueId()} segments={segments} />
          </TicketWrapper>
        );
      })}
    </>
  );
};

export default Ticket;