function printLabel(labelledObj: { label: string }) {
  console.log(labelledObj.label)
}

let myObj = { size: 10, label: 'Size 10 Object' }
printLabel(myObj)

// 下面我们重写上面的例子，这次使用接口来描述：必须包含一个label属性且类型为string：

interface LabelledValue {
  label: string
}

function printLabel2(labelledObj: LabelledValue) {
  console.log(labelledObj.label)
}

let myObj2 = { size: 10, label: 'Size 10 Object' }
printLabel(myObj2)

// 如上将变量值用一个参数做承接，这样写是可以的，如果直接，写把参数作为入惨传入就不行。校验会出问题
// 另外interface接口并不像其他语言那样，需要实现了这个接口。我们只会去关注值的外形，当然也是可以实现的
// printLabel({ size: 10, label: 'Size 10 Object' })

// readonly只读属性
interface Point {
  readonly x: number
  readonly y: number
}

/** 索引签名 **/
interface SquareConfig {
  color?: string
  width?: number
  [propName: string]: any
}
function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: 'red',
    area: 1000
  }
  // ...
}

let mySquare = createSquare({ colour: 'red', width: 100 })

/** 函数类型**/
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc = function (source: string, subString: string) {
  let result = source.search(subString)
  return result > -1
}

/**可索引的类型**/
interface StringArray {
  [index: number]: string
}

const myArray: StringArray = ['Bob', 'Fred']

let myStr: string = myArray[0]

//共有支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。
//这是因为当使用number来索引时，JavaScript会将它转换成string然后再去索引对象。
// 也就是说用100（一个number）去索引等同于使用"100"（一个string）去索引，因此两者需要保持一致。
class Animal {
  name: string
}
class Dog extends Animal {
  breed: string
}

// 错误：使用'string'索引，有时会得到Animal!
interface NotOkay {
  // [x: number]: Animal; // 数字索引的返回值必须是字符串索引返回值类型的子类型。而Animal是父类，所以不能这么写
  [x: number]: Dog
  [x: string]: Animal
}
const NotOkayInstance: NotOkay = {
  1: new Dog(),
  '2': new Dog()
}

// 字符串索引签名能够很好的描述dictionary模式，并且它们也会确保所有属性与其返回值类型相匹配。
// 因为字符串索引声明了obj.property和obj["property"]两种形式都可以。
// 下面的例子里，name的类型与字符串索引类型不匹配，所以类型检查器给出一个错误提示：
interface NumberDictionary {
  [index: string]: number
  length: number // 可以，length是number类型
  // name: string // 错误，`name`的类型与索引类型返回值的类型不匹配,可以把string改为any或者number
}

// 你可以将索引签名设置为只读，这样就防止了给索引赋值：
interface ReadonlyStringArray {
  readonly [index: number]: string
}
let myArray2: ReadonlyStringArray = ['Alice', 'Bob']
// myArray[2] = 'Mallory' // error!

/** 类类型 **/

interface ClockInterface {
  currentTime: Date
}
class Clock implements ClockInterface {
  currentTime: Date
  constructor(h: number, m: number) {}
}

// 你也可以在接口中描述一个方法，在类里实现它，如同下面的setTime方法一样：
interface ClockInterface2 {
  currentTime: Date
  setTime(d: Date)
}
// 接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。
class Clock2 implements ClockInterface2 {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) {}
}
