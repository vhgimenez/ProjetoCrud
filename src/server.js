const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost:27017");

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to database!')
})

db.on('error', console.error.bind(console, 'connection error: '))

// definindo o template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// definindo os arquivos públicos
app.use(express.static(path.join(__dirname, 'public')));

// habilita server para receber dados via post (formulário);
app.use(express.urlencoded({ extended: true }));

//rotas
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Titulo Teste'
    });
})

// 404 error not found
app.use((req, res) => {
    res.send('Página não encontrada!');
})

// executando o servidor 
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is listeing in port ${port}`));