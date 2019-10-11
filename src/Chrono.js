import { MagnitudeForm, VecX } from 'xbrief'
import { Mat, Vec } from 'veho'
import { ETA } from './ETA'
import { GP } from './GP'
import { CrosTab } from 'crostab'

class Chrono {
  /**
   *
   * @param {number} repeat
   * @param {function} func
   * @param {...*[]} [params]
   * @return {*}
   */
  static rehearsal (repeat, func, ...params) {
    const rsl = func.call(null, ...params)
    for (let i = 1; i < repeat; i++) {
      func.call(null, ...params)
    }
    return rsl
  }

  /**
   * Cross by repeatList and functions.
   * Each function contains no parameter.
   * @param {number[]} repeatList
   * @param {Object<string,function>} funcList
   * @param {*[]} [params]
   * @returns {CrosTab}
   */
  static crossByRepeatsAndFuncs ({ repeatList, funcList, params = [] }) {
    const [eta, mf] = [new ETA(), new MagnitudeForm(0)]
    const [side, banner] = [repeatList, Object.keys(funcList)]
    const [ht, wd] = [side.length, banner.length]
    const [lapseX, valueRow] = [
      Mat.ini(ht, wd, (i, j) => 0),
      Vec.ini(wd, () => null)
    ]
    eta.ini()
    for (let [x, repeat] of Object.entries(repeatList)) {
      GP.now().tag(
        `[${x}] (${repeat}): repeat for each of [${Object.keys(funcList) |> VecX.hBrief}]`
      ) |> console.log
      eta.split()
      for (let [y, func] of Object.values(funcList).entries()) {
        valueRow[y] = Chrono.rehearsal(repeat, func, ...params)
        lapseX[x][y] = eta.split()
      }
    }
    return new CrosTab(side, banner, lapseX, 'repeat #')
      .unshiftRow('result', valueRow)
  }

  /**
   * Cross by paramsList and functions, under certain repeat.
   * Each function receives the same list of paramsList.
   * @param {number} repeat
   * @param {Object<string,*[]>} paramsList - each result is an array of paramsList
   * @param {Object<string,function>} funcList
   * @returns {{lapse:CrosTab,result:CrosTab}}
   */
  static crossByParamAndFuncs ({ repeat, paramsList, funcList }) {
    const eta = new ETA()
    const [side, banner] = [Object.keys(paramsList), Object.keys(funcList)]
    const [ht, wd] = [side.length, banner.length]
    const lapseX = Mat.ini(ht, wd, (i, j) => 0)
    const valueX = Mat.ini(ht, wd, (i, j) => null)
    eta.ini()
    for (let [x, [paramLabel, params]] of Object.entries(paramsList).entries()) {
      GP.now().tag(
        `[${x}] (${paramLabel}) tested by each of funcs [${banner}], each repeated * ${repeat}.`
      ) |> console.log
      eta.split()
      for (let [y, func] of Object.values(funcList).entries()) {
        valueX[x][y] = Chrono.rehearsal(repeat, func, ...params)
        lapseX[x][y] = eta.split()
      }
    }
    return {
      lapse: CrosTab.from({
        side,
        banner,
        matrix: lapseX,
        title: 'parameter'
      }),
      result: CrosTab.from({
        side,
        banner,
        matrix: valueX,
        title: 'parameter'
      })
    }
  }
}

export {
  Chrono
}