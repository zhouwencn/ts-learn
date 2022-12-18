// 很对都和es6差不多，这里相似的就不写了，就写一些不一样的
function keepWholeObject(wholeObject: { a: string; b?: number }) {
  let { a, b = 1001 } = wholeObject
}
// 现在，即使 b 为 undefined ， keepWholeObject 函数的变量 wholeObject 的属性 a 和 b 都会有值。

// 解构也能用于函数声明。 看以下简单的情况：

type C = { a: string; b?: number }
function f({ a, b }: C): void {
  // ...
}

// 但是，通常情况下更多的是指定默认值，解构默认值有些棘手。 首先，你需要在默认值之前设置其格式。
function f2({ a, b } = { a: '', b: 0 }): void {
  // ...
}
f2() // ok, default to { a: "", b: 0 }
