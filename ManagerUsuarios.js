const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { json } = require('stream/consumers');
const exp = require('constants');
class ProductManager{
   constructor(){
        this.products = [];
        this.path = fs.readFileSync('./Productos.json','utf-8');
   }
   getProducts(){
    try {
        const obj = JSON.parse(this.path);
        console.log(obj);
        }
    catch (error) {
        console.log(`No se pudo leer el archivo ${error}`);
    }
   }
    addProduct(title, description, price,link,stock){
        const producto = {
            id: uuidv4(),
            titulo: title,
            descripcion: description,
            precio: price,
            thumbnail: link,
            cantidad: stock
        }
        try {
            this.products = JSON.parse(this.path);
                if(title == "" || description == ""|| price == "" ||link =="" || stock ==""){
                console.log('Por favor complete todos los campos.');
                }
                else
                {
                  this.products.push(producto);
                  const information = JSON.stringify(this.products, null, 2);
                  fs.writeFileSync('./Productos.json', information);
                  console.log('Su archivo subiò con exito.');
                } 
            }
            catch(error){
                console.log('Error al subir el producto' + error);
            }     
   }
   getProductById(ide){
    let identificador = JSON.parse(this.path);
    try {
      const objetoEncontrado = identificador.find(objeto=>objeto.id === ide);
      if (objetoEncontrado) console.log(objetoEncontrado); 
      else console.log('No se encontró el usuario.')
    } 
    catch (error){
      console.log('Error en base de datos: ' + error);
    }
   } 
   updateProduct(ide,title, description, price,link,stock ){
    try {
        let identificador = JSON.parse(this.path);
        const index = identificador.findIndex(objeto => objeto.id === ide);
        if (index !== -1) {
            const nuevo = {
              id: ide,
              titulo: title,
              descripcion: description,
              precio: price,
              thumbnail: link,
              cantidad: stock
            };
            identificador[index] = nuevo;
            fs.writeFileSync('./Productos.json', JSON.stringify(identificador, null, 2));
            console.log('Producto actualizado exitosamente.');
          } else {
            console.log('Objeto no encontrado.');
          }
        } catch (error) {
          console.log('Error al actualizar el producto: ' + error);
        }
      }
   deleteProduct(ide) {
        try {
          let identificador = JSON.parse(this.path);
          const index = identificador.findIndex(objeto => objeto.id === ide);
          if (index !== -1) {
            identificador.splice(index, 1);
            fs.writeFileSync('./Productos.json', JSON.stringify(identificador, null, 2));
            console.log('Producto eliminado exitosamente.');
          } else {
            console.log('Objeto no encontrado.');
          }
        } catch (error) {
          console.log('Error al eliminar el producto: ' + error);
        }
      }
}

let producto1 = new ProductManager();
/* producto1.getProducts(); */
/* producto1.addProduct("Boarpremiun","",350000,"google.com","2"); */
producto1.addProduct("Mouse Gamer","Tipo Samurai",56000,"google.com","5");
/* producto1.getProductById("ef3cc4"); */
/* let variable = producto1.addProduct("1","1","3","2","5");*/
/* producto1.updateProduct("ed1e2aac-36c1-42dd-9ad6-6b4fae9ad462",'Consolador 3000', "a 3 mil",30000, "porhub.com", 3); */
/* producto1.updateProduct("bec0b462-5a39-4b67-ace0-7b76818656e1"); */
/* producto1.deleteProduct("ed1e2aac-36c1-42dd-9ad6-6b4fae9ad462") */