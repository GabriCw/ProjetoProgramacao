const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
app.use(express.json());

app.use(cors());

//DATA
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
    },
    {
        id: 3,
        name: "Felipe",
        email: "lip@gmail.com",
        cpf: "52100029312",
        password: "arregacamoleza"
    }
];

//HANDLERS
const handlePassword = (input) => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const numbers = /[0-9]/g;
    if (input.match(lowerCaseLetters) && input.match(upperCase) && input.match(numbers) && input.length >= 8)
        return false
    return true
}

//GET ALL
app.get("/get-all-users", (req, res) => {
    res.json(users);
})

//GET USER BY ID
app.get("/get-user-by-id", (req, res) => {
    users.forEach(value => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            return;
        }
    })
    res.status(400).send("ID inválido")
})

//CREATE USER
app.post("/create-user", (req, res) => {
    if (req.body.name === "" || req.body.name === undefined) {
        res.status(400).send("Nome inválido");
        return;
    }
    if (req.body.email === "" || req.body.email === undefined) {
        res.status(400).send("Email inválido");
        return;
    }
    if (req.body.cpf === "" || req.body.cpf === undefined || req.body.cpf.length !== 11) {
        res.status(400).send("CPF inválido");
        return;
    }
    if (req.body.password === "" || req.body.password === undefined || handlePassword(req.body.password)) {
        res.status(400).send("Senha inválida");
        return;
    }
    users.forEach(value => {
        if (req.body.email === value.email && req.body.cpf === value.cpf) {
            res.status(400).send("Email e CPF já cadastrados");
            return;
        }
        if (req.body.email === value.email) {
            res.status(400).send("Email já cadastrado");
            return;
        }
        if (req.body.cpf === value.cpf) {
            res.status(400).send("CPF já cadastrado");
            return;
        }
    })
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
    users.forEach((value, index) => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            users.splice(index, 1);
            return;
        }
    })
    res.status(400).send("ID inválido");
})

//UPDATE USER BY ID -> CPF e ID não mudam
app.put("/update-user-by-id", (req, res) => {
    users.forEach((value) => {
        if (parseInt(req.query.id) === value.id) {
            if (req.body.email === undefined || req.body.email == ""
                || req.body.password === undefined || req.body.password == "") {
                res.status(400).send("Não é possível alterar o cadastro");
                return;
            }

            value.email = req.body.email;
            value.password = req.body.password;
            res.json(value);
        }
    })
})

//LOGIN
app.post("/login", (req, res) => {
    users.forEach(value => {
        if ((req.body.login === value.email || req.body.login === value.cpf) && req.body.password === value.password) {
            res.send("Bem vindo ao Viaggo");
            return;
        }
    })
    res.status(400).send("Preencha os campos corretamente");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
