import React from 'react';
import PropTypes from 'prop-types';

import formattingPrices from '../../helper/formattingPrices';
import TicketSegment from '../TicketSegment';
import {
  TicketWrapper,
  TicketHeader,
  TicketCarrier,
  TicketPrice,
} from './styled-components/styled-components';

const Tickets = ({ tickets }) => {
  let count = 0;
  console.log('111');
  return (
    <>
      {tickets.map(({ price, carrier, segments }) => {
        count += 1;
        if (count > 5) {
          return null;
        }
        return (
          <TicketWrapper key={count + 1}>
            <TicketHeader>
              <TicketPrice>
                <span>{`${formattingPrices(price)} Р`}</span>
              </TicketPrice>
              <div className="ticket-preview__carriers">
                <TicketCarrier>
                  <img
                    className="ticket-carrier__img"
                    src={`//pics.avs.io/99/36/${carrier}.png`}
                    width="100"
                    height="40"
                    alt="Логотип авиакомпании"
                  />
                </TicketCarrier>
              </div>
            </TicketHeader>
            <TicketSegment segments={segments} />
          </TicketWrapper>
        );
      })}
    </>
  );
};

const areEqual = (prevProps, nextProps) => JSON.stringify(prevProps) === JSON.stringify(nextProps);

Tickets.propTypes = {
  tickets: PropTypes.instanceOf(Array).isRequired,
};

export default React.memo(Tickets, areEqual);
