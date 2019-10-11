import { Chrono } from '../../src/index'
import { boxoffice } from '../asset/boxoffice.190227'
import { Stat } from 'borel'
import { Mat } from 'veho'

class ChronoTest {
  static testCrossFuncsAndRepeats () {
    const primitVector = Array.from({ length: 12 }, (v, i) => 2 ^ i)
    Chrono.crossByRepeatsAndFuncs({
      repeatList: [10000, 100000, 1000000],
      funcList: {
        for: () => {
          let arr = []
          for (let i = 0, len = primitVector.length; i < len; i++) {
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
    }).brief().wL()
  }

  static testCrossFuncsAndParams () {
    const { lapse, result } = Chrono.crossByParamAndFuncs({
      repeat: 500000,
      paramsList: {
        num_arr: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5],
        str_arr: [['Winston', 'Roosevelt', 'Stalin', 'Clinton', 'Bush', 'Eisenhower'], 5],
        misc_arr: [['foo', 'bar', 128, true, null, new Date()], 5]
      },
      funcList: {
        iterPush: (arr, len) => {
          let rsl = []
          for (let i = 0; i < len; i++) {
            rsl.push(arr[i])
          }
          return rsl
        },
        slice: (arr, len) => {
          return arr.slice(0, len)
        }
      },
    })
    lapse.pushRow('average', Mat.vehoCol(lapse.matrix, Stat.avg).map(Math.round))
    lapse.brief() |> console.log
    result.brief() |> console.log
  }
}

export {
  ChronoTest
}