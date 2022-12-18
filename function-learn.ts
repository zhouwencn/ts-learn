/**函数类型**/
namespace functionLearnA {
  function add(x: number, y: number): number {
    return x + y
  }

  // 也可以这么写
  const myAdd: (x: number, y: number) => number = function (
    x: number,
    y: number
  ): number {
    return x + y
  }

  // myAdd has the full function type
  let myAdd2 = function (x: number, y: number): number {
    return x + y
  }

  // The parameters `x` and `y` have the type number， 可以通过类型推断 推断出来
  let myAdd3: (baseValue: number, increment: number) => number = function (
    x,
    y
  ) {
    return x + y
  }

  // 们可以在参数名旁使用?实现可选参数的功能。

  function buildName(
    firstName: string,
    lastName?: string,
    address: string = 'hangzhou'
  ) {
    if (lastName) return firstName + ' ' + lastName
    else return firstName
  }

  let result1 = buildName('Bob') // works correctly now
  // let result2 = buildName('Bob', 'Adams', 'Sr.') // error, too many parameters
  let result3 = buildName('Bob', 'Adams') // ah, just right
}

namespace functionLearnB {
  // 剩余参数
  function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + ' ' + restOfName.join(' ')
  }

  let employeeName = buildName('Joseph', 'Samuel', 'Lucas', 'MacKinzie')

  // 这个省略号也会在带有剩余参数的函数类型定义上使用到：
  let buildNameFun: (fname: string, ...rest: string[]) => string = buildName
}
/** this和箭头函数 */
namespace functionLearnC {
  let deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
      return function () {
        let pickedCard = Math.floor(Math.random() * 52)
        let pickedSuit = Math.floor(pickedCard / 13)

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
      }
    }
  }

  let cardPicker = deck.createCardPicker()
  let pickedCard = cardPicker()

  alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit) // error,this 指向了window，

  let deck2 = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    createCardPicker: function () {
      // 箭头函数能保存函数创建时的this值，而不是调用时的值：

      // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
      return () => {
        let pickedCard = Math.floor(Math.random() * 52)
        let pickedSuit = Math.floor(pickedCard / 13)

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
      }
    }
  }

  let cardPicker2 = deck2.createCardPicker()
  let pickedCard2 = cardPicker()

  alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
}

/**this参数 */

// 不幸的是，this.suits[pickedSuit]的类型依旧为any。
// 这是因为this来自对象字面量里的函数表达式。 修改的方法是，
// 提供一个显式的this参数。 this参数是个假的参数，它出现在参数列表的最前面：

namespace functionLearnD {
  function f(this: void) {
    // make sure `this` is unusable in this standalone function
  }

  interface Card {
    suit: string
    card: number
  }

  interface Deck {
    suits: string[]
    cards: number[]
    createCardPicker(this: Deck): () => Card
  }

  let deck: Deck = {
    suits: ['hearts', 'spades', 'clubs', 'diamonds'],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function (this: Deck) {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52)
        let pickedSuit = Math.floor(pickedCard / 13)

        return { suit: this.suits[pickedSuit], card: pickedCard % 13 }
      }
    }
  }
  let cardPicker = deck.createCardPicker()
  let pickedCard = cardPicker()
  // 现在TypeScript知道createCardPicker期望在某个Deck对象上调用。 也就是说this是Deck类型的，而非any，因此--noImplicitThis不会报错了。
  alert('card: ' + pickedCard.card + ' of ' + pickedCard.suit)

  // 方法重载
  let suits = ['hearts', 'spades', 'clubs', 'diamonds']

  //  为了让编译器能够选择正确的检查类型，它与JavaScript里的处理流程相似。
  // 它查找重载列表，尝试使用第一个重载定义。 如果匹配的话就使用这个。 因此，在定义重载的时候，一定要把最精确的定义放在最前面。
  // 注意，function pickCard(x): any并不是重载列表的一部分，因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用pickCard会产生错误。
  function pickCard(x: { suit: string; card: number }[]): number
  function pickCard(x: number): { suit: string; card: number }
  function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == 'object') {
      let pickedCard = Math.floor(Math.random() * x.length)
      return pickedCard
    }
    // Otherwise just let them pick the card
    else if (typeof x == 'number') {
      let pickedSuit = Math.floor(x / 13)
      return { suit: suits[pickedSuit], card: x % 13 }
    }
  }

  let myDeck = [
    { suit: 'diamonds', card: 2 },
    { suit: 'spades', card: 10 },
    { suit: 'hearts', card: 4 }
  ]
  let pickedCard1 = myDeck[pickCard(myDeck)]
  alert('card: ' + pickedCard1.card + ' of ' + pickedCard1.suit)

  let pickedCard2 = pickCard(15)
  alert('card: ' + pickedCard2.card + ' of ' + pickedCard2.suit)
}
