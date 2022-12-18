import { argv } from 'process'

namespace genericLearnA {
  function identity<T>(arg: T): T {
    console.log(arg)
    return arg
  }
  identity<string>('string')
  // 或者直接传入，因为可以进行类型推导
  identity('string2')

  function loggingIdentity<T>(arg: T): T {
    //  console.log(arg.length);  // Error: T doesn't have .length
    return arg
  }
  // 上面的loggingIdentity报错
  // 入参改成T数组就行了
  function loggingIdentity2<T>(arg: T[]): T[] {
    console.log(arg.length) // Array has a .length, so no more error
    return arg
  }

  // ----------------------------------------------------------------

  function identity2<T>(arg: T[]): T[] {
    return arg
  }
  // 泛型类型
  let myIdentity2: <T>(arg: T[]) => T[] = identity2

  // 我们还可以使用带有调用签名的对象字面量来定义泛型函数：
  let myIdentity3: { <T>(arg: T[]): T[] } = identity2

  // 这引导我们去写第一个泛型接口了。 我们把上面例子里的对象字面量拿出来做为一个接口：
  interface GenericIdentityFn {
    <T>(arg: T[]): T[]
  }
  let myIdentity4: GenericIdentityFn = identity2

  // 一个相似的例子，我们可能想把泛型参数当作整个接口的一个参数。
  // 这样我们就能清楚的知道使用的具体是哪个泛型类型（比如：Dictionary < string > 而不只是Dictionary）。
  // 这样接口里的其它成员也能知道这个参数的类型了。

  interface GenericIdentityFn2<T> {
    <T>(arg: T): T
  }
  function identityfn<T>(arg: T): T {
    return arg
  }
  let myIdentity5: GenericIdentityFn2<string | number | boolean> = identityfn
}

// 除了泛型接口，我们还可以创建泛型类。 注意，无法创建泛型枚举和泛型命名空间。

namespace genericLearnB {
  class GenericNumber<T> {
    zeroValue: T
    add: (x: T, y: T) => T
  }
  let myGenericNumber = new GenericNumber<number>()
  myGenericNumber.zeroValue = 0
  myGenericNumber.add = function (x, y) {
    return x + y
  }

  // 范型约束
  function loggingIdentity<T>(arg: T): T {
    // console.log(arg.length);  // Error: T doesn't have .length
    return arg
  }

  interface Lengthwise {
    length: number
  }
  function loggingIdentity2<T extends Lengthwise>(arg: T): T {
    console.log(arg.length) // Now we know it has a .length property, so no more error
    return arg
  }
  // loggingIdentity2(3);  // Error, number doesn't have a .length property
  loggingIdentity2({ length: 10, value: 3 })

  /** 在泛型约束中使用类型参数 **/
  function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key]
  }

  let x = { a: 1, b: 2, c: 3, d: 4 }

  getProperty(x, 'a') // okay
  // getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

  /** 在泛型里使用类类型**/

  // function create<T>(c: { new (): T }): T {
  //   return new c()
  // }

  // 上面的方法变体之后
  interface classType<T> {
    new (): T
  }

  function create<T>(c: classType<T>): T {
    return new c()
  }

  // 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系。

  class BeeKeeper {
    hasMask: boolean
  }

  class ZooKeeper {
    nametag: string
  }

  class Animal {
    numLegs: number
  }

  class Bee extends Animal {
    keeper: BeeKeeper
  }

  class Lion extends Animal {
    keeper: ZooKeeper
  }

  function createInstance<A extends Animal>(c: new () => A): A {
    return new c()
  }

  createInstance(Lion).keeper.nametag // typechecks!
  createInstance(Bee).keeper.hasMask // typechecks!
}
