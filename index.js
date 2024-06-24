const express = require('express');
require('dotenv').config();

const app = express();

//Escuchar
app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:4000');
});

//Middlewares
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
// app.get('/', (req, res) => {
//     res.json({
//         message: 'Welcome to my API'
//     });
// });