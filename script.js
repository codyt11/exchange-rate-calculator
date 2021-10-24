const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

//fetch exchange rate and update the DOM
function calculate() {
    const curr_one = currencyOne.value;
    const curr_two = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${curr_one}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const rate = data.rates[curr_two];

            rateEl.innerText = `1 ${curr_one} = ${rate} ${curr_two}`;

            amountTwo.value = (amountOne.value * rate).toFixed(2);
        })
};

currencyOne.addEventListener('change', calculate);
currencyTwo.addEventListener('change', calculate);
amountOne.addEventListener('input',calculate);
amountTwo.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    calculate();
});

calculate();