function validateForm() {

    const imieInput = document.getElementById('firstName');
    const nazwiskoInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const dataInput = document.getElementById('birthtime');
    const adresInput = document.getElementById('adres');
    const passwordInput = document.getElementById('password');

    const errorImie = document.getElementById('errorFirstName');
    const errorNazwisko = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorData = document.getElementById('errorBirthtime');
    const errorAdres = document.getElementById('errorAdres');
    const errorPassword = document.getElementById('errorPassword');
    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const errorsSummary = document.getElementById('errorsSummary')

    const reqMessage = document.getElementById('errorMessage-required').innerText;

    let valid = true;
    let nowDate = new Date();
    month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const nowString = [year, month, day].join('-');

    resetErrors([imieInput, nazwiskoInput, emailInput, dataInput, adresInput], [errorImie, errorNazwisko, errorEmail, errorData, errorAdres], errorsSummary);

    if (!checkRequired(passwordInput.value)) {
        valid = false;
        passwordInput.classList.add("error-input");
        errorPassword.innerText = reqMessage;
    }
    if (!checkRequired(imieInput.value)) {
        valid = false;
        imieInput.classList.add("error-input");
        errorImie.innerText = reqMessage;

    } else if (!checkTextLengthRange(imieInput.value, 3, 60)) {
        valid = false;
        imieInput.classList.add("error-input");
        errorImie.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }


    if (!checkRequired(nazwiskoInput.value)) {
        valid = false;
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = reqMessage;

    } else if (!checkTextLengthRange(nazwiskoInput.value, 3, 60)) {
        valid = false;
        nazwiskoInput.classList.add("error-input");
        errorNazwisko.innerText = "Pole powinno zawierać od 3 do 60 znaków";
    }


    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = reqMessage;

    } else if (!checkTextLengthRange(emailInput.value, 2, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierac od 2 do 60 znakow";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierac prawdilowy adres email";
    }

    if (!checkRequired(dataInput.value)) {
        valid = false;
        dataInput.classList.add("error-input");
        errorData.innerText = reqMessage;
    } else if (!checkDate(dataInput.value)) {
        value = false;
        dataInput.classList.add("error-input");
        errorData.innerText = "to nie data"
    }

    if (!checkRequired(adresInput.value)) {
        valid = false;
        adresInput.classList.add("error-input");
        errorAdres.innerText = reqMessage;
    } else if (!checkTextLengthRange(adresInput.value, 3, 60)) {
        valid = false;
        adresInput.classList.add("error-input");
        errorAdres.innerText = "Pole powinno zawierać od 3 do 60 znaków";
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
