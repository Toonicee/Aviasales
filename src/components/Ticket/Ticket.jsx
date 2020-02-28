import React from 'react';
import styled from 'styled-components';

import TicketSegment from '../ticket-segment';

const TicketWrapper = styled.div`
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  margin-top: 20px;
  padding: 20px;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TicketCarrier = styled.div`
  margin: 0 30px 0 0;
`;

const TicketPrice = styled.div`
  color: #2196f3;
  margin: 7px 0 0 0px;
  font-size: 24px;
  line-height: 24px;
`;

const Ticket = ({ tickets }) => {
  let count = 0;
  return (
    <>
      {tickets.map(({ price, carrier, segments }) => {
        count += 1;
        if (count > 6) {
          return;
        }
        return (
          <TicketWrapper stat={100}>
            <TicketHeader>
              <TicketPrice>
                <span>{`${price} Р`}</span>
              </TicketPrice>
              <div className="ticket-preview__carriers">
                <TicketCarrier>
                  <img
                    className="ticket-carrier__img"
                    src={`//pics.avs.io/99/36/${carrier}.png`}
                    width="100"
                    height="40"
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

export default Ticket;

// price: 60805
// carrier: "SU"
// segments: Array(2)
// 0: {origin: "MOW", destination: "HKT", date: "2020-03-03T23:58:00.000Z", stops: Array(3), duration: 1268}
// 1: {origin: "MOW", destination: "HKT", date: "2020-03-23T23:44:00.000Z", stops: Array(3), duration: 1861}
