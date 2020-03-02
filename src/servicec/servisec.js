import axios from 'axios';

export default class Servisec {
  getTicketsId = async () => {
    const id = await axios.get('https://front-test.beta.aviasales.ru/search');
    return id;
  };

  getAllTickets = async id => {
    const tickets = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
    return tickets;
  };
}
