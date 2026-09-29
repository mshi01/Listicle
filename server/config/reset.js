import { pool } from './database.js'
import './dotenv.js'
import events from '../../client/src/data/events.js'

const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            slug VARCHAR(100) NOT NULL UNIQUE,
            title VARCHAR(150) NOT NULL,
            event_date DATE NOT NULL,
            event_time VARCHAR(50) NOT NULL,
            location VARCHAR(200) NOT NULL,
            image VARCHAR(255),
            description TEXT
        );
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    events.forEach((event) => {
        const insertQuery = {
            text: 'INSERT INTO events (slug, title, event_date, event_time, location, image, description) VALUES ($1, $2, $3, $4, $5, $6, $7)'
        }

        const values = [
            event.slug,
            event.title,
            event.date,
            event.time,
            event.location,
            event.image,
            event.description
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting event', err)
                return
            }

            console.log(`✅ ${event.slug} added successfully`)
        })
    })
}

seedEventsTable()