const express = require("express")
const server = express()

//pegar o banco de dados

const db = require("./database/db")

//configurar pasta publica para importar todo CSS
server.use(express.static("public"))

//habilitar o uso de req.body na nossa aplicação
server.use(express.urlencoded({extended:true}))

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
   //req.query : Query strings da nosa url

   

   return res.render("create-point.html")
})

server.post("/savepoint",(req,res)=>{

  // console.log(req.body)
  //inserir dados no banco de dados
  const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?); 

    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if (err){
            return console.log(err)
            //return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        
        return res.render("create-point.html",{ saved: true})
    }
    db.run(query,values,afterInsertData)


   //return res.send("ok")
})

server.get("/search",(req,res)=>{

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html" ,{ total:0})
    }

   // pegar os dados do banco de dados

   db.all (`SELECT * FROM places WHERE city LIKE '%${search}%'`,function(err,rows){
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