import { describe, it } from 'mocha'
import { expect } from 'chai'
import testfn from '../src'

const add2 = (x: number) => x + 2
const add = (x: number, y: number) => x + y
const curryAdd = (x: number) => (y: number) => x + y
const voidFn = (x: number) => {}

describe('[ testfn ]', () => {
  it('no calls', () => {
    const fn = testfn(add2)

    expect(fn.calls).deep.eq([])
  })

  it('1 arg, 1 call', () => {
    const fn = testfn(add2)

    const result = fn(2)

    expect(result).eq(4)
    expect(fn.calls).deep.eq([
      [2],
    ])
  })

  it('2 args, several calls', () => {
    const fn = testfn(add)

    const res0 = fn(2, 2)
    const res1 = fn(4, 3)

    expect(res0).eq(4)
    expect(res1).eq(7)
    expect(fn.calls).deep.eq([
      [2, 2],
      [4, 3],
    ])
  })

  it('curried function', () => {
    const fn = testfn(curryAdd)

    const res0 = fn(2)(2)
    const res1 = fn(4)(3)

    expect(res0).eq(4)
    expect(res1).eq(7)
    expect(fn.calls).deep.eq([
      [2],
      [4],
    ])
  })

  it('void function', () => {
    const fn = testfn(voidFn)

    const res0 = fn(2)

    expect(res0).eq(undefined)
    expect(fn.calls).deep.eq([
      [2],
    ])
  })

  it('default function', () => {
    const fn = testfn()

    const res0 = fn(2)
    const res1 = fn(4)

    expect(res0).eq(undefined)
    expect(res1).eq(undefined)
    expect(fn.calls).deep.eq([
      [2],
      [4],
    ])
  })
})
