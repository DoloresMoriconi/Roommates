import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
const app = express()

// Importar rutas
import { router as users } from './routes/users.js'
import { router as home } from './routes/index.js'
import { router as expenses } from './routes/expenses.js'

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/", home)
app.use("/roommates", users)
app.use("/gastos", expenses)

app.listen(3000, () => {
   console.log("App en puerto 3000")
})