import axios from 'axios';
import { enderecoAPI } from '../models/enderecoAPI';

export async function getEnderecoAPI(cep: string) {
  if (cep.length === 8) {
    return await axios.get<enderecoAPI>(`http://viacep.com.br/ws/${cep}/json/`);
  }
}
