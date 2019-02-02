import { TestFnContext, TestFn } from './types'

export default <T extends any[], R = void>(fn: (...args: T) => R = () => undefined as any) => {
  const context: TestFnContext = {
    calls: [],
  }

  const tfn = (...args: T) => {
    context.calls.push(args)

    return fn(...args)
  }

  Object.defineProperty(tfn, 'calls', {
    configurable: false,
    enumerable: false,
    get: () => context.calls.slice(),
  })

  return tfn as TestFn<typeof fn>
}
