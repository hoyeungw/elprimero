import { GP, ETA, Portuguese } from '../../src/index'
import { boxoffice } from '../asset/boxoffice.190227'

const primitVector = Array.from({ length: 12 }, (v, i) => 2 ^ i)
const iterateFuncs = {
  for: () => {
    let arr = []
    for (let i = 0; i < primitVector.length; i++) {
      arr.push(primitVector[i])
    }
    return arr
  },
  forOf: () => {
    let arr = []
    for (let n of primitVector) {
      arr.push(n)
    }
    return arr
  },
  while: () => {
    let arr = []
    let i = primitVector.length
    while (i--) {
      arr.push(primitVector[i])
    }
    return arr
  },
  forEach: () => {
    let arr = []
    primitVector.forEach(it => arr.push(it))
    return arr
  }
}

const takeFuncs = {
  forOf_push: (arr, len) => {
    let rsl = []
    for (let i = 0; i < len; i++) {
      rsl.push(arr[i])
    }
    return rsl
  },
  protoSlice: (arr, len) => {
    return arr.slice(0, len)
  }

}

class ChronoTest {
  static testCompareFuncsByRepeats () {
    Portuguese.compareFuncsByRepeats([10000, 100000, 1000000], iterateFuncs).brief().wL()
  }

  static testCompareFuncsByParams () {
    Portuguese.compareFuncsByParams(
      500000,
      [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ['Winston', 'Roosevelt', 'Stalin', 'Clinton', 'Bush', 'Eisenhower']
      ],
      takeFuncs
    ).brief().wL()
  }
}

export {
  ChronoTest
}