const axios = require('axios');
const queryString = require('query-string');
const url = 'https://www.fondosalpha.com.ar/alpha/comparador-fondos-p?';

module.exports = {
    getFci: async () => {
        try {
            const response = await axios.post(url, queryString.stringify({
                option: '105',
                periodo: 'periodoMes',
                fdesde: '',
                fhasta: '',
                variable: 'variableVariacion',
                visual: 'visualGrafico'
            }));
            return response.data[0].data[response.data[0].data.length - 1];
        } catch (err) {
            console.error('Error', err);
        }
    }
}