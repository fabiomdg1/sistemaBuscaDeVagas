const express           = require("express");
const exphbs            = require("express-handlebars");
//const exphbs = require("express-handlebars").create({ defaultLayout: "main" });
const app               = express();
const path              = require("path");
const db                = require("./db/connection");
const bodyParse         = require("body-parser");
const Job               = require("./models/Job");
const Sequelize         = require("sequelize");
const Op                = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function(){
    console.log("O espress está rodando na porta " + PORT);
});

// body parser
app.use(bodyParse.urlencoded({extended: false}));

// handlebars
app.set("views", path.join(__dirname, "views")); // Este comando está configurando o diretório onde o Express.js irá procurar as views da aplicação.

app.engine("handlebars", exphbs({defaultlayout:"main"})); // Este comando está configurando o mecanismo de visualização (view engine) do Express.js para usar o Handlebars. {defaultlayout:"main"} define que o layout padrão para as views será o arquivo "main.handlebars".


//app.engine("handlebars", exphbs({ defaultLayout: "main" }).engine);




app.set("view engine", "handlebars"); // Este comando define o mecanismo de visualização padrão da aplicação como handlebars

// static folder
app.use(express.static(path.join(__dirname,"public"))); //Este trecho constrói o caminho absoluto para a pasta "public" dentro do diretório atual do seu aplicativo. A pasta "public" é comumente usada para armazenar arquivos estáticos que serão servidos para os clientes, como páginas HTML, imagens, folhas de estilo CSS e scripts JavaScript.

// Conexão com o banco
db
    .authenticate()
    .then(() => {
        console.log("Autenticado no banco de dados com sucesso...")
    }).catch((err) => {
        console.log("Ocorreu um erro ao autenticar", err);    
    });

// Alimentando o jobs
app.get("/", (req, res)=>{

    let search = req.query.job;
    let query = "%"+search+"%";

    if(!search){
        Job.findAll({ order: 
            [["createdAt", "DESC"]] 
        }) // Corrigindo a ordenação aqui
        .then(jobs =>{
            res.render("index", {
                jobs, search
            });
        })
        .catch(error => {
            console.error('Erro ao buscar trabalhos:', error);
            res.status(500).send('Erro interno do servidor 1');
        });    
    } else{
        Job.findAll({ 
            //where: {titulo: {[Op.like]: search}},
            where: { titulo: { [Op.like]: query } }, // Condição de pesquisa ajustada
            order: [["createdAt", "DESC"]] }) // Corrigindo a ordenação aqui
        .then(jobs =>{
            res.render("index", {
                jobs, search
            });
        })
        .catch(error => {
            console.error('Erro ao buscar trabalhos:', error);
            res.status(500).send('Erro interno do servidor 2');
        });    
    }
});

// Rotas do jobs
app.use("/jobs", require("./routes/jobs"));