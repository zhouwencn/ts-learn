/** boolean **/
let isDone: boolean = true

/** number **/
let decLiteral: number = 10
let hexLiteral: number = 0xf00d
let binaryLiteral: number = 0b1010
let octalLiteral: number = 0o744

/** string **/
let address: string = 'hangzhou'
address = 'shanghai'

let namett: string = `Gene`
let age: number = 37
let sentence: string = `Hello, my name is ${namett}`

/** array **/
let arr: Array<number> = [1, 2, 3]
// or
let arr2: number[] = [1, 2, 3]

/** tuple元组 **/

// Declare a tuple type
let x: [string, number]
// Initialize it
x = ['hello', 10] // OK
// Initialize it incorrectly
// x = [10, 'hello'] // Error
console.log(x[0].substr(1)) // OK
console.log(x[1].toFixed(1)) // OK
// console.log(x[1].substr(1)) // Error, 'number' does not have 'substr'

// 所以2.7之后不允许为元祖设定越界元素。https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#fixed-length-tuples
// x[3] = '越界'
// 不过可以这样变一下就行了
interface MinimumNumStrTuple extends Array<number | string> {
  0: number
  1: string
}
let y: MinimumNumStrTuple = [111, '112']
y[3] = '666'
// y[4] = false

/** enum枚举 **/

enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green
// 也可以手动指定开始的编号
enum Color2 {
  Red = 1,
  Green,
  Blue
}
let c2: Color2 = Color2.Green

// 或者，全部都采用手动赋值
enum Color3 {
  Red = 1,
  Green = 2,
  Blue = 4
}
let c3: Color3 = Color3.Green

// 通过枚举值得到它的名字
enum Color4 {
  Red = 1,
  Green,
  Blue
}
let colorName: string = Color4[2]

console.log(colorName) // 显示'Green'因为上面代码里它的值是2

/** any任意值 **/
let notSure: any = 4
notSure = 'maybe a string instead'
notSure = false // okay, definitely a boolean

/** void空值 **/
function warnUser(): void {
  alert('This is my warning message')
}

/** Null 和 Undefined **/
// Not much else we can assign to these variables!
let u: undefined = undefined
let n: null = null

/** assert 类型断言 **/
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
// or
let strLength2: number = (someValue as string).length
