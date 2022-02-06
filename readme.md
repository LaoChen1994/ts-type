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
1. 当我们想要在某个值的场景下不返回任何东西的时候，直接返回never，会在复合类型中去除掉某值
2. 这里我们使用`Exclude`

## 16. Medium ReadOnly

和简单题中`readOnly`的区别，需要同时支持，指定的key被`readonly`和全部为`readonly`的情况

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
1. 可以使用递归的方式调用Typescript的`type`类型
2. ts中如何判断一个元素为对象，可以使用`keyof T extends never`代表如果没有key就不是一个对象。


## 18 元组转集合

```typescript
type TupleToUnion<T extends any[]> = T[number]
type TupleToUnion<T extends any[]> = T extends (infer P)[] ? P : never;
```

**知识点**

1. `infer P`推断数组中元素的时候需要加括号，然后才加`[]`不然会不对
2. 数组索引用`T[number]`