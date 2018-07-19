const keys = require('../config/keys');
const Wallet = require('../Wallet');
const _ = require('underscore');
const { getLastVariation } = require('./FcisUtils');

const updateFcis = async () => {
    try {
        const accounts = Wallet.listAccounts();
        _.each(accounts, ac => {
            const o = option[ac.name.replace(/ /g, "_")];
            if (o) {
                getLastVariation(o).then(r => console.log(r));
            }
        });
    } catch (err) {
        console.error('Error', err);
    }
}

updateFcis();