import './config/dotenv.js'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import EventsController from './controllers/events.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const clientSrcDir = path.join(__dirname, '../client/src')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(clientSrcDir, 'views'))
app.use(express.static(path.join(clientSrcDir, 'public')))

app.use(express.json())

app.get('/', EventsController.getEventsPage)
app.get('/events/:slug', EventsController.getEventDetailPage)

app.use((req, res) => {
  res.status(404).render('404')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
