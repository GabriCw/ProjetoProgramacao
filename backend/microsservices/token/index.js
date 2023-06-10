const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

//DATA
const tokens = [
    {
        token_id: 1,
        token: "dakj23",
        expiration_time: Date.now()
    }
];

//GET ALL
app.get("/get-all-tokens", (req, res) => {
    res.json(tokens);
})

//CREATE TOKEN
app.post("/create-token", (req, res) => {
    const today = new Date();
    const newToken = {
        token_id: tokens[tokens.length - 1].token_id + 1,
        token: Math.random().toString(36).substring(2, 8),
        expiration_time: Date.now()+600000
    };
    tokens.push(newToken);
    res.json(newToken);
})

//VERIFY TOKEN
app.post("/verify-token", (req, res) => {
    tokens.forEach(value => {
        if (req.body.token === value.token && req.body.expiration_time < value.expiration_time) {
            res.send("Token Válido");
            return;
        }
    })
    res.status(400).send("Token inválido, por favor, tente novamente ou solicite um novo token.");
})

//DELETE TOKEN
app.delete("/delete-token", (req, res) => {
    tokens.forEach((value, index) => {
        if (req.body.token === value.token) {
            res.json(value);
            tokens.splice(index, 1);
            return;
        }
    })
    res.status(400).send("Token inválido");
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});