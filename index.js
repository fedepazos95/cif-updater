const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const keys = require('./config/keys');
const Wallet = require('./Wallet');
const { getFci } = require('./FcisUtils');
const fcis = require('./config/fcis');


const pool = new Pool({ connectionString, ssl } = keys);
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

// GETs for testing, later will be deleted
app.get('/fci', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM fcis_table');
    res.render('pages/fci', result);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error', err);
  }
});
app.get('/accounts', async (req, res) => {
  try {
    const result = await Wallet.listAccounts();
    res.render('pages/accounts', { accounts: result });
  } catch (err) {
    console.error(err);
    res.send('Error', err);
  }
});
app.get('/account', async (req, res) => {
  try {
    const result = await Wallet.getAccountById('24a8d9d4-62d6-4658-9d3e-2bd2d39ec0f5');
    res.render('pages/account', { account: result });
  } catch (err) {
    console.error(err);
    res.send('Error', err);
  }
});
app.get('/getFci', async (req, res) => {
  try {
    const result = await getFci(fcis.option.ALPHA_MEGA);
    console.log('result', result);
    res.json(result);
  } catch (err) {
    console.error('Error', err);
    res.send(err);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
