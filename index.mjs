import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import express from 'express'
import path from 'path'
import cors from 'cors'
import fs from 'fs'

import { get, validate } from './utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

function logResponse(response) {
  console.log('\n\nRESPONSE:\n\n', response)
  const timestamp = Date.now()
  const filePath = `./logs/${timestamp}.md`
  fs.writeFile(filePath, response, err => {
    if (err) {
      console.error(err)
      return
    }
  })
  return filePath
}

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <div>
      <h1>Nothing to see here(:</h1>
    </div>
  `)
})

app.post('/v1/posts/:id', async (req, res) => {
  const { id } = req.params
  res.json(get(id, req.body))
})

app.listen(8090, () => console.log('Server running on port 8090'))
