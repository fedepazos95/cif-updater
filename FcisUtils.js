const axios = require('axios');
const _ = require('underscore');
const queryString = require('query-string');
const url = 'https://www.fondosalpha.com.ar/alpha/comparador-fondos-p?';

module.exports = {
    getFci: async (fci) => {
        try {
            const params = {
                option: fci,
                periodo: 'periodoMes', // Por ahora lo seteo por defecto
                fdesde: '', // Por ahora lo seteo por defecto
                fhasta: '', // Por ahora lo seteo por defecto
                variable: 'variableVariacion', // Por ahora lo seteo por defecto
                visual: 'visualGrafico' // Por ahora lo seteo por defecto
            };
            const response = await axios.post(url, queryString.stringify(params));
            return _.last(response.data[0].data);
        } catch (err) {
            console.error('Error', err);
        }
    }
}