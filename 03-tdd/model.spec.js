import Model from './model'

test('new works', () => {
  expect(new Model).toBeInstanceOf(Model)
})

test('model structure', () => {
  expect(new Model).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
  }))
})
// $ prefix marks it as an internal property

describe('record', () => {
  const heroes = [{ id: 1, name: 'Batman'}, { name: 'Black Panther' }];

  test('can add data to the collection', () => {
    const model = new Model();
    model.record(heroes);
    
    expect(model.$collection).toEqual([
      heroes[0],
      {
        id: expect.any(Number),
        name: heroes[1].name
      }
    ]);
  });

  test('gets called when data is passed to the model', () => {
    const spy = jest.spyOn(Model.prototype, 'record');
    const model = new Model(heroes);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe('all', () => {
  const heroes = [{ name: 'Batman'}, { name: 'Black Panther' }];

  test('return empty model', () => {
    const model = new Model();
    expect(model.all()).toEqual([]);
  });

  test('retrieve all data', () => {
    const model = new Model(heroes);
    expect(model.all().length).toEqual(2);
  });

  test('original data stays intact', () => {
    const model = new Model(heroes);
    const data = model.all();
    data[0].name = 'Black Panther';
    expect(model.$collection[0].name).toBe('Batman');

  });
});

describe('find', () => {
  const heroes = [{ id: 1, name: 'Batman'}, { name: 'Black Panther' }];

  test('return null if nothing matches', () => {
    const model = new Model();
    expect(model.find(1)).toEqual(null);
  });

  test('find returns a matching entry', () => {
    const model = new Model(heroes);
    expect(model.find(1)).toEqual(heroes[0]);
  })
});

describe('update', () => {
  const heroesAndVillains = [{ id: 1, name: 'Batman' }];
  let model;

  beforeEach(() => {
    const dataset = JSON.parse(JSON.stringify(heroesAndVillains));
    model = new Model(dataset);
  });

  test('an entry by id', () => {
    model.update(1, {name: 'Joker' })
    expect(model.find(1).name).toBe('Joker');
  });

  test('extend an entry by id', () => {
    model.update(1, { cape: true });
    expect(model.find(1)).toEqual(
      expect.objectContaining({
        name: 'Batman',
        cape: true
      })
    )
  });

  test('return false if no entry matches', () => {
    expect(model.update(2, {})).toBe(false);
  })
})