const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');

const config = require('./config/db');
const routes = require('./routes/routes');

const app = express();

const port = 3000;

// для взаємодії з іншими сайтами
app.use(cors())

// для зчитування вхідних даних форми
app.use(bodyParser.json())

//створення статичної папки
// __dirname - повний шлях до даного файлу (index.js)
app.use(express.static(path.join(__dirname, 'public')))

// підключення до БД
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.on('connected', () => {
    console.log('Succesfuly connection')
})
mongoose.connection.on('error', (err) => {
    console.log('Unsuccesfuly connection', err)
})

//відслідкування url 
// app.get('/', (req, res) => {
//     res.send('Головна сторінка сайту')
// })

app.use(routes)

app.listen(port, () => {
    console.log("Server run on port " + port)
})