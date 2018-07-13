const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const keys = require('./config/keys');
const Wallet = require('./Wallet');


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
    const result = await Wallet.listAccounts(keys.walletToken, keys.user);
    res.render('pages/accounts', result);
  } catch (err) {
    console.error(err);
    res.send('Error', err);
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
