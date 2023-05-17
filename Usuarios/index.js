require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const axios = require("axios");

let id = 0;
const usuarios = {};

//POST localhost:4000/Usuarios {"nome": "Ana", "data_nascimento": "02/01/2000", "email": "ana@bol.com.br", "senha": "12345678"}
app.post("/Usuarios", (req, res) => {
  const nome = req.body.nome;
  const data_nascimento = req.body.data_nascimento;
  const email = req.body.email;
  const senha = req.body.senha;
  id++;
  usuarios[id] = {id, nome, data_nascimento, email, senha};
  axios.post("http://localhost:10000/eventos", {
    tipo: "Usuario Criado",
    dados: {id, nome, data_nascimento, email, senha},
  });
  res.status(201).json(usuarios[id]);
});

//GET localhost:4000/Usuarios
app.get("/Usuarios", (req, res) => {
  res.send(usuarios);
});

//PUT localhost:4000/Usuarios/:id
app.put("/Usuarios/:id", (req, res) => {
    usuario = usuarios[req.params.id]
    if(req.body.hasOwnProperty('name')){
        usuario.nome = req.body.nome;
    }
    if(req.body.hasOwnProperty('data_nascimento')){
        usuario.data_nascimento = req.body.data_nascimento;
    }
    if(req.body.hasOwnProperty('email')){
        usuario.email = req.body.email;
    }
    if(req.body.hasOwnProperty('senha')){
        usuario.senha = req.body.senha;
    }
    usuarios[req.params.id] = usuario;
    axios.post("http://localhost:10000/eventos", {
      tipo: "Usuário Atualizado",
      dados: usuario,
    });
    res.status(201).json(usuarios[req.params.id]);
  });

// DELETE localhost:4000/Usuarios/:id
app.delete("/Usuarios/:id", (req, res) => {
    delete usuarios[req.params.id];
    axios.post("http://localhost:10000/eventos", {
      tipo: "Usuário Deletado",
      dados: usuarios,
    });
    res.status(200).send({msg: 'Usuário deletado.'})
  });

// POST do Barramento de eventos
app.post("/eventos", (req, res) => {
  console.log(req.body);
  res.end();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Usuarios. Porta ${PORT}`));
