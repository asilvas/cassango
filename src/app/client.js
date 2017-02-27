import {Client} from '../client/promise';
import superagent from 'superagent';

window.Client = Client;
window.request = superagent;
