import React, { useState } from 'react';
import style from './Formulario.module.scss';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getEnderecoAPI } from '../../services/enderecoService';
import dayjs from 'dayjs';
import { enderecoAPI } from '../../models/enderecoAPI';

const Formulario: React.FC = () => {
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState(null);
  const [contato, setContato] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCEP] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUF] = useState('');

  const getEndereco = (cep: string) => {
    getEnderecoAPI(cep)
      .then((resp) => {
        const data: enderecoAPI | undefined = resp?.data;
        if (data) {
          setEndereco(data.logradouro);
          setComplemento(data.complemento);
          setBairro(data.bairro);
          setCidade(data.localidade);
          setUF(data.uf);
        }
      })
      .catch((err) => console.log(err));
  };

  const onformSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert('Dados enviados com sucesso');
    console.log({
      nome,
      nascimento: dayjs(nascimento).format('DD/MM/YYYY'),
      contato,
      email,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
    });
  };

  return (
    <form className={style.Formulario} onSubmit={onformSubmit}>
      <h2>Formulário de Cadastro</h2>
      <h3>Dados Pessoais</h3>

      <TextField
        id="name"
        label="Nome Completo"
        variant="outlined"
        size="small"
        required
        value={nome}
        onChange={(event) => setNome(event.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Nascimento"
          format="DD/MM/YYYY"
          disableFuture
          slotProps={{ textField: { size: 'small', required: true } }}
          value={nascimento}
          onChange={(event) => setNascimento(event)}
        />
      </LocalizationProvider>

      <TextField
        id="contato"
        label="Contato"
        variant="outlined"
        size="small"
        required
        InputProps={{ inputProps: { maxLength: 11 } }}
        value={contato}
        onChange={(event) => setContato(event.target.value)}
        placeholder="(XX) XXXXX-XXXX"
      />

      <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        size="small"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <h3>Endereço</h3>

      <TextField
        id="cep"
        label="CEP"
        variant="outlined"
        size="small"
        required
        InputProps={{ inputProps: { minLength: 8, maxLength: 8 } }}
        value={cep}
        onChange={(event) => setCEP(event.target.value)}
        onBlur={(event) => getEndereco(event.target.value)}
      />

      <TextField
        id="endereco"
        label="Endereço"
        variant="outlined"
        size="small"
        required
        value={endereco}
        onChange={(event) => setEndereco(event.target.value)}
      />

      <TextField
        id="numero"
        label="Numero"
        variant="outlined"
        type="number"
        size="small"
        required
        InputProps={{ inputProps: { min: 1 } }}
        value={numero}
        onChange={(event) => setNumero(event.target.value)}
      />

      <TextField
        id="complemento"
        label="Complemento"
        variant="outlined"
        size="small"
        value={complemento}
        onChange={(event) => setComplemento(event.target.value)}
      />

      <TextField
        id="bairro"
        label="Bairro"
        variant="outlined"
        size="small"
        required
        value={bairro}
        onChange={(event) => setBairro(event.target.value)}
      />

      <TextField
        id="cidade"
        label="Cidade"
        variant="outlined"
        size="small"
        required
        value={cidade}
        onChange={(event) => setCidade(event.target.value)}
      />

      <TextField
        id="uf"
        label="UF"
        variant="outlined"
        size="small"
        required
        InputProps={{ inputProps: { maxLength: 2 } }}
        value={uf}
        onChange={(event) => setUF(event.target.value)}
      />

      <Button variant="contained" type="submit">
        Enviar
      </Button>
    </form>
  );
};

export default Formulario;
