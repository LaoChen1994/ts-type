# TS类型体操记录

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

略

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

