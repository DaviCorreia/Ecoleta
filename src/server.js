const express = require("express")
const server = express()

//configurar pasta publica para importar todo CSS
server.use(express.static("public"))

//utilizando tamplete engine
const nunjucks = require("nunjucks")

nunjucks.configure("src/views",{
    express:server,
    noCache:true
})
//configurar caminhos da minha aplicação
//pagian inicial
// req : requisição
// res : resposta

server.get("/",(req,res)=>{
   return res.render("index.html",{title:"Davi"})
})

server.get("/create-point",(req,res)=>{
   return res.render("create-point.html")
})

// ligar o servidor
server.listen(3000)