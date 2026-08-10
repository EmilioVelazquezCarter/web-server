export const toObservationDto = (doc) => ({
  id: String(doc._id),
  treeId: doc.treeId,
  phenophase: doc.phenophase,
  date: new Date(doc.date).toISOString().slice(0, 10),
  percent: doc.percent,
  confirmed: doc.confirmed,
});
