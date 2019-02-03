import { TestFn } from './types'

const isError = (obj: any): obj is Error => {
  return typeof obj === 'object' && typeof obj.stack === 'string' && typeof obj.message === 'string'
}

export default <T extends any[], R = void>(fn: (...args: T) => R = () => undefined as any) => {
  const calls: any[][] = []

  const tfn = (...args: T) => {
    calls.push(args)

    return fn(...args)
  }

  Object.defineProperty(tfn, 'calls', {
    configurable: false,
    enumerable: false,
    get: () => calls.slice(),
  })

  Object.defineProperty(tfn, 'errors', {
    configurable: false,
    enumerable: false,
    get: () => calls.map((c) => (isError(c[0]) ? [c[0].message] : [undefined])),
  })

  return tfn as TestFn<typeof fn>
}
