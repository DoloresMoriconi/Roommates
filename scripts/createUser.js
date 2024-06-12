import fs from 'node:fs/promises'
import path from 'node:path'


fs.readdir(path.join(import.meta.dirname, "../data"), "utf-8")
   .then(data => {
      if (! data.includes('userData.json')) {
         const userData = {
         users: []
         }
         fs.writeFile("data/userData.json", JSON.stringify(userData))
         .then(() => console.log("Created users file"))
      } else {
         console.log("User data exists")
      }
   })