import { TestFnContext, TestFn } from './types'

export default <T extends any[], R>(fn: (...args: T) => R) => {
  const context: TestFnContext = {
    calls: [],
  }

  const tfn = (...args: T): R => {
    context.calls.push(args)

    return fn(...args)
  }

  Object.defineProperty(tfn, 'calls', {
    configurable: false,
    enumerable: false,
    get: () => context.calls.slice(),
  })

  return tfn as TestFn<(...args: T) => R>
}
