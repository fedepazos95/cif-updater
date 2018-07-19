const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const _ = require('underscore');
const keys = require('./config/keys');
const Wallet = require('./Wallet');
const { getFci } = require('./FcisUtils');
const { option } = require('./config/fcis');
const postRecord = require('./utils/postRecord');


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
    const accounts = await Wallet.listAccounts();
    _.each(accounts, ac => {
      const o = option[ac.name.replace(/ /g,"_")];
      if (o) {
        getFci(o).then(r => console.log(r));
      }
    });
    res.render('pages/accounts', { accounts });
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
    const result = await getFci(option.ALPHA_MEGA);
    console.log('result', result);
    res.json(result);
  } catch (err) {
    console.error('Error', err);
    res.send(err);
  }
});
app.get('/record', async (req, res) => {
  try {
    const result = await postRecord('34f65442-9a52-4f37-a194-33f3af4dffd7', 'f67e9227-ab13-42bf-8eb2-7368e4f4a128', 'eec17219-4748-4a22-a009-060e4a3f4d1f', 35.50);
    res.json(result);
  } catch (err) {
    console.log('Error', err);
    res.send(err);
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
