import axios from 'axios';

export default class Servisec {
  getTicketsId = async () => await axios.get('https://front-test.beta.aviasales.ru/search');

  getAllTickets = async id =>
    await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
}
