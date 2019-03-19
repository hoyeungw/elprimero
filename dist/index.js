'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var xbrief = require('xbrief');
var veho = require('veho');
var borel = require('borel');
var crostab = require('crostab');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class Fm {}

_defineProperty(Fm, "staticProperty", 'formation');

Fm.Day = new Intl.DateTimeFormat(undefined, {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit'
});
Fm.Time = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
});
Fm.DayTime = new Intl.DateTimeFormat(undefined, {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
});
class GP {
  static roughlyNow() {
    return Fm.Time.format(new Date());
  }

  static now() {
    let d = new Date();
    return `${Fm.Time.format(d)}.${d.getMilliseconds().toPrecision(3)}`;
  }

  static today() {
    return Fm.Day.format(new Date());
  }

  static present() {
    return Fm.DayTime.format(new Date());
  }

} // export {
//   Fm,
//   GP
// }

class ETA {
  constructor() {
    this.current = new Date();
  }

  ini(msg = '') {
    const current = new Date();
    const stamp = `[${Fm.Time.format(current)}] [Ini 0ms] ${msg}`;
    this.current = current;
    return stamp;
  }

  split() {
    const current = new Date();
    const stamp = current - this.current;
    this.current = current;
    return stamp;
  }

  lap(msg = '') {
    const current = new Date();
    const stamp = `[${Fm.Time.format(current)}] [Lap ${current - this.current}ms] ${msg}`;
    this.current = current;
    return stamp;
  }

  end(msg = '') {
    const current = new Date();
    const stamp = `[${Fm.Time.format(current)}] [End ${current - this.current}ms] ${msg}`;
    this.current = current;
    return stamp;
  }

} // export {
//   ETA
// }

class Chrono {
  static rehearsal(repeat, func) {
    const rsl = func();

    if (repeat > 1) {
      for (let i = 1; i < repeat; i++) {
        func();
      }
    }

    return rsl;
  }
  /**
   *
   * @param {number[]} repeats
   * @param {function[]|Object|Map} funcSet
   * @returns {CrosTab}
   */


  static compareFuncsByRepeats(repeats, funcSet) {
    const [eta, formatter] = [new ETA(), new xbrief.MagnitudeFormo(0)];
    const funcs = Object.values(funcSet);
    const [ht, wd] = [repeats.length, funcs.length];
    const [side, banner, matrix] = [repeats.map(n => formatter.format(n).toString()), Object.keys(funcSet), veho.Mat.ini(ht, wd, (i, j) => 0)];
    const len = borel.Stat.maxBy(side, x => x.length);
    eta.ini();

    for (let x = 0; x < ht; x++) {
      for (let y = 0; y < wd; y++) {
        Chrono.rehearsal(repeats[x], funcs[y]);
        matrix[x][y] = eta.split();
      }

      GP.roughlyNow().tag(`repeat * ${side[x].padStart(len)}, funcs 1 ~ ${wd}`).wL();
    }

    return new crostab.CrosTab(side, banner, matrix, 'repeat #');
  }
  /**
   *
   * @param {number} repeat
   * @param {*[]} parameters each function has only one single parameter
   * @param {function[]|Object|Map}funcSet
   * @returns {CrosTab}
   */


  static compareFuncsByParams(repeat, parameters, funcSet) {
    const eta = new ETA();
    const funcs = Object.values(funcSet);
    const [ht, wd] = [parameters.length, funcs.length];
    const [side, banner, matrix] = [parameters.map(n => n.toString()), Object.keys(funcSet), veho.Mat.ini(ht, wd, (i, j) => 0)];
    const len = borel.Stat.maxBy(side, x => x.length);
    eta.ini();

    for (let x = 0; x < ht; x++) {
      for (let y = 0; y < wd; y++) {
        Chrono.rehearsal(repeat, () => funcs[y].call(null, parameters[x]));
        matrix[x][y] = eta.split();
      }

      GP.roughlyNow().tag(`[Param #${x}] (${side[x].padStart(len)}): repeat * ${repeat}, funcs 1 ~ ${wd}`).wL();
    }

    return new crostab.CrosTab(side, banner, matrix, 'parameter');
  }

}

exports.ETA = ETA;
exports.Chrono = Chrono;
exports.GP = GP;
