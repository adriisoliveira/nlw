/* SERVIDOR */
const express = require("express")
const server = express()

//configurar pasta publica
server.use(express.static("public")) 



//utilizando template engine
const nunjucks = require("nunjucks")

nunjucks.configure("scr/views",{
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
    return res.render("search.html")
})

//ligar o servidor
//O objeto server fica ouvindo a porta 3000
server.listen(3000)