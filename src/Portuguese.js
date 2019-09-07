import { MagnitudeFormo } from 'xbrief'
import { Mat } from 'veho'
import { Stat } from 'borel'
import { ETA } from './ETA'
import { GP } from './GP'
import { CrosTab } from 'crostab'

class Portuguese {
  /**
   *
   * @param {number} repeat
   * @param {function} func
   * @return {*}
   */
  static rehearsal (repeat, func) {
    const rsl = func()
    if (repeat > 1) {
      for (let i = 1; i < repeat; i++) {
        func()
      }
    }
    return rsl
  }

  /**
   *
   * @param {number[]} repeats
   * @param {function[]|Object|Map} funcSet
   * @returns {CrosTab}
   */
  static compareFuncsByRepeats (repeats, funcSet) {
    const [eta, formatter] = [new ETA(), new MagnitudeFormo(0)]
    const funcs = Object.values(funcSet)
    const [ht, wd] = [repeats.length, funcs.length]
    const [side, banner, matrix] = [
      repeats.map(n => formatter.format(n).toString()),
      Object.keys(funcSet),
      Mat.ini(ht, wd, (i, j) => 0)
    ]
    const len = Stat.maxBy(side, x => x.length)
    eta.ini()
    for (let x = 0; x < ht; x++) {
      for (let y = 0; y < wd; y++) {
        Portuguese.rehearsal(repeats[x], funcs[y])
        matrix[x][y] = eta.split()
      }
      GP.roughlyNow().tag(`repeat * ${side[x].padStart(len)}, funcs 1 ~ ${wd}`).wL()
    }
    return new CrosTab(side, banner, matrix, 'repeat #')
  }

  /**
   *
   * @param {number} repeat
   * @param {*[]} parameters each function has only one single parameter
   * @param {function[]|Object|Map}funcSet
   * @returns {CrosTab}
   */
  static compareFuncsByParams (repeat, parameters, funcSet) {
    const eta = new ETA()
    const funcs = Object.values(funcSet)
    const [ht, wd] = [parameters.length, funcs.length]
    const [side, banner, matrix] = [
      parameters.map(n => n.toString()),
      Object.keys(funcSet),
      Mat.ini(ht, wd, (i, j) => 0)
    ]
    const len = Stat.maxBy(side, x => x.length)
    eta.ini()
    for (let x = 0; x < ht; x++) {
      for (let y = 0; y < wd; y++) {
        Portuguese.rehearsal(repeat, () => funcs[y].call(null, parameters[x]))
        matrix[x][y] = eta.split()
      }
      GP.roughlyNow().tag(`[Param #${x}] (${side[x].padStart(len)}): repeat * ${repeat}, funcs 1 ~ ${wd}`).wL()
    }
    return new CrosTab(side, banner, matrix, 'parameter')
  }
}

export {
  Portuguese
}