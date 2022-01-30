# TS类型体操记录

## 01. Easy Pick

```typescript
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```

**知识点**

1. ts mapping的用法，使用 `in``关键字，其作用的是从多个类型中获取其中的一个类型
   
   ```typescript
   // 比如 A 的定义是如下所示
   type A = 'a' | 'b' | 'c';
   
   // 获取类型为 'a', 'b'. 'c'的写法就是mapping
   interface IAObject {
       [P in A]: P
   }
   ```


