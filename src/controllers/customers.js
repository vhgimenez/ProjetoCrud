const CustomersModel = require('../models/customers');
const { crypto } = require('../utils/password');

function index(req, res) {
    res.render('register', {
        title: 'Cadastro de Clientes'
    });
}

async function add(req, res) {
    
    const {
        name,
        age,
        email,
        password
    } = req.body;

    const passwordCrypto = await crypto(password);

    const register = new CustomersModel({
        name,
        age,
        email,
        password: passwordCrypto
    })

    register.save();
    res.render("register", {
        title: 'Cadastro de Clientes',
        message: 'Cadastro realizado com sucesso'
    });
}

async function listUser(req, res) {
    const users = await CustomersModel.find();

    res.render('listUsers', {
        title: 'Listagem de usuários',
        users
    }) 
}

async function formEdit(req, res) {
    const { id } = req.query;
    const user = await CustomersModel.findById(id);

    res.render('edit', {
        title: 'Editar usuário',
        user
    })
}

async function edit(req, res) {
    const {
        name,
        age,
        email
    } = req.body;

    const { id } = req.params;
    const user = await CustomersModel.findById(id);

    user.name = name;
    user.age = age;
    user.email = email;

    user.save();

    res.render('edit', {
        title: "Editar usuário",
        user,
        message: "Usuário alterado com sucesso"
    })
}

module.exports = {
    add,
    index,
    listUser,
    formEdit,
    edit
};