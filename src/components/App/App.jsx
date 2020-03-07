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
    { value: 'Без пересадок', id: 1, isChecked: true },
    { value: '1 персадка', id: 2, isChecked: true },
    { value: '2 пересадки', id: 3, isChecked: true },
    { value: '3 пересадки', id: 4, isChecked: true },
  ];

  constructor() {
    super();
    this.state = {
      ticketsAll: [],
      ticketId: null,
      loading: true,
      filterItems: this.initialStateLabel,
      inputAll: true,
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

  handleAllChecked = ({ target }) => {
    const { filterItems, inputAll } = this.state;
    const newFilterItems = [...filterItems];
    newFilterItems.forEach((item, index) => {
      newFilterItems[index] = { ...item, isChecked: target.checked };
    });
    this.setState({ inputAll: !inputAll });
    this.setState({ filterItems: newFilterItems });
  };

  handleCheckChieldElement = ({ target }) => {
    const { filterItems } = this.state;
    const newFilterItems = [...filterItems];
    newFilterItems.forEach((item, index) => {
      if (item.value === target.value) {
        newFilterItems[index] = { ...item, isChecked: target.checked };
      }
    });
    const arrayCheckboxTrue = newFilterItems.filter(({ isChecked }) => isChecked);
    if (arrayCheckboxTrue.length === filterItems.length - 1) {
      this.setState({ inputAll: false });
    }
    if (arrayCheckboxTrue.length === 4) {
      this.setState({ inputAll: true });
    }
    this.setState({ filterItems: newFilterItems });
  };

  filterAllTickets = () => {
    const { ticketsAll, filterItems } = this.state;
    const filteredTicketsList = ticketsAll.filter(
      ticket => filterItems[ticket.segments[0].stops.length].isChecked
    );
    return filteredTicketsList;
  };

  sortAllTickets = ({ target: { name } }) => {
    const { ticketsAll } = this.state;
    const tickets = ticketSorting(ticketsAll, name);
    this.setState({ ticketsAll: tickets });
  };

  render() {
    const { loading, filterItems, inputAll } = this.state;
    return (
      <AppWrapper>
        <GlobalStyle />
        <div className="header__logo">
          <img src={logo} alt="логотип" />
        </div>
        <div className="sidebar">
          <Filter
            handleCheckChieldElement={this.handleCheckChieldElement}
            handleAllChecked={this.handleAllChecked}
            filterItems={filterItems}
            inputAll={inputAll}
          />
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
