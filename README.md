## TDD example
Project to show how to apply TDD with Node.js (read the article [here](https://medium.com/fintonic-engineering/tdd-not-so-easy-not-so-hard-8c64679e3641))

### Requeriments:
 * node 8 or higher.
 * to have a mongo instance runing in your machine or accesible in othe machine (config for mongo is in `.env.dev` file).

### Required functionality:
 - `/country/:name/capital` - endpoint to:
    * receive a country name
    * call "https://restcountries.eu/rest/v2/name/" service and save in data base the country name and capital
    * if the country name is already in database, calling to service is not required
    * if name is not in database and neither it's found calling to service, it sould return an error 500 with "Country not exists" message.
