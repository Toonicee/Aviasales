import React from 'react';

import Filter from '../Filter';
import Tabs from '../Tabs';
import Ticket from '../Ticket';
import Loading from '../Loading';
import { sortingArray } from '../../helper/index';
import Servisec from '../../servicec/servisec';
import { GlobalStyle, AppWrapper } from './styled-components/styled-componets';

import logo from '../../img/Logo.svg';

class App extends React.Component {
  inicialState = [
    { label: 'Все', id: 'all', inputValue: 0, checked: true },
    { label: 'Без пересадок', id: 'non-stop', inputValue: 1, checked: false },
    { label: '1 персадка', id: '1-trasplant', inputValue: 2, checked: false },
    { label: '2 пересадки', id: '2-transplant', inputValue: 3, checked: false },
    { label: '3 пересадки', id: '3-transplant', inputValue: 4, checked: false },
  ];

  servisec = new Servisec();

  constructor() {
    super();
    this.state = {
      ticketsAll: [],
      ticketId: null,
      loading: true,
      arrNameLabel: [...this.inicialState],
    };
  }

  componentDidMount() {
    this.servisec.getTicketsId().then(({ data }) => this.setState({ ticketId: data.searchId }));
    this.tickets();
  }

  changeTransferHandler = index => {
    const { arrNameLabel } = this.state;

    arrNameLabel.forEach((item, num) => {
      if (num === index) {
        arrNameLabel[num].checked = !arrNameLabel[num].checked;
      }
    });

    this.setState({ arrNameLabel });
  };

  tickets = () => {
    const { ticketId } = this.state;
    this.servisec
      .getAllTickets(ticketId)
      .then(res => {
        if (!res.data.stop) {
          const { tickets } = res.data;
          const { ticketsAll } = this.state;
          this.setState({
            ticketsAll: [...ticketsAll, ...tickets],
            loading: false,
          });
          this.tickets();
        }
      })
      .catch(() => this.tickets());
  };

  filterTicketsHandler = () => {
    const { ticketsAll, arrNameLabel } = this.state;
    if (arrNameLabel[0].checked) {
      return ticketsAll;
    }
    const filteredTicketsList = ticketsAll.filter(
      ticket => arrNameLabel[ticket.segments[0].stops.length + 1].checked
    );
    return filteredTicketsList;
  };

  sortDescending = () => {
    const { ticketsAll } = this.state;
    const tickets = sortingArray(ticketsAll, 'descending');
    this.setState({ ticketsAll: tickets });
  };

  sortByAscending = () => {
    const { ticketsAll } = this.state;
    const tickets = sortingArray(ticketsAll, 'ascending');
    this.setState({ ticketsAll: tickets });
  };

  render() {
    const { loading, arrNameLabel } = this.state;
    const allTickets = this.filterTicketsHandler();
    return (
      <AppWrapper>
        <GlobalStyle />
        <div key={1} className="header__logo">
          <img src={logo} alt="Логотип" />
        </div>
        <div key={2} className="sidebar">
          <Filter
            filterTransfer={this.filterTicketsHandler}
            transferChange={this.changeTransferHandler}
            arrNameLabel={arrNameLabel}
          />
        </div>
        <div key={3} className="main">
          <Tabs sortDescending={this.sortDescending} sortByAscending={this.sortByAscending} />
          {loading ? <Loading /> : <Ticket tickets={allTickets} />}
        </div>
      </AppWrapper>
    );
  }
}

export default App;
