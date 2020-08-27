const express = require("express")
const server = express()

//pegar o banco de dados

const db = require("./database/db")

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

server.get("/search",(req,res)=>{

   // pegar os dados do banco de dados

   db.all (`SELECT * FROM places`,function(err,rows){
      if (err){
          return console.log(err)
      }
      const total = rows.length
      // mostrar a pagina HTML com os dados do bando de dados
      return res.render("search-results.html" ,{places:rows,total:total})
  })

})

// ligar o servidor
server.listen(3000)