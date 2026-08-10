import mongoose from 'mongoose';
import { Observation } from './repositories/observations-repository.js';

const observations = [
  { treeId: "ACRU-01", phenophase: "flowering", date: "2022-04-12", percent: 20 },
  { treeId: "ACRU-01", phenophase: "bud break", date: "2022-05-17", percent: 60 },

  { treeId: "ACRU-01", phenophase: "leaf development", date: "2022-05-31", percent: 75 },
  { treeId: "ACRU-01", phenophase: "leaf color change", date: "2022-09-30", percent: 62 },
  { treeId: "ACRU-01", phenophase: "leaf fall", date: "2022-10-16", percent: 97 },
  { treeId: "ACRU-01", phenophase: "flowering", date: "2023-04-14", percent: 85 },


  { treeId: "ACRU-01", phenophase: "bud break", date: "2023-05-09", percent: 50 },
  { treeId: "ACRU-01", phenophase: "leaf development", date: "2023-05-30", percent: 65 },

  { treeId: "ACRU-01", phenophase: "leaf color change", date: "2023-10-05", percent: 83 },
  { treeId: "ACRU-01", phenophase: "leaf fall", date: "2023-10-18", percent: 57 },

  { treeId: "ACRU-03", phenophase: "flowering", date: "2022-04-12", percent: 5 },
  { treeId: "ACRU-03", phenophase: "bud break", date: "2022-05-17", percent: 95 },
  { treeId: "ACRU-03", phenophase: "leaf development", date: "2022-05-31", percent: 75 },
  { treeId: "ACRU-03", phenophase: "leaf color change", date: "2022-09-30", percent: 62 },

  { treeId: "ACRU-03", phenophase: "leaf fall", date: "2022-10-11", percent: 62 },
  { treeId: "ACRU-03", phenophase: "flowering", date: "2023-04-14", percent: 50 },
  { treeId: "ACRU-03", phenophase: "bud break", date: "2023-05-01", percent: 1 },
  { treeId: "ACRU-03", phenophase: "leaf development", date: "2023-06-05", percent: 75 },
  { treeId: "ACRU-03", phenophase: "leaf color change", date: "2023-10-05", percent: 93 },
  { treeId: "ACRU-03", phenophase: "leaf fall", date: "2023-10-13", percent: 95 },
  { treeId: "BEPA-05", phenophase: "bud break", date: "2022-05-12", percent: 95 },

  { treeId: "BEPA-05", phenophase: "leaf color change", date: "2022-09-30", percent: 57 },
  { treeId: "BEPA-05", phenophase: "leaf fall", date: "2022-10-16", percent: 55 },
  { treeId: "BEPA-05", phenophase: "bud break", date: "2023-04-24", percent: 5 },
  { treeId: "BEPA-05", phenophase: "leaf color change", date: "2023-10-05", percent: 70 },
  { treeId: "BEPA-05", phenophase: "leaf fall", date: "2023-10-18", percent: 63 },
  { treeId: "BEPA-07", phenophase: "bud break", date: "2022-05-12", percent: 90 },
  { treeId: "BEPA-07", phenophase: "leaf color change", date: "2022-10-11", percent: 72 },
  { treeId: "BEPA-07", phenophase: "leaf fall", date: "2022-10-21", percent: 67 },

  { treeId: "BEPA-07", phenophase: "bud break", date: "2023-05-01", percent: 5 },


  { treeId: "BEPA-07", phenophase: "leaf color change", date: "2023-10-18", percent: 90 },
  { treeId: "BEPA-07", phenophase: "leaf fall", date: "2023-10-26", percent: 77 },
  { treeId: "FAGR-01", phenophase: "bud break", date: "2022-05-12", percent: 3 },

  { treeId: "FAGR-01", phenophase: "leaf development", date: "2022-05-31", percent: 65 },
  { treeId: "FAGR-01", phenophase: "leaf color change", date: "2022-09-30", percent: 67 },
  { treeId: "FAGR-01", phenophase: "leaf fall", date: "2022-10-16", percent: 75 },

  { treeId: "FAGR-01", phenophase: "bud break", date: "2023-05-01", percent: 2 },
  { treeId: "FAGR-01", phenophase: "leaf development", date: "2023-06-05", percent: 50 },
  { treeId: "FAGR-01", phenophase: "leaf color change", date: "2023-09-12", percent: 75 },
  { treeId: "FAGR-01", phenophase: "leaf fall", date: "2023-10-13", percent: 62 },
  { treeId: "FAGR-01", phenophase: "leaf color change", date: "2023-11-03", percent: 65 },
  { treeId: "FAGR-04", phenophase: "bud break", date: "2022-05-07", percent: 30 },
  { treeId: "FAGR-04", phenophase: "leaf development", date: "2022-05-23", percent: 70 },
  { treeId: "FAGR-04", phenophase: "leaf color change", date: "2022-11-03", percent: 100 },
  { treeId: "FAGR-04", phenophase: "leaf fall", date: "2022-11-03", percent: 87 },

  { treeId: "FAGR-04", phenophase: "flowering", date: "2023-04-20", percent: 100 },
  { treeId: "FAGR-04", phenophase: "bud break", date: "2023-04-24", percent: 50 },
  { treeId: "FAGR-04", phenophase: "leaf development", date: "2023-05-15", percent: 60 },
  { treeId: "FAGR-04", phenophase: "leaf color change", date: "2023-10-26", percent: 55 },
  { treeId: "FAGR-04", phenophase: "leaf fall", date: "2023-11-03", percent: 50 },
  { treeId: "QURU-01", phenophase: "bud break", date: "2022-05-12", percent: 35 },

  { treeId: "QURU-01", phenophase: "leaf development", date: "2022-05-31", percent: 60 },
  { treeId: "QURU-01", phenophase: "leaf color change", date: "2022-10-16", percent: 55 },
  { treeId: "QURU-01", phenophase: "leaf fall", date: "2022-11-03", percent: 99 },

  { treeId: "QURU-01", phenophase: "bud break", date: "2023-04-24", percent: 3 },
  { treeId: "QURU-01", phenophase: "flowering", date: "2023-05-01", percent: 75 },
  { treeId: "QURU-01", phenophase: "leaf development", date: "2023-06-05", percent: 65 },
  { treeId: "QURU-01", phenophase: "leaf color change", date: "2023-11-03", percent: 99 },
  { treeId: "QURU-01", phenophase: "leaf fall", date: "2023-11-10", percent: 65 },
  { treeId: "QURU-03", phenophase: "bud break", date: "2022-05-12", percent: 30 },


  { treeId: "QURU-03", phenophase: "leaf development", date: "2022-05-31", percent: 60 },
  { treeId: "QURU-03", phenophase: "leaf color change", date: "2022-11-03", percent: 100 },
  { treeId: "QURU-03", phenophase: "leaf fall", date: "2022-11-03", percent: 62 },
  { treeId: "QURU-03", phenophase: "bud break", date: "2023-04-24", percent: 30 },

  { treeId: "QURU-03", phenophase: "flowering", date: "2023-04-24", percent: 25 },
  { treeId: "QURU-03", phenophase: "leaf development", date: "2023-06-05", percent: 70 },
  { treeId: "QURU-03", phenophase: "leaf color change", date: "2023-11-03", percent: 80 },
  { treeId: "QURU-03", phenophase: "leaf fall", date: "2023-11-16", percent: 72 },
];

const run = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://dev:devpassword@mongo:27017/devdb'
  );



  await Observation.deleteMany({});
  await Observation.insertMany(
    observations.map((observation) => ({
      ...observation,
      date: new Date(observation.date),
      confirmed: false,
    }))
  );


  console.log(`Seeded ${observations.length} observations.`);
  await mongoose.disconnect();
};

run();
