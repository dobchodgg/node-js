const rates = {};

/**
 * @param {number} rate
 * @param {string} sourceCurrency
 * @param {string} targetCurrency
 */
function setExchangeRate(rate, sourceCurrency, targetCurrency) {
  if (rates[sourceCurrency] === undefined) {
    rates[sourceCurrency] = {};
  }

  if (rates[targetCurrency] === undefined) {
    rates[targetCurrency] = {};
  }

  rates[sourceCurrency][targetCurrency] = rate;
  rates[targetCurrency][sourceCurrency] = 1 / rate;
}

/**
 * @param {number} value
 * @param {string} sourceCurrency
 * @param {string} targetCurrency
 */
function convertToCurrency(value, sourceCurrency, targetCurrency) {
  const exchangeRate = rates[sourceCurrency][targetCurrency];
  return exchangeRate && value * exchangeRate;
}

/**
 *
 * @param {number} value
 */
function formatValueForDisplay(value) {
  return value.toFixed(2);
}

/**
 * @param {number} value
 * @param {string} sourceCurrency
 */
function printForeignValues(value, sourceCurrency) {
  console.info(`The value of ${value} ${sourceCurrency} is:`);

  for (const targetCurrency in rates) {
    if (targetCurrency !== sourceCurrency) {
      const convertedValue = convertToCurrency(value, sourceCurrency, targetCurrency);
      const displayValue = formatValueForDisplay(convertedValue);
      console.info(`- ${displayValue} ${targetCurrency}`);
    }
  }
}

setExchangeRate(0.95, 'USD', 'EUR');
setExchangeRate(1.96, 'USD', 'BGN');
printForeignValues(10, 'EUR');
