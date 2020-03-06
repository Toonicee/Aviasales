import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://front-test.beta.aviasales.ru/',
});

const API_URLS = {
  SEARCH: 'search',
  TICKETS: 'tickets?searchId=',
};

export default class Services {
  static getTicketsId = () => instance.get(API_URLS.SEARCH);

  static getAllTickets = id => instance.get(`${API_URLS.TICKETS}${id}`);
}
