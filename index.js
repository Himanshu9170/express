//server restart ke liye npm i -D nodemon download in depencies  docs express api
//require('dotenv').config()  dot env website for environment variables agar node ka new version hai to dot env ki jarurat nhi pdti hai pehle se hi rahta hai
import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3000



// app.get("/",(req,res) => {
    //     res.send("Hello from Himanshu and his tea!")
    // })
    // app.get("/ice-tea",(req,res) => {
        //     res.send("Hello from Himanshu and his tea!")
        // })
        // app.get("/twitter",(req,res) => {
            //     res.send("himanshudotcom!")
            // })

             //crud application
            app.use(express.json())
            
            let teaData = []
            let nextId = 1
            //add a new tea
            app.post('/teas',(req,res) => {
    const {name,price} = req.body;
    const newTea = {id: nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

//get all tea
app.get('/teas',(req,res) => {
    res.status(200).send(teaData)
})

//agar request url me change hai to params ka ues krte hai
//get a tea with id
app.get('/teas/:id',(req,res) => {
   const tea = teaData.find((tea) => tea.id === parseInt(req.params.id))
   if(!tea){
    return res.status(404).send('Tea not found')
   }
   res.status(200).send(tea)
})

//update tea
app.put('/teas/:id',(req,res) => {
    const tea = teaData.find((tea) => tea.id === parseInt(req.params.id))
     if(!tea){
    return res.status(404).send('Tea not found')
   }
   const {name,price} = req.body
   tea.name = name
   tea.price = price
   res.send(200).send(tea)
  //res.status(200).send(tea) for code file
})

//delete tea
app.delete('/teas/:id',(req,res) => {
  const index = teaData.findIndex((tea) => tea.id === parseInt(req.params.id))
  if(index === -1){
    return res.status(404).send('tea not found')
  }
  teaData.splice(index,1)
  return res.status(204).send('deleted')
  // res.status(204).send('deleted') for code file
})


app.listen(port,() => {
    console.log(`Server is running at port: ${port}...`);
    
})