
const express=require('express')
const ProductManager=require('./productManager')
const PORT=8080
const app=express()
app.get('/',(req, res)=>{
    res.send('<h1 style="color:red">Bienvenidos al server desarrollado con ExpressJS</h1>')
})

app.get('/products', async (req, res) => {
    let limit = req.query.limit
    const products = await ProductManager.pm.getProducts()
    if(limit){
        res.json({status: 'ok', "resp":products.slice(0,limit)})
    }else{
        res.json({status: 'ok', "resp":products})
    }
    
})

app.get('/products/:id', async (req, res) => {
    let {id}=req.params
    console.log(req.params.id)
    id=parseInt(id)
    if(isNaN(id)){
        res.json({status:'error', mensaje: 'Requiere un argumento id numerico'})
        return
    }
        
    let resultado = await ProductManager.pm.getProductsById(id)

    if(resultado){
        res.json({status: 'ok', producto: resultado })
    }else{
        res.json({status:'error', mensaje: `El producto con ID: ${id} no existe`})
    }

})


app.get('*',(req, res)=>{
    res.send('Error 404 - Page not found')
})





app.listen(PORT, ()=>{
    console.log(`Server corriendo en puerto ${PORT}`)
})

