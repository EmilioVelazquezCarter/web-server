import { jest } from '@jest/globals';

jest.unstable_mockModule('../repositories/observations-repository.js', () => ({
  PHENOPHASES: ['bud break', 'leaf development', 'flowering', 'leaf color change', 'leaf fall'],
  isValidId: jest.fn(() => true),
  getAll: jest.fn(),
  findById: jest.fn(),
  findByTreeId: jest.fn(),
  create: jest.fn((data) => ({ _id: 'fake-id', confirmed: false, ...data })),
  updateById: jest.fn(),
  removeById: jest.fn(),
  findBudBreaksForTreeInYear: jest.fn(() => []),
}));

const { validateObservation } = await import('../services/observations-service.js');
const { findBudBreaksForTreeInYear } = await import('../repositories/observations-repository.js');

beforeEach(() => {
  findBudBreaksForTreeInYear.mockReset();
  findBudBreaksForTreeInYear.mockResolvedValue([]);
});

test('rejects a date in the future', async () => {
  const result = await validateObservation({
    treeId: 'ACRU-01',
    phenophase: 'bud break',
    date: '2099-01-01',
  });
  expect(result.ok).toBe(false);
});

test('rejects a leaf fall observation dated before this tree\'s own bud break', async () => {
  findBudBreaksForTreeInYear.mockResolvedValueOnce([{ date: new Date('2023-05-09') }]);
  const result = await validateObservation({
    treeId: 'ACRU-01',
    phenophase: 'leaf fall',
    date: '2023-04-01',
  });
  expect(result.ok).toBe(false);
});

test('accepts a leaf fall observation dated after this tree\'s own bud break', async () => {
  findBudBreaksForTreeInYear.mockResolvedValueOnce([{ date: new Date('2023-05-09') }]);
  const result = await validateObservation({
    treeId: 'ACRU-01',
    phenophase: 'leaf fall',
    date: '2023-10-18',
  });
  expect(result.ok).toBe(true);
});

test('accepts a leaf fall observation when no bud break exists yet for that tree/year', async () => {
  findBudBreaksForTreeInYear.mockResolvedValueOnce([]);
  const result = await validateObservation({
    treeId: 'ACRU-01',
    phenophase: 'leaf fall',
    date: '2023-10-18',
  });
  expect(result.ok).toBe(true);
});

test('rejects an observation with an invalid phenophase', async () => {
  const result = await validateObservation({
    treeId: 'ACRU-01',
    phenophase: 'not-a-real-phenophase',
    date: '2023-05-01',
  });
  expect(result.ok).toBe(false);
});

test('rejects an observation missing treeId', async () => {
  const result = await validateObservation({
    phenophase: 'bud break',
    date: '2023-05-01',
  });
  expect(result.ok).toBe(false);
});
