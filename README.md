# CIFs Updater
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
[![NPM puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Node.js app using [Express 4](http://expressjs.com/).
The purpose of this app is to update CIFs (Common Investment Fund) daily's variation

This app uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) to run a Chrome instance and automatically complete the form to enter a new record in the [BudgetBakers API](http://budgetbakers.com/api)

The app works with the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) but it was designed to allow adding an UI and making it scalable.

## Authors

* **Federico Pazos** - [FedePazos95](https://github.com/fedepazos95)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details