import express from 'express';
import pagesRouter from './routes/pages.js';
import apiRouter from './routes/api.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', pagesRouter);
app.use('/api', apiRouter);

app.get('/hello/:name', (req, res) => {
  res.send(`Hello, ${req.params.name}!`);
});

app.get('/repeat/:word', (req, res) => {
  const word = req.params.word;
  res.send(`${word} ${word} ${word}`);
});

app.get('/count', (req, res) => {
  const from = req.query.from || 1;
  const to = req.query.to || 10;
  res.send(`Counting from ${from} to ${to}.`);
});

app.get('/api/error', (req, res) => {
  res.status(400).send('Bad request');
});

app.use((req, res) => {
  res.status(404).send('Page not found.');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
