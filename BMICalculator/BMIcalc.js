const form = document.querySelector('form');
const resetBtn = document.querySelector('#resetBtn');
const results = document.querySelector('#results');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const height = parseInt(document.querySelector('#height').value);
  const weight = parseInt(document.querySelector('#weight').value);


  if (height === '' || height < 0 || isNaN(height)) {
    results.innerHTML = `Please give a valid height ${height}`;
  } else if (weight === '' || weight < 0 || isNaN(weight)) {
    results.innerHTML = `Please give a valid weight ${weight}`;
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    //show the result
    let yourweight = '0';
    function checkWeight(bmi) {
      if (bmi < 18.6) {
        yourweight = 'You are Underweight!';
      } else if (bmi > 18.6 && bmi < 24.9) {
        yourweight = 'Your weigth is in normal range!';
      } else if (bmi > 24.9) {
        yourweight = 'You are Overweight!';
      }
      return yourweight;
    }

    results.innerHTML = `<span>Your bmi is ${bmi}, ${checkWeight(bmi)}</span>`;
  }
});

resetBtn.addEventListener('click', function () {
  results.innerHTML = ''; // Clear result message
});
