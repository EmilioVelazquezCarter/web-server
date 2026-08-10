import express from 'express';
import mongoose from 'mongoose';


import observationsRoutes from './routes/observations-routes.js';
import { listObservations } from './services/observations-service.js';

const trees = [
  { treeId: 'ACRU-01', species: 'Red Maple', latinName: 'Acer Rubrum', site: 'Locust Opening Rd.' },

  { treeId: 'ACRU-03', species: 'Red Maple', latinName: 'Acer Rubrum', site: 'Causeway Rd.' },

  { treeId: 'QURU-01', species: 'Red Oak', latinName: 'Quercus Rubra', site: 'Locust Opening Rd.' },
  { treeId: 'QURU-03', species: 'Red Oak', latinName: 'Quercus Rubra', site: 'Prospect Hill Rd.' },

  { treeId: 'BEPA-05', species: 'Paper Birch', latinName: 'Betula Papyrifera', site: null },


  { treeId: 'BEPA-07', species: 'Paper Birch', latinName: 'Betula Papyrifera', site: null },

  { treeId: 'FAGR-01', species: 'Beech', latinName: 'Fagus Grandifolia', site: 'Locust Opening Rd.' },


  { treeId: 'FAGR-04', species: 'Beech', latinName: 'Fagus Grandifolia', site: 'Prospect Hill Rd.' },
];

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');



app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Harvard Forest Phenology Tracker', version: '1.0' });
});


app.get('/status', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});


app.get('/trees', (req, res) => {
  res.status(200).json(trees);
});

//l
app.get('/trees/:treeId', (req, res) => {
  const tree = trees.find((t) => t.treeId === req.params.treeId);
  if (!tree) {
    res.status(404).json({ error: 'tree not found' });
    return;
  }

  res.status(200).json(tree);
});

app.get('/dashboard', async (req, res) => {
  const { listObservations } = await import('./services/observations-service.js');
  const result = await listObservations();
  res.status(200).render('dashboard', { trees, observations: result.value });
});


app.use('/observations', observationsRoutes);

const PORT = process.env.PORT || 3000;

const start = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://dev:devpassword@mongo:27017/devdb'
  );


  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

start();

export default app;
