# TS 类型体操记录

## 写在前面

[ts 类型体操 github](https://github.com/type-challenges/type-challenges/)

## 01. Easy Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

**知识点**

1. 如果获取对象 Key 的类型？**使用`keyof`关键字**
2. ts mapping 的用法，使用 `in`关键字，其作用的是从多个类型中获取其中的一个类型（**遍历对象`keyof`拿到的值**，使用`in`关键字）

```typescript
// 比如 A 的定义是如下所示
type A = "a" | "b" | "c";

// 获取类型为 'a', 'b'. 'c'的写法就是mapping
interface IAObject {
  [P in A]: P;
}
```

## 2. easy readOnly

只需要将 key 前面加上`readonly`关键字，这个变量就变成了只读。

```typescript
type MyReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## 3. Easy Tuple Object

完成从数组到对象的映射关系

```typescript
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P;
};
```

**知识点**

如何遍历数组中的每个元素？

当**T extends any[]**的时候，使用`T[number]`

## 4. First of Array

当为空数组的时候返回 never，如果数组有值返回第一个数组的第一个值

```typescript
type First<T extends any[]> = T extends [] ? never : T[0];
```

**知识点**

1. 取数组的第一个值：使用`T[0]`
2. ts 的三元表达式，怎么表示 T 是一个空数组：使用**T extends []**即可

## 5. Length of Tuple

返回一个数组的长度

```typescript
type Length<T extends readonly string[]> = T["length"];
```

**知识点**

1. 只要知道了`T extends any[]`，这个时候说明 T 一定是个 string 类型，就和`T[0]`一样可以调用 T 的任何属性，所以为`T[length]`

2. 为什么要加`readOnly`，因为在这个时候题目中的`tesla`定义为

   ```typescript
   const tesla = ["tesla", "model 3", "model X", "model Y"] as const;
   ```

   这个`as const`说明一定是个`readonly`的类型

## 6. Exclude

```typescript
type MyExclude<T, U> = T extends U ? never : T;
```

## 7. MyAwaited

```typescript
type MyAwaited<T extends Promise<any>> = T extends Promise<infer K>
  ? K extends Promise<infer R>
    ? R
    : K
  : never;
```

**知识点**

1. 当我们使用`any`的时候，后面可以通过`infer`关键字来推断对应的类型
2. 这里为啥通过`K extends Promise<infer R>`又判断一层，因为有两层`Promise`嵌套的场景

## 8. Easy If

```typescript
type If<C, T, F> = C extends true ? (C extends null ? F : T) : F;
```

## 9. Easy Concat

```typescript
type Concat<T extends any[], U extends any[]> = [...T, ...U];
```

**知识点**

1. 使用`...`运算符在`typescript`中可以达到合并两个数组的效果

## 10. Easy includes

```typescript
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

type Includes<T extends readonly any[], U> = T extends [
  infer First,
  ...infer Rest
]
  ? Equal<First, U> extends true
    ? true
    : Includes<Rest, U>
  : false;
```

**知识点**

1. 使用`Equal`的方法来进行判断，因为 `false extends boolean`的话直接用`extends`是没办法判断出来的

2. `typescript`也可以使用递归的方式，进行调用，比如这里在`Includes`中继续使用`Includes`

## 11. Easy Push

```typescript
type Push<T extends any[], U> = [...T, U];
```

## 12. Easy Unshift

```typescript
type Unshift<T extends any[], U> = [U, ...T];
```

**知识点**

1. 使用`typescript`的扩展运算符`...`继承相应的数组内元素的类型

## 13. Easy Parameters

```typescript
type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : [];
```

## 14. Medium ReturnType

```typescript
type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer P
  ? P
  : void;
```

## 15. Medium Omit

```typescript
type MyExclude<T, K> = T extends K ? never : T;

type MyOmit<T, K extends keyof T> = {
  [key in MyExclude<keyof T, K>]: T[key];
};
```

**知识点**

1. 当我们想要在某个值的场景下不返回任何东西的时候，直接返回 never，会在复合类型中去除掉某值
2. 这里我们使用`Exclude`

## 16. Medium ReadOnly

和简单题中`readOnly`的区别，需要同时支持，指定的 key 被`readonly`和全部为`readonly`的情况

```typescript
type MyExclude<T, K> = T extends K ? never : T;

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [key in K]: T[key];
} & {
  [key2 in MyExclude<keyof T, K>]: T[key2];
};
```

**知识点**

1. 对象中用的`key`是一个范围定义，所以不能在一个对象中对应两个`key`，这个时候需要我们通过定义两个对象然后把他们通过 `&`进行连接

## 17. Medium Deep ReadOnly

对对象类型的元素需要进行`deep readonly`的操作

```typescript
// 写法一：枚举所有不需要deep readonly的类型
type Primitive = string | number | boolean

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Primitive | Function
    ? T[K]
    : DeepReadonly<T[K]>;
};

// 写法二通过是否有key来判断是否为对象类型
type DeepReadonly2<T> = {
  readonly [K in keyof T]: keyof T[K] extends never ? T[K] : DeepReadonly<T[K]>;
};

```

**知识点**

1. 可以使用递归的方式调用 Typescript 的`type`类型
2. ts 中如何判断一个元素为对象，可以使用`keyof T extends never`代表如果没有 key 就不是一个对象。

## 18 元组转集合

```typescript
type TupleToUnion<T extends any[]> = T[number];
type TupleToUnion<T extends any[]> = T extends (infer P)[] ? P : never;
```

**知识点**

1. `infer P`推断数组中元素的时候需要加括号，然后才加`[]`不然会不对
2. 数组索引用`T[number]`

## 19. Medium Chainable

需要实现的功能如下：

```typescript
declare const a: Chainable;

const result = a
  .option("foo", 123)
  .option("bar", { value: "Hello World" })
  .option("name", "type-challenges")
  .get();

type cases = [Expect<Alike<typeof result, Expected>>];

type Expected = {
  foo: number;
  bar: {
    value: string;
  };
  name: string;
};
```

这道题目比较难的一点是需要不断的在 option 执行后的内容类似递归一样能够叠加，所以要如何做到呢~

答案如下~

```typescript
type Chainable<T extends object = {}> = {
  option<M extends string, V extends any>(
    key: M,
    value: V
  ): V extends infer P
    ? Chainable<
        {
          [key in M]: P;
        } & T
      >
    : never;
  get(): T;
};
```

**知识点**

1. 可以增加泛型 + 默认值的方式来扩展字段
2. 对于函数的参数，如果需要使用`infer`推断，或者要将`string`类型转换成 `const`这个时候可以将参数搞成泛型，这样就可以用推断的方式来进行操作了

## 20. Medium Last of Array

这个题目比较简单，使用`...`这个扩展运算符即可

```typescript
type Last<T extends any[]> = T extends [...any[], infer P] ? P : undefined;
```

## 21. Medium Pop

```typescript
type Pop<T extends any[]> = T extends [...infer P, any] ? P : [];
```

**知识点**

1. 如果需要推断数组的类型，比如`[1, 2] as const`，要直接`infer P`
2. 如果想要推断`T[number]`,数组中索引的每一项，这个时候可以使用`(infer P)[]`

## 22. Medium Promise all

```typescript
declare function PromiseAll<T extends any[] = any[]>(
  values: readonly [...T]
): Promise<{ [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K] }>;
```

**知识点**

1. 将一个`any[]`转换为一个`const`在 typescript 类型中的操作为增加 readOnly，就可以将范围缩小
2. 当一个数组`readonly`的时候，意味着他的顺序是一定的，这个时候也可以使用遍历对象的 mapped 去遍历数组

## 23. Medium Type Look up

```typescript
type LookUp<U extends { type: any }, T> = U extends infer P
  ? P extends { type: any }
    ? T extends P["type"]
      ? P
      : never
    : never
  : never;
```

**知识点:**

1. 勇敢的用`infer`直到判断出你想要的那个值

## 24. Medium TrimLeft

```typescript
type TrimLeft<T extends string> = T extends `${infer P}${infer K}`
  ? P extends " " | "\n" | "\t"
    ? TrimLeft<K>
    : T
  : never;
```

**知识点**

1. 使用扩展运算符的时候也能使用`infer`进行类型的判断
2. TS 递归的使用

## 25. Medium Trim

```typescript
type EmptyType = " " | "\t" | "\n";

type TL<S extends string> = S extends `${infer P}${infer K}`
  ? P extends " " | "\t" | "\n"
    ? TL<K>
    : S
  : never;

type TR<S extends string> = S extends `${infer P}${EmptyType}` ? TR<P> : S;

type Trim<S extends string> = TR<TL<S>>;
```

**知识点**

1. trimRight 不能和 TL 写的一样， 因为这里的 P 和 Ｋ其实是贪婪的抓取，不会想象成从末尾开始取，所以这里要明确 extends 是不是末尾有 EmptyType
2. 对某个想要 TS 识别的特殊结构，直接枚举出来就行

## 26. Medium Capitalize

```typescript
type CapMap = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

type Capitalize1<S extends string> = S extends ""
  ? ""
  : S extends `${infer P}${infer T}`
  ? P extends keyof CapMap
    ? `${CapMap[P]}${T}`
    : S
  : never;
```

**知识点**

1. 字符串模版的推断
2. keyof 的使用

## 27. Medium Replace

```typescript
type Replace<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer T}${From}${infer Z}`
  ? `${T}${To}${Z}`
  : S;
```

**知识点**

1. 字符串推断的类型可以是动态外部传入的

## 28. Medium Replace All

```typescript
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = From extends ""
  ? S
  : S extends `${infer T}${From}${infer K}`
  ? `${T}${To}${ReplaceAll<K, From, To>}`
  : S;
```

**知识点**

1. 字符串模版推断支持 TS 递归

## 29. Medium Add Arguement

```typescript
type ARGS<T extends any> = T extends (...args: infer P) => any ? P : never;
type MyReturn<T extends any> = T extends (...args: any[]) => infer P
  ? P
  : never;

type AppendArgument<Fn, A> = (
  ...args: [...ARGS<Fn>, ...[x: A]]
) => MyReturn<Fn>;
```

**知识点**

1. 函数参数的追加可以通过`...`扩展运算符来实现
2. 定义参数类型就和函数定义参数类型的方式类似

## 30. Medium Permutation

```typescript
type Permutation<T extends any, U = T> = (() => T) extends () => never
  ? []
  : T extends U
  ? [T, ...Permutation<Exclude<U, T>>]
  : [];
```

**知识点**

1. type 是"a" | "b" | "c", 如果想去掉一个类型，剩下两个自由组合的话可以参考下面的这个例子

```typescript
type B = "A" | "B" | "C";

type EE<T, U = T> = T extends U ? [T, Exclude<U, T>] : never;

type ee = EE<B>; 
// type ee = ["A", "B" | "C"] | ["B", "A" | "C"] | ["C", "A" | "B"]
```

所以就变成了上面答案的那个样子

## 31. Medium Length of String

```typescript
type LengthOfString<
  S extends string,
  C extends any[] = []
> = S extends `${infer P}${infer T}`
  ? LengthOfString<T, [...C, P]>
  : GetLength<C>;

type GetLength<T extends readonly any[]> = T["length"];
```

**知识点**

1. 使用`readonly any[]`得 length 方法可以获得对应数组得长度
2. 所以这个递归得表达式，就是弄一个空数组不停得把第一个字符放进去，最后从字符串变成了`readonly`得数组就可以获得他得长度了

## 32. Medium Flatten

```typescript
type Flatten<P extends any[], R extends any[] = []> = P extends [
  infer First,
  ...infer P
]
  ? First extends any[]
    ? [...R, ...Flatten<First>, ...Flatten<P>]
    : [...R, First, ...Flatten<P>]
  : [];
```

**知识点**

1. 没有条件创造条件，当前数组是多层得直接用 flatten 递归就行
2. 创造一个空的泛型作为结果接收对应得数组内容即可

## 33. Medium Append to Object

```typescript
type AppendToObject<
  T extends object,
  U extends string,
  V,
  R extends T = T & { [key in U]: V }
> = {
  [K in keyof R]: R[K];
};
```

**知识点**

1. 需要将两个对象合并之后，用对象遍历得方式输出一个新得对象。
2. 如果直接 `A & B`这种写法好像用例过不了

## 34 Medium Absolute

```typescript
type Absolute<T extends string | number | bigint> = (
  T extends any ? `${T}` : never
) extends `-${infer P}`
  ? P
  : `${T}`;
```

**知识点**

1. 使用模板字符串的方式，将数字变为字符串类型。
2. extends 做`infer`推断的时候，如果我们想让其满足某个定义的模式，直接通过模板字符串来做就行，这里的`P`会变成一个负数的数字部分了

## 35. Medium String to Union

```typescript
type StringToUnion<
  T extends string,
  R extends object = {}
> = T extends `${infer P}${infer K}`
  ? P extends ""
    ? keyof R
    : StringToUnion<K, R & { [key in P]: 1 }>
  : keyof R;
```

**知识点**

1. 需要转成联合类型可以使用`keyof object`
2. 利用创造的泛型来接收参数

## 36. Medium Merge

```typescript
type MergeObj<F extends object, S extends object> = {
  [K in keyof S]: S[K];
} & {
  [K in Exclude<keyof F, keyof S>]: F[K];
};

type Merge<
  F extends object,
  S extends object,
  R extends object = MergeObj<F, S>
> = {
  [K in keyof R]: R[K];
};
```

**知识点**

1. 当两个对象需要合并的时候需要两步：1. 先将两个对象用 `&`连接 2. 再遍历一次这个对象就可以了。

## 37. Medium CamelCase

```typescript
type isNever<T> = (() => T) extends () => never ? true : false;
type Letter = {
  a: "A";
  b: "B";
  c: "C";
  d: "D";
  e: "E";
  f: "F";
  g: "G";
  h: "H";
  i: "I";
  j: "J";
  k: "K";
  l: "L";
  m: "M";
  n: "N";
  o: "O";
  p: "P";
  q: "Q";
  r: "R";
  s: "S";
  t: "T";
  u: "U";
  v: "V";
  w: "W";
  x: "X";
  y: "Y";
  z: "Z";
};

type CamelCase<
  S extends string,
  F extends any = never,
  R extends string = ""
> = S extends `${infer T}${infer P}`
  ? isNever<F> extends false
    ? T extends Letter[keyof Letter]
      ? CamelCase<`${P}`, never, `${R}-${T}`>
      : T extends keyof Letter
      ? CamelCase<`${P}`, never, `${R}${Letter[T]}`>
      : CamelCase<P, F, `${R}${T}`>
    : T extends keyof Letter
    ? CamelCase<P, never, `${R}${T}`>
    : T extends "-"
    ? P extends ""
      ? `${R}-`
      : CamelCase<P, false, `${R}`>
    : CamelCase<P, F, `${R}${T}`>
  : R;
```

**知识点**

1. 没有特殊的，就是把对应特殊的 case 用 extends 判断出来，再用递归生成类型就可以

## 38. Medium KebaCase

```typescript
type KebabCase<
  S extends string,
  R extends string = ""
> = S extends `${infer D}${infer P}`
  ? D extends Letter[keyof Letter]
    ? KebabCase<
        P,
        R extends "" ? `${Uncapitalize<D>}` : `${R}-${Uncapitalize<D>}`
      >
    : KebabCase<P, `${R}${D}`>
  : R;
```

**知识点**

1. 递归和 infer 的使用

## 39. Medium Diff

```typescript
type Diff<
  O,
  O1,
  K1 extends keyof O = keyof O,
  K2 extends keyof O1 = keyof O1,
  R = {
    [K in Exclude<K1, K2>]: O[K];
  } & {
    [K in Exclude<K2, K1>]: O1[K];
  }
> = {
  [K in keyof R]: R[K];
};
```

**知识点**

1. `Exclude`和对象合并的写法

## 40. Medium any of

```typescript
type isEmptyObject<T> = T extends object
  ? keyof T extends never
    ? true
    : false
  : false;

type isTrue<T> = T extends []
  ? false
  : T extends []
  ? false
  : T extends 0
  ? false
  : T extends ""
  ? false
  : T extends false
  ? false
  : isEmptyObject<T> extends true
  ? false
  : true;

type AnyOf<T extends readonly any[], R extends boolean = false> = T extends [
  infer P,
  ...infer K
]
  ? isTrue<P> extends true
    ? true
    : AnyOf<K, R>
  : R;
```

**知识点**

1. 对于 false 场景的列举
2. 对于空对象的判断
3. 递归

## 41. Medium is never

```typescript
type IsNever<T> = (() => T) extends () => never ? true : false;
```

**知识点**

1. never / false / boolean 这些判断需要额外将其包装成函数/数组才能做判断,单独判断 `false extends boolean => true` 这是判断不出来的

## 42. Medium isUnion

```typescript
type IsUnion<T> = Permutation<T>["length"] extends 1 ? false : true;
```

**知识点**

1. 全排列数量大于 2 即可，所以参考使用之前的全排列类型即可。

## 43. Medium ReplaceKey

```typescript
type ReplaceKeys<U extends object, T, Y extends object> = {
  [K in keyof U]: K extends T ? (K extends keyof Y ? Y[K] : never) : U[K];
};
```

**知识点**

1. 如果一个 key 不想返回对应的值的时候，可以直接返回 never
2. 直接 map 对象然后修改对应`key`的类型即可

## 44. Medium Remove Index Signature

```typescript
type RemoveIndexSignature<T extends any> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : K]: T[K];
};
```

**知识点**

1. 想要判断一个对象的 key 是否是泛类型，可以用`收窄`的方式来做
2. `key`的定义也可以使用 extends

## 45. Medium Percentage Parser

```typescript
type Notion = "+" | "-" | "%";

type Handler2<T extends string, R extends any[] = []> = T extends `${infer X}%`
  ? [...R, X, "%"]
  : T extends string
  ? [...R, T, ""]
  : [...R, "", ""];

type PercentageParser<
  A extends string,
  R extends any[] = []
> = A extends `${infer P}${infer T}`
  ? P extends Notion
    ? Handler2<T, [...R, P]>
    : Handler2<A, [...R, ""]>
  : Handler2<A, [...R, ""]>;
```

**知识点**

1. 无

## 46. Medium Drop Char

```typescript
type DropChar<
  S,
  C extends string,
  R extends string = ""
> = S extends `${infer P}${infer K}`
  ? C extends ""
    ? `${R}${DropChar<S, " ", R>}`
    : P extends C
    ? `${R}${DropChar<K, C, R>}`
    : `${R}${P}${DropChar<K, C, "">}`
  : R;
```

**知识点**

1. 字符串拼接 + 递归

## 47. Medium-minus-one

```typescript
type NumberToTuple<
  T extends number,
  U extends any[] = []
> = U["length"] extends T ? U : NumberToTuple<T, [1, ...U]>;

type MinusOne<
  T extends number,
  R extends number[] = NumberToTuple<T>
> = R extends [infer P, ...infer X] ? X["length"] : 0;
```

**知识点**

1. 如果将一个数字扩展成一个数组，使用之前的`length`获取数组长度的方法和这个常量的数字通过`extends`进行比较即可
2. 还是利用`length`求得`-1`后的长度

## 48. Medium pick by type

```typescript
type PickByType<T extends object, U, K extends keyof T = keyof T> = {
  [key in K extends K ? (T[K] extends U ? K : never) : never]: U;
};
```

**知识点**

1. 关键在于如何将一个对象真实的`key`过滤出来，那些泛化的`[key: string]`过滤掉

```typescript
type a = {
  a: 1;
  b: 2;
};
// K extends K 可以只获取有参数名的key，那些泛型的key就过滤掉了
type CC<T extends object, K extends keyof T = keyof T> = K extends K
  ? K
  : never;

type cc = CC<a>;
```

2. 使用`key`返回为 never 的方式过滤掉无用的`key`

## 49. Medium Start With

```typescript
type StartsWith<T extends string, U extends string> = T extends `${U}${infer P}`
  ? true
  : false;
```

## 50. Medium End with

```typescript
type EndsWith<T extends string, U extends string> = T extends `${infer P}${U}`
  ? true
  : false;
```

## 51. Medium Partial By Keys

```typescript
type RealKey<K> = K extends K ? K : never;

type RealObj<T extends object, K extends keyof T = keyof T> = {
  [key in RealKey<K>]: T[K];
};

type PartialByKeys<
  T extends object,
  K extends string = "",
  R extends keyof T = keyof T,
  V extends object = {
    [key in Exclude<RealKey<R>, K>]: T[key];
  } & {
    [key in K extends RealKey<keyof T> ? K : never]?: T[key];
  }
> = K extends ""
  ? {
      [key in keyof V]?: V[key];
    }
  : {
      [key in keyof V]: V[key];
    };
```

**知识点**

1. 两个 `&`连接的对象需要重新遍历一下，这样才能真正组合成一个对象的来行
2. 48 题中提到的相关点

## 52. Medium Required By Keys

```typescript
type MyRequired<T extends object> = {
  [K in keyof T]-?: T[K];
};

type RequiredByKeys<
  T extends object,
  K extends any = never,
  R extends object = isNever<K> extends true
    ? MyRequired<T>
    : {
        [key in Exclude<keyof T, K>]?: MyRequired<T>[key];
      } & {
        [key in Extract<K, keyof T>]: MyRequired<T>[key];
      }
> = {
  [key in keyof R]: R[key];
};
```

**知识点**
Q1: 如何去除 typescript 中的关键字，比如`?`和`readonly`等
A1：使用`-`这个关键字

## 53. Medium Mutable

```typescript
type Mutable<R extends object> = {
  -readonly [K in keyof Readonly<R>]: R[K];
};
```

## 54. Medium Omit by Type

```typescript
type OmitByType<T extends object, U, K extends keyof T = keyof T> = {
  [key in K extends K ? (T[K] extends U ? never : K) : never]: T[key];
};
```

## 55. Medium Object Entries

```typescript
type ObjectEntries<
  T extends object,
  R extends T = {
    [K in keyof T]-?: T[K];
  },
  K extends keyof R = keyof R
> = K extends K ? [K, R[K]] : [];
```

**知识点**

1. `-`的使用方法
2. 使用`K extends K`去除泛型类型


## 56. Medium Shift

```typescript
type Shift<T extends any[]> = T extends [infer P, ...infer X] ? X : never
```

## 57. Medium Tuple Nested object

```typescript
type TupleToNestedObject<T extends string[], U> = T["length"] extends 0
  ? U
  : T extends [...infer R, infer P]
  ? R extends string[]
    ? P extends string
      ? TupleToNestedObject<R, { [key in P]: U }>
      : never
    : never
  : never;
```

**知识点**
1. 如何判断一个数组遍历完了，就是`length extends 0`

## 58. Medium Reverse 

```typescript
type Reverse<T extends any[]> = T extends [infer P, ...infer K]
  ? [...Reverse<K>, P]
  : [];
```

## 59. Medium Flip Arguements

```typescript
type FlipArguments<T> = T extends (...args: infer P) => infer R
  ? (...args: Reverse<P>) => R
  : never;
```

**知识点**
1. 函数类型的推断
2. 函数参数的参数用数组加上`...`运算符，可以转换为`,`分割的参数

## 60. Medium Flatten Depth

```typescript
type FlattenDepth<
  T extends any[],
  N = 1,
  R extends any[] = [],
  C extends any[] = []
> = T extends [infer P, ...infer K]
  ? C["length"] extends N
    ? [...R, ...T]
    : P extends any[]
    ? FlattenDepth<K, N, [...R, ...FlattenDepth<P, N, [], [...C, number]>], C>
    : FlattenDepth<K, N, [...R, P], C>
  : R;
```

**知识点**
1. 用数组的`length`来进行记数
2. 使用默认值来实现参数递归过程中叠加

## 61. Medium Bem Style String

```typescript
type BEM<
  B extends string,
  E extends string[],
  M extends string[]
> = E["length"] extends 0
  ? M["length"] extends 0
    ? B
    : M extends (infer P)[]
    ? P extends string
      ? `${B}--${P}`
      : B
    : B
  : E extends (infer P)[]
  ? P extends string
    ? M["length"] extends 0
      ? `${B}__${P}`
      : M extends (infer R)[]
      ? R extends string
        ? `${B}__${P}--${R}`
        : B
      : B
    : B
  : B;
```

**知识点**
1. 各种通过`extends`的判断罢了，没有细节

## 62. Medium in order traversal

```typescript
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

type InorderTraversal<T extends TreeNode | null> = T extends TreeNode
  ? T["left"] extends never
    ? [T["val"]]
    : T["left"] extends TreeNode
    ? [
        ...InorderTraversal<T["left"]>,
        T["val"],
        ...InorderTraversal<T["right"]>
      ]
    : T["right"] extends TreeNode
    ? [T["val"], ...InorderTraversal<T["right"]>]
    : [T["val"]]
  : [];
```

**知识点**
1. 一个关于二叉树的先序遍历，只要知道遍历方法就能做出来~
2. 关于类型推断的遍历

## 63. Medium Flip

```typescript
type TransKeyToString<T> = T extends boolean | string | number ? `${T}` : "";

type Flip<
  T extends object,
  K extends keyof T = keyof T,
  V extends T[K] = T[K]
> = {
  [key in TransKeyToString<V>]: K extends K
    ? TransKeyToString<T[K]> extends key
      ? K
      : never
    : never;
};
```

**知识点**

1. 如果不想返回某个类型，可以返回never
2. 使用`K extends`将泛型key删除

## 64. Medium Fibonacci

```typescript
type ArraysLength<T, K> = T extends any[]
  ? K extends any[]
    ? [...T, ...K]["length"]
    : T["length"]
  : K extends any[]
  ? K["length"]
  : 0;

type Fibonacci<
  T extends number,
  C extends number[] = [number],
  V extends any[][] = [[number], [number]]
> = C["length"] extends T
  ? V extends [infer X, infer Y]
    ? X extends any[]
      ? X["length"]
      : 0
    : 0
  : V extends [infer X, infer Y]
  ? X extends any[]
    ? Y extends any[]
      ? Fibonacci<T, [...C, number], [Y, [...X, ...Y]]>
      : 0
    : 0
  : 0;
```

## 65. Medium All Combinations

```typescript
type MyExclude2<T, R> = R extends T ? "" : R

type AllCombinations<S extends string> = S extends ""
  ? ""
  : S extends `${infer P}${infer T}`
  ?
      | P
      | AllCombinations<T>
      | `${AllCombinations<T>}${P}`
      | `${P}${AllCombinations<T>}`
  : "";
```

**知识点**

1. 这道题目只完成了一半，其中的3、4两个case是跑不过的，主要原因是缺失了对于`BAC`就是将P插入到T中的那种场景的枚举（后续补上）

## 66. Medium Greater than

```typescript
type GreaterThan<
  T extends number,
  U extends number,
  A extends any[] = []
> = T extends A["length"]
  ? false
  : U extends A["length"]
  ? true
  : GreaterThan<T, U, [...A, number]>;
```

**知识点**

1. 用`tuple length`来管控长度
2. 递归的方式来实现

## 67 Medium Zip

```typescript
type Zip<
  T extends any[],
  U extends any[],
  R extends any[] = []
> = T["length"] extends 0
  ? R
  : T extends [infer A, ...infer B]
  ? U extends [infer C, ...infer D]
    ? Zip<B, D, [...R, [A, C]]>
    : R
  : R;
```

## 68. Medium isTuple

```typescript
type IsTuple<T> = T extends []
  ? true
  : T extends readonly [infer P, ...infer R]
  ? true
  : false;
```

**知识点**

+ 对于tuple的判断根据以下两点：

  + 使用readonly
  + 使用`infer`能推断出具体类型，如果是array是推断不出来具体某一项的类型的


## 69. Medium Chunk

```typescript
type Chunk<
  T extends readonly any[],
  N extends number,
  R extends any[] = [],
  C extends any[] = []
> = T extends [infer A, ...infer B]
  ? C["length"] extends N
    ? Chunk<B, N, [...R, C], [A]>
    : Chunk<B, N, R, [...C, A]>
  : C extends []
  ? R
  : [...R, C];

```

**知识点**

+ 简单的递归，只需要对零界点做相关判断即可


## 70. Medium Fill

```typescript
type Slice<
  T extends any[],
  Start extends number = 0,
  End extends number = T["length"],
  R extends any[] = [],
  Count extends any[] = []
> = Count["length"] extends T["length"]
  ? R
  : Count["length"] extends End
  ? R
  : Count["length"] extends Start
  ? Slice<T, Start, End, [...R, T[Start]], [...Count, number]>
  : R extends []
  ? Slice<T, Start, End, R, [...Count, number]>
  : Slice<T, Start, End, [...R, T[Count["length"]]], [...Count, number]>;

type FillArray<
  N,
  Start extends number,
  End extends number,
  MaxLength extends number,
  R extends any[] = [],
  Count extends any[] = []
> = Count["length"] extends MaxLength
  ? R
  : Count["length"] extends End
  ? R
  : Count["length"] extends Start
  ? FillArray<N, Start, End, MaxLength, [N], [...Count, number]>
  : R["length"] extends 0
  ? FillArray<N, Start, End, MaxLength, R, [...Count, number]>
  : FillArray<N, Start, End, MaxLength, [...R, N], [...Count, number]>;

type Fill<
  T extends unknown[],
  N,
  Start extends number = 0,
  End extends number = T["length"],
  StartArray extends any[] = Slice<T, 0, Start>,
  EndArray extends any[] = Slice<T, End, T["length"]>,
  R extends any[] = FillArray<N, Start, End, T["length"]>
> = GreaterThan<Start, End> extends true
  ? T
  : T extends []
  ? []
  : [...StartArray, ...R, ...EndArray];
```

**知识点**

1. 这是个综合的题目通过Slice + Array Fill拆解成两个递归来完成这个功能

2. 通过之前的GreaterThan来做边界的判断

## 71. Medium Trim Right

```typescript
type EmptyLetter = " " | "\n" | "\t";

type TrimRight<S extends string> = S extends `${infer P}${EmptyLetter}`
  ? TrimRight<P>
  : S;
```

**知识点**

1. 之前在Trim中已经介绍过，主要就是拼接字符串的`extends`判断

## 72. Medium Without

```typescript
type FormatArray<T> = T extends any[] ? T : [T];

type Without<
  T extends any[],
  U,
  R extends any[] = [],
  K extends any[] = FormatArray<U>
> = T extends [infer P, ...infer C]
  ? Includes<K, P> extends true
    ? Without<C, U, R>
    : Without<C, U, [...R, P]>
  : R;
```

## 73. Medium Trunck

```typescript
type N2S<T extends number | string> = `${T}`;

type Trunc<
  T extends number | string,
  RS extends string = N2S<T>,
  R extends string = ""
> = RS extends `${infer A}${infer B}${infer C}`
  ? B extends "."
    ? `${R}${A}`
    : Trunc<T, `${B}${C}`, `${R}${A}`>
  : `${R}${RS}`;
```

## 74. Medium Index Of

```typescript
type IndexOf<
  T extends any[],
  U,
  C extends any[] = []
> = C["length"] extends T["length"]
  ? -1
  : T[C["length"]] extends U
  ? C["length"]
  : IndexOf<T, U, [...C, number]>;
```

**知识点**
1. 使用数组的index索引，可以借用别人的length，套娃的结构，其他没啥


## 75. Medium Join

```typescript
type Join<
  T extends string[],
  U extends number | string,
  C extends any[] = [number],
  S extends string = T[0]
> = T extends []
  ? ""
  : T["length"] extends C["length"]
  ? S
  : Join<T, U, [...C, number], `${S}${U}${T[C["length"]]}`>;
```

## 76. Medium Last Index Of 

```typescript
type LastIndexOf<T extends any[], U> = T extends [...infer A, infer B]
  ? B extends U
    ? A["length"]
    : LastIndexOf<A, U>
  : -1;
```

## 77. Medium Unique

```typescript
type MyIncludes<T extends any[], U> = T extends [infer P, ...infer K]
  ? P extends U
    ? true
    : MyIncludes<K, U>
  : false;

type Unique<T extends any[], R extends any[] = []> = T extends [
  infer P,
  ...infer A
]
  ? MyIncludes<R, P> extends false
    ? Unique<A, [...R, P]>
    : Unique<A, R>
  : R;
```

### 78. Medium Map Types

```typescript
interface IMapDTO {
  mapFrom: any;
  mapTo: any;
}

type MapTypes<T extends object, R extends IMapDTO> = {
  [K in keyof T]: T[K] extends R["mapFrom"]
    ? R extends { mapFrom: T[K] }
      ? R["mapTo"]
      : never
    : T[K];
};
```

**知识点**
1. 如果在联合类型中确定某一个类型，比如我们这里希望 `mapFrom`为`string`类型的时候`mapTo`也为`string`匹配的类型，这个时候可以使用双向`extends`进行确认

### 79. Hard Simple Vue

```typescript
type IComputedValues<C> = {
  [K in keyof C]: C[K] extends (...args: any[]) => infer P ? P : never;
};

declare function SimpleVue<D, C, M>(options: {
  data: (this: {}) => D,
  computed: C & ThisType<D>,
  methods: M & ThisType<D & M & IComputedValues<C>>
}): any;
```

**知识点**

1. `ThisType`的用处，将某个类型定义然后绑定到对应某个对象的this上（适用于对象this的添加）

2. 函数`this`的添加，函数第一个参数为this的时候，ts直接将其翻译成对应的函数的`this`上下文指向

3. 这个地方我们除了需要`ThisType`将我们需要得类型追加到`this`上外，还需要对其本身得类型进行推断，所以这里需要定义一个额外得泛型来让TS自己推断，本身增加了哪些类型和方法


### 80. Hard Curry

```typescript
type CurryFn<fn, R extends any = null> = fn extends (
  ...args: infer P
) => infer C
  ? P extends [...infer A, infer B]
    ? R extends null
      ? CurryFn<(...args: A) => R, (args: B) => C>
      : CurryFn<(...args: A) => R, (args: B) => R>
    : R
  : R;

declare function Currying<R, C>(fn: C): CurryFn<C>
```

### 81. Hard Union to intersection

```typescript
type UnionToIntersection<U> = (
  U extends any ? (args: U) => void : never
) extends (args: infer P) => any
  ? P
  : never;
```

**知识点**

1. 在函数参数的 `|` 会在`infer`推断的时候产生协变，将联合类型变为`intersection`，具体的可以看[官方文档](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types)

### 82. hard get required

```typescript
type NoRequired<T extends object> = {
  [key in keyof T]-?: T[key];
};

type GetRequired<
  T extends object,
  R extends T = NoRequired<T>,
  K extends keyof T = keyof T
> = {
  [key in K extends K ? (T[K] extends R[K] ? K : never) : never]: T[key];
};
```

**知识点**

1. 如何判断一个值是一个`required`，即去掉`?`以后对应值的类型能保持一致即可

### 83. hard get optional

```typescript
type GetOptional<
  T extends object,
  R extends T = NoRequired<T>,
  K extends keyof T = keyof T
> = {
  [key in K extends K ? (T[K] extends R[K] ? never : K) : never]?: R[key];
};
```

### 84. hard required keys

```typescript
type RequiredKeys<
  T extends object,
  C extends T = {
    [K in keyof T]-?: T[K];
  },
  K extends keyof T = keyof T,
  R extends object = {
    [key in K extends K ? (T[K] extends C[K] ? K : never) : never]: T[K];
  }
> = keyof R;

```

**知识点**

1. 用到了`Required`,然后利用`keyof`转换其为联合类型

### 85. hard optional keys

```typescript
type OptionalKeys<T extends object, R = GetOptional<T>> = keyof R

```

**知识点**
1. 和上面的题目一样，利用到了之前的`GetOptional`

### 86. Hard Capital Words

```typescript
type SplitType = " " | "." | ",";

type CapitalizeWords<
  S extends string,
  R extends string = "",
  F extends boolean = true
> = S extends `${infer P}${infer T}`
  ? F extends true
    ? P extends keyof CapMap
      ? CapitalizeWords<T, `${R}${CapMap[P]}`, false>
      : CapitalizeWords<T, `${R}${P}`, F>
    : P extends SplitType
    ? CapitalizeWords<T, `${R}${P}`, true>
    : CapitalizeWords<T, `${R}${P}`, F>
  : R;
```

### 87. Hard Camel Case

```typescript
type SplitLetter = "_";

type QueryValue<
  T extends object,
  V extends any,
  K extends keyof T = keyof T
> = K extends K ? T[K] extends V ? K : never : never

type CamelCaseHard<
  S extends string,
  R extends string = "",
  F extends boolean = false
> = S extends `${infer P}${infer T}`
  ? P extends SplitLetter
    ? CamelCaseHard<T, R, true>
    : F extends true
    ? P extends keyof CapMap
      ? CamelCaseHard<T, `${R}${CapMap[P]}`, false>
      : CamelCaseHard<T, `${R}${P}`, false>
    : P extends CapMap[keyof CapMap]
    ? CamelCaseHard<T, `${R}${QueryValue<CapMap, P>}`, F>
    : CamelCaseHard<T, `${R}${P}`, F>
  : R;
```

### 88. Hard C Printf Parser

```typescript
type ControlsMap = {
  c: "char";
  s: "string";
  d: "dec";
  o: "oct";
  h: "hex";
  f: "float";
  p: "pointer";
};

type ParsePrintFormat<
  S extends string,
  R extends string[] = []
> = S extends `${infer P}%${infer D}${infer T}`
  ? D extends keyof ControlsMap
    ? ParsePrintFormat<T, [...R, ControlsMap[D]]>
    : D extends "%"
    ? ParsePrintFormat<T, R>
    : R
  : R;
```

### 89. Hard Vue Basic Props

```typescript
type Computed<T> = {
  [K in keyof T]: T[K] extends infer P
    ? P extends (...args: any) => infer R
      ? R
      : never
    : never;
};

type TypeCheck<T, K = any> = T extends () => infer A
  ? A
  : T extends (a: any) => infer C
  ? C
  : K;

type A2U<T extends any[], R = null> = T extends [infer P, ...infer C]
  ? R extends null
    ? A2U<C, TypeCheck<P>>
    : A2U<C, TypeCheck<P> | R>
  : R;

type Props<T> = {
  [K in keyof T]: T[K] extends { type: infer A }
    ? A extends () => infer C
      ? C
      : A extends new (...args: any) => any
      ? InstanceType<A>
      : A extends Array<infer B>
      ? TypeCheck<B>
      : RegExp
    : TypeCheck<T[K]>;
};

declare function VueBasicProps<P, D, C, M>(options: {
  props: P;
  data: (this: Props<P>) => D;
  computed: C & ThisType<D & Props<P>>;
  methods: M & ThisType<D & Computed<C> & M & Props<P>>;
}): any;
```

**知识点**
1. 这里需要知道几个点`String`的类型是`StringConstructor`这种类型如何识别出来并转化成`string`，构造函数的定义为`(value?: any): string;`所以可以通过构造函数的这个结构`ReturnType`来进行将构造器转换成对应的类型

2. 对于`ClassA`这类自定义的对象结构，可以通过`new (...args) => any`的方式类获取其类型，并通过`InstanceType`来获取对应的类型

3. 这里需要注意的问题是，因为构造函数其也有这种`new **`的类型定义所以需要注意构造函数和类定义的两者判断的前后顺序

### 90. Hard IsAny

```typescript
type IsAny<T> = 'ccc' extends true & T ? true : false;
```

**知识点**

1. any类型 `&` 上任何类型都是any，所以可以通过这种方式来进行判断

### 91. Hard Type Get

```typescript
type Get<T, K extends string> = K extends keyof T
  ? T[K]
  : K extends `${infer P}.${infer U}`
  ? P extends keyof T
    ? Get<T[P], U>
    : never
  : never;
```

**知识点**
1. 关键还是对于模板字符串的判断，中间可以组合任意的东西来判断对应值的类型

### 92. Hard String to Number

```typescript
type ToNumber<
  S extends string,
  R extends string[] = []
> = `${R["length"]}` extends S ? R["length"] : ToNumber<S, [...R, string]>;
```


### 93. Hard Tuple Filter

```typescript
type isMatch<T, U> = (() => T) extends (() => U) ? true : false;

type FilterOut<T extends any[], F, R extends any[] = []> = T extends [
  infer U,
  ...infer V
]
  ? isMatch<U, F> extends true
    ? FilterOut<V, F, R>
    : FilterOut<V, F, [...R, U]>
  : R;

type CCC = FilterOut<['a', never], never>
```