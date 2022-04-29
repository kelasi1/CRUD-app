var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');

var app = express();

const zawodnikRouter = require('./routes/zawodnikRoute');
const sztukiRouter = require('./routes/sztukiWalkiRoute');
const sztukaZawodnikaRouter = require('./routes/sztukaZawodnikaRoute');

const zawodnikApiRouter = require('./routes/api/ZawodnikAPIRoute');
const sztukiWalkiApiRouter = require('./routes/api/sztukiwalkiAPIRoute');
const sztukaZawodnikaApiRouter = require('./routes/api/sztukaZawodnikaAPIRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
        console.log(err);
    });

const session = require('express-session');
const authUtils = require("./util/authUtils");

const i18n = require('i18n');

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));



app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('secret'));

i18n.configure({
    locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
    directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
    objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
    cookie: 'acme-hr-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o

});
app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['acme-hr-lang'];
        res.locals.lang = currentLang;
    }
    next();
});
app.use(i18n.init);
app.use('/', indexRouter);
app.use('/zawodnicy', authUtils.permitAuthenticatedUser,zawodnikRouter);
app.use('/sztuks',authUtils.permitAuthenticatedUser, sztukiRouter);
app.use('/tren', authUtils.permitAuthenticatedUser,sztukaZawodnikaRouter);

app.use('/api/sztuks', sztukiWalkiApiRouter);
app.use('/api/tren', sztukaZawodnikaApiRouter);
app.use('/api/zawodnicy', zawodnikApiRouter);




app.use(function (req, res, next) {
    next(createError(404));
});


app.use(function (err, req, res, next) {

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
