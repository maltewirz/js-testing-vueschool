test('expectations', () => {
    expect('Some String').toBe('Some String');
    expect(13).toBe(13)
    expect([13]).toEqual([13]) // toEqual is for comparing complex values

    
    const result = {
        value: Date.now()
    }
    expect(result).toEqual({
        value: expect.any(Number)
    })

    // console.log(13 === 13)
    // console.log([13] === [13])
    // console.log({type: 'array', id: 1} === {type: 'array', id: 1})
})