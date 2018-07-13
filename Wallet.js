const axios = require('axios');
const keys = require('./config/keys');

module.exports = {
    listAccounts: async (token, user) => {
        try {
            const response = await axios.get(`${keys.budgetBakersUrl}/accounts`, { headers: { 'X-Token': token, 'X-User': user } });
            console.log('try list accounts', response);
            return response;
        } catch (err) {
            console.error('catch list accounts', err);
        }
    }
}