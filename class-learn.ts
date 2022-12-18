namespace classLearnA {
  class Greeter {
    greeting: string
    constructor(message: string) {
      this.greeting = message
    }
    greet() {
      return 'hello ' + this.greeting
    }
  }
  const greeter = new Greeter('world')

  // 继承
  class Animal {
    move(distanceInMeters: number = 0): void {
      console.log(`Animal moved ${distanceInMeters}m.`)
    }
  }

  class Dog extends Animal {
    bark() {
      console.log('Woof! Woof!')
    }
  }

  const dog = new Dog()
  dog.bark()
  dog.move(10)
  dog.bark()
}

namespace classLearnB {
  class Animal {
    name: string
    constructor(theName: string) {
      this.name = theName
    }
    move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`)
    }
  }

  class Snake extends Animal {
    constructor(name: string) {
      super(name)
    }
    move(distanceInMeters = 5) {
      console.log('Slithering...')
      super.move(distanceInMeters)
    }
  }

  class Horse extends Animal {
    constructor(name: string) {
      super(name)
    }
    move(distanceInMeters = 45) {
      console.log('Galloping...')
      super.move(distanceInMeters)
    }
  }

  let sam = new Snake('Sammy the Python')
  let tom: Animal = new Horse('Tommy the Palomino')

  sam.move()
  tom.move(34)
}

// ----------------------------------------------------------------
// 理解private
namespace classLearnC {
  class Animal {
    private name: string
    constructor(theName: string) {
      this.name = theName
    }
  }

  class Rhino extends Animal {
    constructor() {
      super('Rhino')
    }
  }

  class Employee {
    private name: string
    constructor(theName: string) {
      this.name = theName
    }
  }

  let animal = new Animal('Goat')
  let rhino = new Rhino()
  let employee = new Employee('Bob')

  animal = rhino
  // animal = employee; // 错误: Animal 与 Employee 不兼容.因为Employee里面的name与animal的name不是同一个
}

//----------------------------------------------------------------
// 存取器
namespace classLearnD {
  // 首先，我们从一个没有使用存取器的例子开
  // class Employee {
  //   fullName: string
  // }
  // let employee = new Employee()
  // employee.fullName = 'Bob Smith'
  // if (employee.fullName) {
  //   console.log(employee.fullName)
  // }
  let passcode = 'secret passcode'

  class Employee {
    private _fullName: string

    get fullName(): string {
      return this._fullName
    }

    set fullName(newName: string) {
      if (passcode && passcode == 'secret passcode') {
        this._fullName = newName
      } else {
        console.log('Error: Unauthorized update of employee!')
      }
    }
  }

  let employee = new Employee()
  employee.fullName = 'Bob Smith'
  if (employee.fullName) {
    alert(employee.fullName)
  }
}
