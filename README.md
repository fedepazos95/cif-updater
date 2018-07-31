# CIFs Updater

Node.js app using [Express 4](http://expressjs.com/).
The purpose of this app is to update CIFs (Common Investment Fund) daily's variation

This app uses [Puppeteer](https://github.com/GoogleChrome/puppeteer) to run a Chrome instance and automatically complete the form to enter a new record in the [BudgetBakers API](http://budgetbakers.com/api)

The app works with the [Heroku Scheduler](https://devcenter.heroku.com/articles/scheduler) but it was designed to allow adding an UI and making it scalable.

## Authors

* **Federico Pazos** - [FedePazos95](https://github.com/fedepazos95)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details