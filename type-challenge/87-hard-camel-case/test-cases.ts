import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCaseHard<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCaseHard<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCaseHard<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCaseHard<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCaseHard<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCaseHard<''>, ''>>,
]

type CCC = CamelCaseHard<'HELLO_WORLD_WITH_TYPES'>