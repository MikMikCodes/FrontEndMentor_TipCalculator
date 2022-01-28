const bill = document.getElementById('input-bill');
const tipBtns = document.querySelectorAll('.tipBtn');
const customTip = document.getElementById('input-tip');
const numPeople = document.getElementById('input-people');
const errorMsg = document.querySelector('.error-msg');
const result = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.reset');

bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', activateBtn);
})
customTip.addEventListener('input', setCustomTipValue);

numPeople.addEventListener('input', setNumPeople);

resetBtn.addEventListener('click', reset);

    
let billValue = 0.0; 
let tipValue = 0.15; 
let peopleValue = 1; 

function validateFloat(x) {
    var regx = /^[0-9]*\.?[0-9]*$/; 
    return x.match(regx); 
}

function validateInt(x) {
    var regx = /^[0-9]*$/;
    return x.match(regx);
}

function setBillValue() {
     //check if the input had invalid characters
    if (!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1);
    }

    //if a comma is used, replace it with a period. 
    if (bill.value.includes(',')) {
        bill.value = bill.value.replace(',', '.');
    }
    billValue = parseFloat(bill.value); 

    calcTip();
}

function setCustomTipValue() {
    if (!validateInt(customTip.value)) {
        customTip.value = customTip.value.substring(0, customTip.value.length - 1);
    }

    tipValue = parseFloat(customTip.value / 100);
    
    //remove active btn
    tipBtns.forEach(btn => {
        btn.classList.remove('btn-active');
    });

    //active btn 
    if (event.target.innerHTML === customTip.innerHTML) {
        customTip.classList.add('btn-active');
    } 
     // run calculation
     calcTip();
}

function activateBtn() {

    tipBtns.forEach(btn => {
        //clear the active button
        btn.classList.remove('btn-active');

    //set active state
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML) / 100; //calculated percentage for active btn
            calcTip();
    }
    })

    // //clear custom tip
     customTip.value = '';
    
    if (customTip.value !== '') {
        calcTip();
    }
}

function setNumPeople() {
    //validate input doesn't have invalid characters
    if (!validateInt(numPeople.value)) {
        numPeople.value = numPeople.value.substring(0, numPeople.value.length - 1);
    }

    peopleValue = parseFloat(numPeople.value);

    //display error message
     if (peopleValue <= 0) {
         errorMsg.classList.add('visible-error-msg');
     }
    //remove message after a few seconds
    setTimeout(function () {
        errorMsg.classList.remove('visible-error-msg');
    }, 3000);

    calcTip();
}


function calcTip() {
    if (peopleValue >= 1) {
        let tipAmt = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        result[0].innerHTML = '$' + tipAmt.toFixed(2);
        result[1].innerHTML = '$' + total.toFixed(2);
    }
    
}

function reset() {
    bill.value = '0.0';
    setBillValue();

    //resets to original active button (15%)
    tipBtns[2].click();

    numPeople.value = '1';
    setNumPeople();
}