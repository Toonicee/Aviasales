import styled from 'styled-components';

const TicketPreviewSegment = styled.div`
  display: flex;
  text-align: left;

  &.ticket-preview__flight {
    width: 33%;
  }
`;

const TicketPreviewLabel = styled.p`
  color: #a0b0b9;
  letter-spacing: 0.5px;
  margin: 11px 0 0 0;
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
`;

const TicketPreviewInput = styled.p`
  color: #4a4a4a;
  margin: 0;
  font-size: 14px;
  line-height: 21px;
  font-weight: 600;
`;

const TicketPreviewFlight = styled.div`
  width: 35%;

  :nth-last-of-type(1) {
    width: auto;
  }
`;

export { TicketPreviewSegment, TicketPreviewLabel, TicketPreviewInput, TicketPreviewFlight };
