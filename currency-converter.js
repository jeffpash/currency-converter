const axios = require('axios');

//getExchangeRate async
const getExchangeRate = async(fromCurrency, toCurrency) => {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if(isNaN(exchangeRate)){
      throw new Error(`unable to get currency ${fromCurrency} and ${toCurrency}`)
    }

    return exchangeRate;

    //getExchangeRate sync

    // axios.get('http://data.fixer.io/api/latest?access_key=f68b13604ac8e570a00f7d8fe7f25e1b&format=1')
    //   .then((response) =>{
    //     const rate = response.data.rates;
    //     const euro = 1 / rate[fromCurrency];
    //     const exchangeRate = euro * rate[toCurrency];

    //     console.log(exchangeRate);
    //   });
}

getExchangeRate('USD', 'EUR');

//getCountries
const getCountries = async(toCurrency) => {
  try{
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)

    return response.data.map(country => country.name);
  }catch(error){
  throw new Error(`unable to get countries that use ${toCurrency}`);
  }
}

getCountries('USD');

//convertCurrency
const convertCurrency = async (fromCurrency, toCurrency, amount) =>{
  const countries = await getCountries(toCurrency);
  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  const convertedAmount = (amount * exchangeRate).toFixed(2);

  return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}. You can spend this in the following countries: ${countries}`
}

//call convert currency to get meaningfull data.
convertCurrency('EUR', 'KES', 100)
.then((message) =>{
  console.log(message);
}).catch((error) =>{
  console.log(error.message)
})