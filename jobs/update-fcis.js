const keys = require('../config/keys');
const Wallet = require('../Wallet');
const _ = require('underscore');
const { getLastVariation, getFciFromDatabase } = require('../FcisUtils');
const postRecord = require('../utils/postRecord');

const getFormattedValue = (cuotapartes, valor) => {
    let str = (cuotapartes * valor).toString();
    let i = str.indexOf('.');
    return parseFloat(str.substring(0, i + 3));
};

const updateFcis = async () => {
    try {
        const accounts = Wallet.listAccounts();
        console.log('accounts', accounts);
        _.each(accounts, ac => {
            const o = option[ac.name.replace(/ /g, "_")];
            if (o) {
                getLastVariation(o).then(async (r) => {
                    const fciDb = await getFciFromDatabase(ac.name);
                    const balance = await Wallet.getAccountBalance(ac.id);
                    const newValue = getFormattedValue(fciDb.cuotapartes, r.valor);
                    console.log('last variation', r, 'fci', fciDb, 'balance', balance, 'value', newValue);
                    if (balance !== newValue) {
                        await postRecord(keys.categoryId, ac.id, keys.currencyId, (newValue - balance));
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error', err);
    }
};

updateFcis();