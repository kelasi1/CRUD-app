function validateFormSztuka() {

    const nazwaInput = document.getElementById('nazwaSztuki');
    const trenerInput = document.getElementById('trener');
    const limitInput = document.getElementById('limit');
    const mistrzInput = document.getElementById('mistrzSztuki');
    const opisInput = document.getElementById('opisSztuki');

    const errrorMistrz = document.getElementById('errorMistrz');
    const errorOpis = document.getElementById('errorOpis');
    const errorNazwa = document.getElementById('errorNazwaSztuki');
    const errorTrener = document.getElementById('errorTrener');
    const errorLimit = document.getElementById('errorLimit');

    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const errorsSummary = document.getElementById('errorsSummary')

    const reqMessage = document.getElementById('errorMessage-required').innerText;


    resetErrors([nazwaInput, trenerInput, limitInput], [errorNazwa, errorTrener, errorLimit], errorsSummary);

    let valid = true;

    if (mistrzInput.value != "") {
        if (!checkTextLengthRange(1, 100)) {
            valid = false;
            mistrzInput.classList.add("error-input");
            errrorMistrz.innerText = "zla ilosc znakow"
        }
    }

    if (opisInput.value != "") {
        if (!checkTextLengthRange(1, 100)) {
            valid = false;
            opisInput.classList.add("error-input");
            errorOpis.innerText = "zla ilosc znakow"
        }
    }
    if (!checkRequired(nazwaInput.value)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText =  reqMessage
    } else if (!checkTextLengthRange(nazwaInput.value, 3, 60)) {
        valid = false;
        nazwaInput.classList.add("error-input");
        errorNazwa.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }


    if (!checkRequired(trenerInput.value)) {
        valid = false;
        trenerInput.classList.add("error-input");
        errorTrener.innerText =  reqMessage
    } else if (!checkTextLengthRange(trenerInput.value, 3, 60)) {
        valid = false;
        trenerInput.classList.add("error-input");
        errorTrener.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }


    if (!checkRequired(limitInput.value)) {
        valid = false;
       limitInput.classList.add("error-input");
        errorLimit.innerText = reqMessage
    }

     else if (!checkNumber(limitInput)) {
        valid = false;
        limitInput.classList.add("error-input");
        errorLimit.innerText = "To nie liczba";
    }


    if (!valid)
        errorsSummary.innerText = formErrorMessage;

    return valid;
}

function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++)
        inputs[i].classList.remove("error_input");

    for (let i = 0; i < errorTexts.length; i++)
        errorTexts[i].innerText = "";

    errorInfo.innerText = "";
}

function checkRequired(value) {
    if (!value)
        return false;

    value = value.toString().trim();

    if (value === "")
        return false;

    return true;
}

function checkTextLengthRange(value, min, max) {
    if (!value)
        return false;

    value = value.toString().trim();
    const length = value.length;

    if (max && length > max)
        return false;

    if (min && length < min)
        return false;

    return true;
}

function checkEmail(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(value);
}

function checkDate(value) {
    if (!value) {
        return false;
    }
    const pattern = /(\d{4})-(d\{2})-(\d{2})/;
    return pattern.test(value);
}

function checkNumber(value) {
    if (!value) {
        return false;
    }
    if (isNaN(value)) {
        return false;
    }
    return true;
}

function checkDateIfAfter(value, compareTo) {
    if (!value)
        return false;

    if (!compareTo)
        return false;

    const pattern = /(\d{4})-(\d{2})-(\d{2})/;

    if (!pattern.test(value))
        return false;

    if (!pattern.test(compareTo))
        return false;

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);

    if (valueDate.getTime() <= compareToDate.getTime())
        return false;

    return true;
}