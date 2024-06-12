import { Router } from "express";
import fs from 'node:fs/promises'
import '../scripts/createExpenses.js'
import path from "node:path";
import { v4 as uuidv4 } from 'uuid';
// importamos todas las funciones bajo un alias de Gastos
import * as Gastos from "../models/expenses.js";


const router = Router()

router.get("/", async (req, res) => {
   try{
      const gastos = await Gastos.obtenerGastos()
      res.json(gastos)
   } catch {
      res.status(500).json({
         status: 500,
         message: 'Error interno de servidor'
      })
   }
   })

router.post("/", async (req, res) => {
   const { roommate, monto, descripcion } = req.body

   // analizamos que la solicitud traiga lo necesario
   if ( !roommate || !monto || !descripcion) {
      res.status(400).json({
         statud: 400,
         message: 'Missing elements in body req'
      })
   } else {
      const gasto = {
         roommate,
         monto,
         descripcion,
         fecha: new Date(),
         id: uuidv4()
      }
   
      try {
         // intentamos hacer operación de lectura escritura
         await Gastos.crearGasto(gasto)

         // respondemos con status creado
         res.status(201).json({
         message: 'Gasto Creado con éxito',
         gasto
         })
      } catch (error) {
         // respondemos con error interno
         res.status(500).json({
         message: "Error interno de servidor",
         status: 500
         })
      }
   }

   })

router.put("/", async (req, res) => {
   // Obtenemos id del queryString y payload
   const { id } = req.query
   const payload = req.body

   const traeValores = !Object.values(payload).some(value => value == '')
   if (traeValores) {
      try {
         // Agrega id a payload e invoca a la funcion editarGasto
         payload.id = id

         await Gastos.editarGasto(payload)
         res.status(200).json({
         message: 'Gasto eliminado'
         })
      } catch (error) {
         res.status(500).json({
         status: 500,
         message: 'Error interno de servidor'
         })
      }
   }
   })

router.delete("/", async (req, res) => {
   const {id} = req.query

   if(!id) {
      res.status(400).json({
         message: 'Missing id',
         status: 400
      })
   } else {
      try {
         await Gastos.borrarGasto(id)

         res.json({
         message: 'Gasto borrado con éxito'
         })
      } catch (error) {
         res.status(500).json({
         message: 'Error interno de servidor'
         })
      }
   }
})

export { router }