const axios = require('axios');
const keys = require('./config/keys');

module.exports = {
    listAccounts: async () => {
        try {
            const response = await axios.get(`${keys.budgetBakersUrl}/accounts`, { headers: { 'X-Token': keys.walletToken, 'X-User': keys.user } });
            return response.data;
        } catch (err) {
            console.error('Error', err);
        }
    },
    getAccountById: async (account) => {
        try {
            const response = await axios.get(`${keys.budgetBakersUrl}/account/${account}`, { headers: { 'X-Token': keys.walletToken, 'X-User': keys.user } });
            return response.data;
        } catch (err) {
            console.error('Error', err);
        }
    }
}