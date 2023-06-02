const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

//DATA
const packages = [
    {
        id: 1,
        name: "Paris",
        data_ida: "30/05/23",
        data_volta: "05/06/23"
    },
    {
        id: 2,
        name: "Rio de Janeiro",
        data_ida: "03/06/23",
        data_volta: "14/06/23"
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
        data_volta: req.body.data_volta
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
    packages.forEach((value) => {
        if (parseInt(req.query.id) === value.id) {
            if (req.body.name === undefined || req.body.name === "" || req.body.data_ida === undefined || req.body.data_ida == ""
                || req.body.data_volta === undefined || req.body.data_volta == "") {
                res.status(400).send("Não é possível alterar o pacote");
                return;
            }

            value.name = req.body.name;
            value.data_ida = req.body.data_ida;
            value.data_volta = req.body.data_volta;
            res.json(value);
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
