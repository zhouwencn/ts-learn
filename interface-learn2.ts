/** 类静态部分与实例部分的区别 **/

interface ClockConstructor {
  new (hour: number, minute: number): ClockInterfaceTest
}
interface ClockInterfaceTest {
  tick(): any
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterfaceTest {
  return new ctor(hour, minute)
}

class DigitalClockTest implements ClockInterfaceTest {
  constructor(h: number, m: number) {}
  tick() {
    console.log('beep beep')
  }
}
class AnalogClockTest implements ClockInterfaceTest {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalClockTest, 12, 17)
let analog = createClock(AnalogClockTest, 7, 32)

/** 继承接口 **/
interface Shape {
  color: string
}

interface Square extends Shape {
  sideLength: number
}

let square = <Square>{}
square.color = 'blue'
square.sideLength = 10

// 一个接口可以继承多个接口，创建出多个接口的合成接口。
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square2 = <Square>{}
square2.color = 'blue'
square2.sideLength = 10
square2.penWidth = 5.0

/**接口继承类**/
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {}
}

class TextBox extends Control {}

// Error: Property 'state' is missing in type 'Image'.
// class Image implements SelectableControl {
//   select() {}
// }

// class Location {}
