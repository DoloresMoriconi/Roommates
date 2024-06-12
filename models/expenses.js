import { v4 as uuidv4 } from "uuid"
import fs from "node:fs/promises"
import "../scripts/createExpenses.js"
import path from "node:path"

const expensesFile = path.join(import.meta.dirname, "../data/gastos.json")

const obtenerGastos = async () => {
   try {
      const data = await fs.readFile(expensesFile)
      const gastos = JSON.parse(data)

      return gastos
   } catch (error) {
      console.error(error)
      return error
   }
}

const crearGasto = async (payload) => {
   try {
      const data = await fs.readFile(expensesFile, "utf-8")
      const expensesData = JSON.parse(data)
      
    // Ingresa un nuevo gasto al objeto
      expensesData.gastos.push(payload)

      console.log(expensesFile)

      fs.writeFile(expensesFile, JSON.stringify(expensesData))

      return expensesData
   } catch (error) {
      console.error(error)
      return error
   }
}

const editarGasto = async (payload) => {
   try {
    // Obtiene id del payload y data de archivo
    // Cómo editaremos los gastos se usa palabra clave let
    // en este caso se obtiene el array directamente al destructurar
      const data = await fs.readFile(expensesFile, "utf-8")
      const gastosJson = JSON.parse(data)
      let {gastos} = gastosJson

      const { id } = payload

    // En caso que el ID coincida, se actualiza el gasto a
    // lo que venga del formulario
      gastos = gastos.map(gasto => {
         if (gasto.id == id) {
         gasto = payload
         return gasto
         } else {
         return gasto
         }
      })

   await fs.writeFile(expensesFile, JSON.stringify({gastos}))
      return gastos
   } catch (error) {
      console.error(error)
      return error
   }
}

const borrarGasto = async (id) => {
   try {
    
      const data = await fs.readFile(expensesFile, "utf-8")
      const gastosJSON = JSON.parse(data)
      // destructuramos para obtener el arreglo de gastos
      let {gastos} = gastosJSON
   
    // filtramos arreglo dejando todos los que NO 
    // queremos eliminar
      gastos = gastos.filter(gasto => !(gasto.id === id))
   
      await fs.writeFile(expensesFile, JSON.stringify({gastos}))
   
      return gastos
   } catch (error) {
      console.error(error)
   }
}


export { crearGasto, obtenerGastos, editarGasto, borrarGasto }