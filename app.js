const express = require("express");
const app = express();
const db = require("./db/connection");

const PORT = 3000;

app.listen(PORT, function(){
    console.log("O espress está rodando na porta " + PORT);
});


// Conexão com o banco
db
    .authenticate()
    .then(() => {
        console.log("Autenticado no banco de dados com sucesso.")
    }).catch((err) => {
        console.log("Ocorreu um erro ao autenticar", err);    
    });

// Rotas
app.get("/", (req, res)=>{
    res.send("Esta funcionando");
});