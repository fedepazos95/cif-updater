const axios = require('axios');
const keys = require('./config/keys');

module.exports = {
    listAccounts: async (token, user) => {
        try {
            const response = await axios.get(`keys.budgetBakersUrl/${accounts}`, { headers: { 'X-Token': token, 'X-User': user } });
            return response;
        } catch (err) {
            console.error(err);
        }
    }
}