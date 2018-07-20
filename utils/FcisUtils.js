const axios = require('axios');
const _ = require('underscore');
const queryString = require('query-string');
const { Pool } = require('pg');
const keys = require('./config/keys');
const url = 'https://www.fondosalpha.com.ar/alpha/comparador-fondos-p?';

const pool = new Pool({ connectionString, ssl } = keys);

module.exports = {
    getLastVariation: async (fci) => {
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
    },
    getFciFromDatabase: async (fci) => {
        try {
            const client = await pool.connect();
            const result = await client.query(`SELECT * FROM fcis_table WHERE fci='${fci}'`);
            client.release();
            return result.rows[0];
        } catch (err) {
            console.error('Error', err);
        }
    },
    updateFci: async (fci, data) => {
        try {
            const client = await pool.connect();
            await client.query(`UPDATE fcis_table SET valor = ${data.valor}, fecha = ${data.fecha}, variacion = ${data.variacion} WHERE fci = '${fci}'`);
            client.release();
        } catch (err) {
            console.error('Error', err);
        }
    }
}