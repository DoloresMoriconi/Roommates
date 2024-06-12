import '../scripts/createUser.js'
import { Router } from 'express'
import * as User from "../models/users.js"
import fs from 'node:fs/promises'
import path from 'node:path'
import axios from 'axios'

const router = Router()

router.get("/", async (req, res) => {
   try {
      await User.recalcularDeudas()
      const rommates = await User.getRommates()
      
      res.json(rommates)
   } catch (error) {
      console.error(error)
      res.send(error)
   }
   })

   router.post("/", async (req, res) => {
   try {
      const axiosResponse = await axios.get("https://randomuser.me/api/")

      const userResponded = axiosResponse.data.results[0]
      const userData = {
         nombre: userResponded.name.first + " " + userResponded.name.last,
         debe: 0,
         recibe: 0
      }

      const filePath = path.join(import.meta.dirname, "../data/userData.json")
      fs.readFile(filePath, "utf-8")
         .then(data => {
         const roommatesJson = JSON.parse(data)
         roommatesJson.roommates.push(userData)
         return roommatesJson
         })
         .then(data => {
         fs.writeFile(filePath, JSON.stringify(data))
         })
      res.json(userData)
   } catch (error) {
      res.status(500).json({error})
   }
})

export { router }