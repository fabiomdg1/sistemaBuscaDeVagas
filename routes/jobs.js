const express   = require("express");
const router    = express.Router();
const Job       = require("../models/Job");

// rota de teste
router.get("/test", (req,res) => {
    res.send("Deu certo !");
});

// rota add vagas
router.get("/add", (req, res) =>{
    res.render("add");
})

// add job via post
router.post("/add", (req,res) =>{
    let { titulo, descricao, salario, empresa, email, vagaNova} = req.body;

    // insert
    Job.create({
        titulo,
        descricao,
        salario,
        empresa,
        email,
        vagaNova
    })
    .then(() => res.redirect("/"))    
    .catch(err => console.log(err));
});

module.exports = router;

