## Banka
Banka is a light-weight core banking application that powers banking operations like account
creation, customer deposit and withdrawals.
#### Links
##### gh-pages: https://emile-nsengimana.github.io/Banka/UI
##### Heroku: https://cha-ii.herokuapp.com/
### Requirements

- `Nodejs` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `NPM` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development
### SETUP
First clone it to your machine:
```
https://github.com/Emile-Nsengimana/Banka.git
```
Open it using your favorite IDE
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules
```
npm install
```
To start the app
```
npm start
```
To run tests
```
npm test
```

### API ENDPOINTS
| API | Methods  | Description  |
| ------- | --- | --- |
| `/api/v1/auth/signup` | POST | user signup |
| `/api/v1/auth/login` | POST | user login |
| `/api/v1/accounts` | POST | create account |
| `/api/v1/account/<id>` | POST | activate or deactivate account |
| `/api/v1/accounts` | GET | display all bank accounts |
| `/api/v1/accounts/<id>` | GET | display a specific account |
| `/api/v1/account/<id>` | DELETE | delete an account |
| `/api/v1/transactions/<accountNo>/debit` | POST | debit a bank account |
| `/api/v1/transactions/<accountNo>/credit` | POST | credit a bank account |
### How can it be manually tested
- using [postman](https://www.getpostman.com/downloads/)
