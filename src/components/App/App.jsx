import React from 'react';

import Filter from '../Filter';
import Tabs from '../Tabs';
import Ticket from '../Ticket';
import Loading from '../Loading';
import ticketSorting from '../../helper/ticketSorting';
import Services from '../../services/services';
import { GlobalStyle, AppWrapper } from './styled-components/styled-componets';

import logo from '../../img/Logo.svg';

class App extends React.Component {
  initialStateLabel = [
    { label: 'Все', id: 'all', inputValue: 0, checked: true },
    { label: 'Без пересадок', id: 'non-stop', inputValue: 1, checked: true },
    { label: '1 персадка', id: '1-transplant', inputValue: 2, checked: true },
    { label: '2 пересадки', id: '2-transplant', inputValue: 3, checked: true },
    { label: '3 пересадки', id: '3-transplant', inputValue: 4, checked: true },
  ];

  services = new Services();

  constructor() {
    super();
    this.state = {
      ticketsAll: [],
      ticketId: null,
      loading: true,
      filterItems: [...this.initialStateLabel],
    };
  }

  componentDidMount() {
    this.services.getTicketsId().then(({ data }) => this.setState({ ticketId: data.searchId }));
    this.getTicketsInState();
  }

  changeTransferHandler = (index, inputValue) => {
    const { filterItems } = this.state;
    filterItems.forEach(item => {
      if (filterItems[0].checked) {
        filterItems[item.inputValue].checked = true;
      }
      if (item.inputValue === index) {
        filterItems[item.inputValue].checked = !filterItems[item.inputValue].checked;
      }
      if (!filterItems[0].checked && inputValue === 0) {
        filterItems[item.inputValue].checked = false;
      }
      if (!filterItems[item.inputValue].checked) {
        filterItems[0].checked = false;
      }
    });
    const arrayCheckboxTrue = filterItems.filter(({ checked }) => checked);
    if (arrayCheckboxTrue.length === filterItems.length - 1) {
      filterItems[0].checked = true;
    }
    this.setState({ filterItems });
  };

  getTicketsInState = () => {
    const { ticketId } = this.state;
    this.services
      .getAllTickets(ticketId)
      .then(res => {
        if (res.data.stop) {
          return;
        }
        const { tickets } = res.data;
        const { ticketsAll } = this.state;
        this.setState({
          ticketsAll: [...ticketsAll, ...tickets],
          loading: false,
        });
        this.getTicketsInState();
      })
      .catch(() => this.getTicketsInState());
  };

  filterAllTickets = () => {
    const { ticketsAll, filterItems } = this.state;
    if (filterItems[0].checked) {
      return ticketsAll;
    }
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
          <Filter
            filterAllTickets={this.filterAllTickets}
            transferChange={this.changeTransferHandler}
            filterItems={filterItems}
          />
        </div>
        <div className="main">
          <Tabs sortAllTickets={this.sortAllTickets} />
          {loading ? <Loading /> : <Ticket tickets={this.filterAllTickets} />}
        </div>
      </AppWrapper>
    );
  }
}

export default App;
