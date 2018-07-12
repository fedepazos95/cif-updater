const axios = require('axios');
const queryString = require('query-string');
const { Pool } = require('pg');
const url = 'https://www.fondosalpha.com.ar/alpha/comparador-fondos-p?';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

console.log(process.env);
const checkFci = (fci) => {
    axios
    .post(url, queryString.stringify({
		option: '105',
		periodo: 'periodoMes',
		fdesde: '',
		fhasta: '',
		variable: 'variableVariacion',
		visual: 'visualGrafico'
    }))
    .then(async (res) => {
        const fci = {
            name: res.data[0].name,
            var: res.data[0].data[res.data[0].data.length - 1]
        }
        console.log('fci', fci);
        try {
            const client = await pool.connect()
            const result = await client.query('SELECT * FROM test_table');
            console.log('rows', result.rows);
            client.release();
          } catch (err) {
            console.error(err);
          }
    })
}

checkFci();
