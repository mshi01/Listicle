const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('It works.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});