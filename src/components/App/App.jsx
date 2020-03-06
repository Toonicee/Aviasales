import React from 'react';

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

  changeTransferHandler = (index, id) => {
    const { filterItems } = this.state;
    filterItems.forEach(item => {
      if (filterItems[0].checked) {
        this.setState({
          filterItems: (filterItems[item.id].checked = true),
        });
      }
      if (item.id === index) {
        this.setState({
          filterItems: (filterItems[item.id].checked = !filterItems[item.id].checked),
        });
      }
      if (!filterItems[0].checked && id === 0) {
        this.setState({
          filterItems: (filterItems[item.id].checked = false),
        });
      }
      if (!filterItems[item.id].checked) {
        this.setState({
          filterItems: (filterItems[0].checked = false),
        });
      }
    });
    const arrayCheckboxTrue = filterItems.filter(({ checked }) => checked);
    if (arrayCheckboxTrue.length === filterItems.length - 1) {
      this.setState({
        filterItems: (filterItems[0].checked = true),
      });
    }
    this.setState({ filterItems });
  };

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
          ticketsAll: [...ticketsAll, ...tickets],
          loading: false,
        });
        this.getTicketsInState();
      })
      .catch(() => this.getTicketsInState());
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
