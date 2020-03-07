import React from 'react';
import { uniqueId } from 'lodash';

import Filter from '../Filter';
import Tabs from '../Tabs';
import Tickets from '../Tickets';
import Loading from '../Loading';
import ticketSorting from '../../helper/ticketSorting';
import Services from '../../services/services';
import { GlobalStyle, AppWrapper } from './styled-components/styled-componets';

import logo from '../../img/Logo.svg';

class App extends React.Component {
  initialStateLabel = [
    { label: 'Все', id: 0, checked: true },
    { label: 'Без пересадок', id: 1, checked: true },
    { label: '1 персадка', id: 2, checked: true },
    { label: '2 пересадки', id: 3, checked: true },
    { label: '3 пересадки', id: 4, checked: true },
  ];

  constructor() {
    super();
    this.state = {
      ticketsAll: [],
      ticketId: null,
      loading: true,
      filterItems: this.initialStateLabel,
    };
  }

  componentDidMount() {
    Services.getTicketsId().then(({ data }) => {
      this.setState({ ticketId: data.searchId });
      this.getTicketsInState();
    });
  }

  getTicketsInState = () => {
    const { ticketId } = this.state;
    Services.getAllTickets(ticketId)
      .then(res => {
        if (res.data.stop) {
          return;
        }
        const { tickets } = res.data;
        const { ticketsAll } = this.state;
        this.setState({
          ticketsAll: [...ticketsAll, ...this.addIdInTickets(tickets)],
          loading: false,
        });
        this.getTicketsInState();
      })
      .catch(() => this.getTicketsInState());
  };

  addIdInTickets = arrTickets => arrTickets.map(item => ({ ...item, id: uniqueId() }));

  changeTransferHandler = (index, id) => {
    const { filterItems } = this.state;
    const newFilterItems = [...filterItems];

    newFilterItems.forEach(item => {
      if (newFilterItems[0].checked) {
        newFilterItems[item.id] = { ...item, checked: true };
      }
      if (item.id === index) {
        newFilterItems[item.id] = { ...item, checked: !item.checked };
      }
      if (!newFilterItems[0].checked && id === 0) {
        newFilterItems[item.id] = { ...item, checked: false };
      }
      if (!newFilterItems[item.id].checked) {
        newFilterItems[0].checked = false;
      }
    });
    const arrayCheckboxTrue = newFilterItems.filter(({ checked }) => checked);
    if (arrayCheckboxTrue.length === newFilterItems.length - 1) {
      newFilterItems[0].checked = true;
    }
    this.setState({ filterItems: newFilterItems });
  };

  filterAllTickets = () => {
    const { ticketsAll, filterItems } = this.state;
    const filteredTicketsList = ticketsAll.filter(
      ticket => filterItems[ticket.segments[0].stops.length + 1].checked
    );
    return filteredTicketsList;
  };

  sortAllTickets = ({ target: { name } }) => {
    const { ticketsAll } = this.state;
    const tickets = ticketSorting(ticketsAll, name);
    this.setState({ ticketsAll: tickets });
  };

  render() {
    const { loading, filterItems } = this.state;
    return (
      <AppWrapper>
        <GlobalStyle />
        <div className="header__logo">
          <img src={logo} alt="логотип" />
        </div>
        <div className="sidebar">
          <Filter transferChange={this.changeTransferHandler} filterItems={filterItems} />
        </div>
        <div className="main">
          <Tabs sortAllTickets={this.sortAllTickets} />
          {loading ? <Loading /> : <Tickets tickets={this.filterAllTickets()} />}
        </div>
      </AppWrapper>
    );
  }
}

export default App;
