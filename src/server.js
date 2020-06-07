/* SERVIDOR */
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public")) 



//utilizando template engine
const nunjucks = require("nunjucks")

nunjucks.configure("src/views",{
    express: server,
    noCache:true
})





//configurar os caminhos da aplicação
//Pagina inicial
//req requisição
//requisição é um pedido
//res resposta
server.get("/", (req,res) =>{
    return res.render("index.html",{
        title: "Um título"
    })
})

server.get("/create-point", (req,res) =>{
    return res.render("create-point.html")
})


server.get("/search", (req,res) =>{
    //pegar os dados do banco
    db.all(`SELECT * FROM places `, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length

        //mostrar a pagina html com o banco
        return res.render("search.html", {places: rows, total: total})

    })
})

//ligar o servidor
//O objeto server fica ouvindo a porta 3000
server.listen(3000)