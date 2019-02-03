export type TestFnInterface = {
  calls: any[][],
  errors: string[][]
}

export type TestFn <T extends Function> = T & TestFnInterface
