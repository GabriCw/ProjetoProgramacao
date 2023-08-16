const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

//DATA
const packages = [
    {
        id: 1,
        name: "Paris",
        data_ida: "2023-05-30",
        data_volta: "2023-06-05",
        details: "muito foda"
    },
    {
        id: 2,
        name: "Rio de Janeiro",
        data_ida: "2023-06-03",
        data_volta: "2023-06-14",
        details: "muito roubo"
    },
    {
        id: 3,
        name: "Angola",
        data_ida: "2023-08-16",
        data_volta: "2023-08-22",
        details: "não gostei, asmei"
    }
];

//HANDLERS
const handleValidDates = (initialDate, endDate) => {
    const dateInitial = new Date(initialDate);
    const dateEnd = new Date(endDate);
    return dateInitial < dateEnd ? false : true;
}

//GET ALL
app.get("/get-all-packages", (req, res) => {
    res.json(packages);
})

//GET PACKAGE BY ID
app.get("/get-package-by-id", (req, res) => {
    packages.forEach(value => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            return;
        }
    })
    res.status(400).send("Pacote inválido")
})

//CREATE PACKAGE
app.post("/create-package", (req, res) => {
    if (req.body.name === "" || req.body.name === undefined) {
        res.status(400).send("Nome inválido");
        return;
    }
    if (req.body.data_ida === "" || req.body.data_ida === undefined) {
        res.status(400).send("Data Ida inválida");
        return;
    }
    if (req.body.data_volta === "" || req.body.data_volta === undefined) {
        res.status(400).send("Data Volta inválida");
        return;
    }
    if (handleValidDates(req.body.data_ida, req.body.data_volta)) {
        res.status(400).send("Data Inicial deve ser anterior a Data Volta");
        return;
    }

    const newPackage = {
        id: packages[packages.length - 1].id + 1,
        name: req.body.name,
        data_ida: req.body.data_ida,
        data_volta: req.body.data_volta,
        details: req.body.details
    };
    packages.push(newPackage);
    res.json(newPackage);
})

//DELETE PACKAGE BY ID
app.delete("/delete-package-by-id", (req, res) => {
    packages.forEach((value, index) => {
        if (parseInt(req.query.id) === value.id) {
            res.json(value);
            packages.splice(index, 1);
            return;
        }
    })
    res.status(400).send("ID inválido");
})

//UPDATE PACKAGE BY ID
app.put("/update-package-by-id", (req, res) => {
    if (req.query.id === undefined || req.query.id === null) {
        res.status(400).send("Nenhum ID selecionado");
        return;
    }
    packages.forEach((value) => {
        if (parseInt(req.query.id) === value.id) {
            if (req.body.name === undefined || req.body.name === "" || req.body.data_ida === undefined || req.body.data_ida == ""
                || req.body.data_volta === undefined || req.body.data_volta == "" || req.body.details === undefined || req.body.details === "") {
                res.status(400).send("Não é possível alterar o pacote");
                return;
            }

            if (handleValidDates(req.body.data_ida, req.body.data_volta)) {
                res.status(400).send("Data Inicial deve ser anterior a Data Volta")
                return;
            }

            value.name = req.body.name;
            value.data_ida = req.body.data_ida;
            value.data_volta = req.body.data_volta;
            value.details = req.body.details;
            res.json(value);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
