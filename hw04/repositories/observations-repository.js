import mongoose from 'mongoose';

export const PHENOPHASES = [
  'bud break', 'leaf development', 'flowering', 'leaf color change', 'leaf fall',
];

const observationSchema = new mongoose.Schema({
  treeId: { type: String, required: true },
  phenophase: { type: String, required: true, enum: PHENOPHASES },
  date: { type: Date, required: true },
  percent: { type: Number, min: 0, max: 100 },
  confirmed: { type: Boolean, default: false },
}, { timestamps: true });

export const Observation = mongoose.model('Observation', observationSchema);

export const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);


export const getAll = async () => Observation.find().sort({ date: 1 }).lean();

export const findById = async (id) => Observation.findById(id).lean();



export const create = async (data) => (await Observation.create(data)).toObject();

export const updateById = async (id, data) =>
  Observation.findByIdAndUpdate(id, data, { new: true }).lean();

export const removeById = async (id) => { await Observation.findByIdAndDelete(id); };

export const findByTreeId = async (treeId) =>
  Observation.find({ treeId }).sort({ date: 1 }).lean();

export const findBudBreaksForTreeInYear = async (treeId, year) => {
  const start = new Date(`${year}-01-01T00:00:00.000Z`);
  const end = new Date(`${year}-12-31T23:59:59.999Z`);

  return Observation.find({   //
    treeId, phenophase: 'bud break', date: { $gte: start, $lte: end },
  }).sort({ date: 1 }).lean();
};
