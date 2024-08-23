import { expect, test, describe } from 'vitest'

function sum(a: number, b: number) {
    return a + b
}

describe('test', () => {
    test('sum', () => {
        expect(sum(1,2)).toBe(3)
    })
})


