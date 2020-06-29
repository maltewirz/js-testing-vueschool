const { TestScheduler } = require("jest")

const user = {
    name: 'El Franco',
    age: 42,
    job: 'Investor'
}

test('user matches', () => {
    // const userString = '{"name":"El Franco","age":42,"job":"Investor"}';
    // expect(JSON.stringify(user)).toEqual(userString);
    expect(user).toMatchSnapshot()
})

