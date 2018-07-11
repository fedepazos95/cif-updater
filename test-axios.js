const axios = require('axios');
const queryString = require('query-string');
const url = 'https://www.fondosalpha.com.ar/alpha/comparador-fondos-p?';

const getFci = () => {
    axios
    .post(url, queryString.stringify({
		option: '105',
		periodo: 'periodoMes',
		fdesde: '',
		fhasta: '',
		variable: 'variableVariacion',
		visual: 'visualGrafico'
    }))
    .then(res => {
        console.log(res.data);
    })
}

getFci();
