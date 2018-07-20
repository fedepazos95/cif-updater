const _ = require('underscore');
const keys = require('../config/keys');
const { option } = require('../config/fcis');
const Wallet = require('../utils/Wallet');
const { getLastVariation, getFciFromDatabase, updateFci } = require('../utils/FcisUtils');
const postRecord = require('../utils/postRecord');

const getFormattedValue = (cuotapartes, valor) => {
    let str = (cuotapartes * valor).toString();
    let i = str.indexOf('.');
    return parseFloat(str.substring(0, i + 3));
};

const updateFcis = async () => {
    try {
        const accounts = await Wallet.listAccounts();
        _.each(accounts, ac => {
            const o = option[ac.name.replace(/ /g, "_")];
            if (o) {
                getLastVariation(o).then(async (last) => {
                    await updateFci(fciDb.fci, last);
                    const fciDb = await getFciFromDatabase(ac.name);
                    const balance = await Wallet.getAccountBalance(ac.id);
                    const newValue = getFormattedValue(fciDb.cuotapartes, last.valor);
                    if (balance !== newValue) {
                        await postRecord(keys.categoryId, ac.id, keys.currencyId, (newValue - balance).toFixed(2));
                    }
                });
            }
        });
    } catch (err) {
        console.error('Error', err);
    }
};

updateFcis();