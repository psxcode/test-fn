export type TestFnContext = {
  calls: any[][]
}

export type TestFn <T extends Function> = T & TestFnContext
