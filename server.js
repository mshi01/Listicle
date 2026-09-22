const express = require('express');
const app = express();
const events = require('./data/events');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('index', { events });
});

app.get('/events/:slug', (req, res) => {
  const event = events.find(e => e.slug === req.params.slug);

  if (!event) {
    return res.status(404).render('404');
  }
  res.render('detail', { event });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});