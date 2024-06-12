import fs from 'node:fs/promises'
import path from 'node:path'

const dir = path.join(import.meta.dirname, "../data")
fs.readdir(dir)
   .then(data => {
      if (!data.includes('gastos.json')) {
         const expensesData = {
         gastos: []
         }
         fs.writeFile("data/gastos.json", JSON.stringify(expensesData))
         .then(() => console.log("Created expenses file"))
      } else {
         console.log("Expenses data exists")
      }
   })