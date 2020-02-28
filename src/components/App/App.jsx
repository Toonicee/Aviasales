import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Filter from '../filter-list';
import Tabs from '../Tabs';
import Ticket from '../Ticket';
import Loading from '../Loading';
import Servisec from '../../servicec/servisec';

import './App.css';
import logo from '../../img/Logo.svg';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #E5E5E5;
    font-family: 'Open Sans', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #4A4A4A;
    line-height: 20px;

  }
`;

class App extends React.Component {
  // eslint-disable-next-line react/sort-comp
  constructor() {
    super();
    this.state = {
      ticketsAll: [],
      ticketId: null,
      loading: true,
    };
  }

  servisec = new Servisec();

  componentDidMount() {
    this.servisec.getTicketsId().then(({ data }) => this.setState({ ticketId: data.searchId }));
    this.tickets();
    // const { ticketId } = this.state;
    // this.servisec.getTicketsId().then(res => this.setState({ ticketId: res.data.searchId }));
    // this.servisec
    //   .getAllTickets(ticketId)
  }

  tickets = () => {
    const { ticketId } = this.state;
    if (ticketId) {
      this.servisec
        .getAllTickets(ticketId)
        .then(res => {
          if (res.data.stop) {
            console.log('STOP');
            return;
          }
          const { tickets } = res.data;
          const { ticketsAll } = this.state;
          this.setState({ ticketsAll: [...ticketsAll, ...tickets], loading: false });
          this.tickets();
        })
        .catch(err => this.tickets());
    }
  };

  sortDescending = () => {
    const { ticketsAll } = this.state;
    const newArr = ticketsAll.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
    this.setState({ ticketsAll: newArr });
  };

  sortByAscending = () => {
    const { ticketsAll } = this.state;
    const newArr = ticketsAll.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      // a должно быть равным b
      return 0;
    });
    this.setState({ ticketsAll: newArr });
  };

  render() {
    console.log(this.state);
    const { ticketsAll, loading } = this.state;
    const ticket = loading ? <Loading /> : <Ticket tickets={ticketsAll} />;
    return (
      <div className="App">
        <GlobalStyle />
        <div className="header__logo">
          <img src={logo} />
        </div>
        <div className="sidebar">
          <Filter />
        </div>
        <div className="main">
          <Tabs sortDescending={this.sortDescending} sortByAscending={this.sortByAscending} />
          {ticket}
        </div>
      </div>
    );
  }
}

export default App;
