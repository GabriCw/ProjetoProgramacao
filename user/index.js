const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const users = [
    {
        id: 1,
        name: "Davi",
        email: "dav@gmail.com",
        cpf: "11122233344",
        password: "batata123"
    },
    {
        id: 2,
        name: "Gabriel",
        email: "gab@gmail.com",
        cpf: "55566677789",
        password: "baaasada"
    }
];

//GET ALL
app.get("/get-all-users", (req, res) => {
    res.json(users);
})

//GET USER BY ID
app.get("/get-user-by-id", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (parseInt(req.query.id) === users[i].id) {
            res.json(users[i]);
            return;
        }
    }
    res.send("ID inválido");
})

//CREATE USER
app.post("/create-user", (req, res) => {
    if (req.body.name === "" || req.body.name === undefined) {
        res.send("Nome inválido");
        return;
    }
    if (req.body.email === "" || req.body.email === undefined) {
        res.send("Email inválido");
        return;
    }
    if (req.body.cpf === "" || req.body.cpf === undefined || req.body.cpf.length !== 11) {
        res.send("CPF inválido");
        return;
    }
    if (req.body.password === "" || req.body.password === undefined) {
        res.send("Senha inválida");
        return;
    }
    for (let i = 0; i < users.length; i++) {
        if (req.body.email === users[i].email && req.body.cpf === users[i].cpf) {
            res.send("Email e CPF já cadastrados");
            return;
        }
        if (req.body.email === users[i].email) {
            res.send("Email já cadastrado");
            return;
        }
        if (req.body.cpf === users[i].cpf) {
            res.send("CPF já cadastrado");
            return;
        }
    }

    const newUser = {
        id: users[users.length - 1].id + 1,
        name: req.body.name,
        email: req.body.email,
        cpf: req.body.cpf,
        password: req.body.password
    };
    users.push(newUser);
    res.json(newUser);
})

//DELETE USER BY ID
app.delete("/delete-user-by-id", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (parseInt(req.query.id) === users[i].id) {
            res.json(users[i]);
            users.splice(i, 1);
            return;
        }
    }
    res.send("ID inválido");
})

//UPDATE USER BY ID -> CPF e ID não mudam
app.put("/update-user-by-id", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if (parseInt(req.query.id) === users[i].id) {
            if (req.body.name === undefined || req.body.name === ""
                || req.body.email === undefined || req.body.email == ""
                || req.body.password === undefined || req.body.password == "") {
                res.send("Não é possível alterar o cadastro");
                return;
            }

            users[i].name = req.body.name;
            users[i].email = req.body.email;
            users[i].password = req.body.password;
            res.json(users[i]);
        }
    }
})

//LOGIN
app.post("/login", (req, res) => {
    for (let i = 0; i < users.length; i++) {
        if ((req.body.email === users[i].email || req.body.cpf === users[i].cpf) && req.body.password === users[i].password) {
            res.send("Bem vindo ao Viaggo");
            return;
        }
    }
    res.send("Preencha os campos corretamente");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
