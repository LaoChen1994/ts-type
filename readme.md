# TS类型体操记录

## 写在前面

[ts 类型体操github](https://github.com/type-challenges/type-challenges/)

## 01. Easy Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**知识点**

1. 如果获取对象Key的类型？**使用`keyof`关键字**
2. ts mapping的用法，使用 `in`关键字，其作用的是从多个类型中获取其中的一个类型（**遍历对象`keyof`拿到的值**，使用`in`关键字）

```typescript
// 比如 A 的定义是如下所示
type A = 'a' | 'b' | 'c';

// 获取类型为 'a', 'b'. 'c'的写法就是mapping
interface IAObject {
    [P in A]: P
}
```



## 2. easy readOnly 

只需要将key前面加上`readonly`关键字，这个变量就变成了只读。

```typescript
type MyReadOnly<T> = {
  readonly [P in keyof T]: T[P]
}
```

## 3. Easy Tuple Object

完成从数组到对象的映射关系

```typescript
type TupleToObject<T extends readonly any[]> = {
  [P in T[number]]: P
}
```

**知识点**

如何遍历数组中的每个元素？

当**T extends any[]**的时候，使用`T[number]`


## 4. First of Array

当为空数组的时候返回never，如果数组有值返回第一个数组的第一个值

```typescript
type First<T extends any[]> = T extends [] ? never : T[0];
```



**知识点**

1. 取数组的第一个值：使用`T[0]`
2. ts的三元表达式，怎么表示T是一个空数组：使用**T extends []**即可

## 5. Length of Tuple

返回一个数组的长度

```typescript
type Length<T extends readonly string[]> = T["length"];
```

**知识点**

1. 只要知道了`T extends any[]`，这个时候说明T一定是个string类型，就和`T[0]`一样可以调用T的任何属性，所以为`T[length]`

2. 为什么要加`readOnly`，因为在这个时候题目中的`tesla`定义为

   ```typescript
   const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
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