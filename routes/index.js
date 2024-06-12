import { Router } from "express";
import path from "node:path"

const router = Router()

router.get("/", (req, res) => {
   res.sendFile(path.join(import.meta.dirname, "../static/index.html"))
})

export { router }