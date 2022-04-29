function validateFormSztukaZawodnika() {

    const dataOdInput = document.getElementById('dataPrzyjeciaOd');
    const dataDoInput = document.getElementById('dataPrzyjeciaDo');
    const oplataInput = document.getElementById('oplata');
    const zawodnikInput = document.getElementById('zawodnik_id');
    const sztukaInput = document.getElementById('sztuka_id');
    const rabatInput = document.getElementById("rabat");

    const rabatError = document.getElementById("errorRabat");
    const errorDataOd = document.getElementById('errorDataPrzyjeciaOd');
    const errorDataDo = document.getElementById('errorDataPrzyjeciaDo');
    const errorOplata = document.getElementById('errorOplata');
    const errorZawodnik = document.getElementById('errorZawodnik');
    const errorSztuka = document.getElementById('errorSztuka');


    const formErrorMessage = document.getElementById('errorMessage-formError').innerText;
    const errorsSummary = document.getElementById('errorsSummary')

    const reqMessage = document.getElementById('errorMessage-required').innerText;


    resetErrors([dataOdInput, dataDoInput, oplataInput, zawodnikInput, sztukaInput], [errorDataOd, errorDataDo, errorOplata, errorZawodnik, errorSztuka], errorsSummary);

    let valid = true;
    let nowDate = new Date();
    month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dataOdInput.value)) {
        valid = false;
        dataOdInput.classList.add("error-input");
        errorDataOd.innerText =  reqMessage
    }
    if (!checkRequired(dataDoInput.value)) {
        valid = false;
        dataDoInput.classList.add("error-input");
        errorDataDo.innerText =  reqMessage
    }
    /*else if (!checkDate(dataOdInput.value)) {
        valid = false;
        dataOdInput.classList.add("error-input");
        dataOdInput.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd";
    }*/
    /*else if (checkDateIfAfter(dataOdInput.value, nowString)) {
        valid = false;
        dataOdInput.classList.add("error-input");
        errorDataOd.innerText = "Data nie moze byc z przyszlosci"
    } else if (checkRequired(dataDoInput.value) && checkDate(dataDoInput.value) && !checkDateIfAfter(dataDoInput.value, dataOdInput.value)) {
        valid = false;
        dataDoInput.classList.add("error-input");
        errorDataDo.innerText = "Data do powinna byc pozniejsza niz data od"
    }
*/
    if (!checkRequired(rabatInput.value)) {
        valid = false;
        rabatInput.classList.add("error-input");
        rabatError.innerText =  reqMessage
    } else if (rabatInput.value != "") {
        (!checkNumber(rabatInput.value))
        {
            valid = true;
            rabatInput.classList.add("error-input");
            rabatError.innerText = "To nie liczba";
        }
    }
    if (!checkRequired(oplataInput.value)) {
        valid = false;
        oplataInput.classList.add("error-input");
        errorOplata.innerText =  reqMessage
    } else if (oplataInput.value !== "") {
        if ((oplataInput.value > 100) || (oplataInput.value < 1)) {
            valid = false;
            oplataInput.classList.add("error=input");
            errorOplata.innerText = "Liczba powinna być z zakresu od 1 do 100";
        }
    } else if (!checkNumber(oplataInput)) {
        valid = false;
        oplataInput.classList.add("error-input");
        errorOplata.innerText =  reqMessage
    }

    if (!checkRequired(zawodnikInput.value)) {
        valid = false;
        zawodnikInput.classList.add("error-input");
        errorZawodnik.innerText =  reqMessage

    }


    if (!checkRequired(sztukaInput.value)) {
        valid = false;
        sztukaInput.classList.add("error-input");
        sztukaInput.innerText =  reqMessage
    }

    if (!valid)
        errorsSummary.innerText =formErrorMessage

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