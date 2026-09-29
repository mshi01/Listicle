import { pool } from '../config/database.js'

const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}

const getEventsPage = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT slug, title, event_date::text AS date, event_time AS time, location, image, description FROM events ORDER BY id ASC"
        )
        res.render('index', { events: results.rows })
    } catch (error) {
        res.status(500).send('Something went wrong loading events')
    }
}

const getEventDetailPage = async (req, res) => {
    try {
        const results = await pool.query(
            "SELECT slug, title, event_date::text AS date, event_time AS time, location, image, description FROM events WHERE slug = $1",
            [req.params.slug]
        )
        const event = results.rows[0]

        if (!event) {
            return res.status(404).render('404')
        }

        res.render('detail', { event })
    } catch (error) {
        res.status(500).send('Something went wrong loading the event')
    }
}

export default {
  getEvents,
  getEventsPage,
  getEventDetailPage
}
