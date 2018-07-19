module.exports = {
    walletToken: process.env.WALLET_TOKEN,
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    user: process.env.USER,
    icbcUrl: process.env.ICBC_URL,
    budgetBakersUrl: process.env.BUDGET_BAKERS_URL,
    currencyId: process.env.CURRENCY_ID,
    categoryId: process.env.CATEGORY_ID
}