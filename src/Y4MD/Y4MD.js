import { monthCap } from './utils/monthCap'
import { leapYear } from './utils/leapYear'
import { daysBack, daysForth, yearBack, yearForth } from './utils/backAndForth'
import { calibre, endOfMonth } from './utils/calibre'
import { joinY4MD } from './utils/parseY4MD'

export class Y4MD {
  static fromDate (date = new Date()) {
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
  }

  static toDate (ymd) {
    return new Date(ymd[0], ymd[1] - 1, ymd[2])
  }

  static fromTx (tx) {
    return [+tx.slice(0, 4), +tx.slice(5, 7), +tx.slice(8, 10)]
  }

  static toTx (ymd, de = '-') {
    return joinY4MD(ymd[0], ymd[1], ymd[2], de)
  }

  static addYear ([y, m, d], years) {
    let eom = endOfMonth(y, m)
    return calibre(y + years, m, d, eom)
  }

  static addMonth ([y, m, d], months) {
    let eom = endOfMonth(y, m)
    let ym = y * 12 + m + months
    y = ~~(ym / 12)
    m = ym % 12
    if (m < 1) {
      y--
      m = 12
    }
    return calibre(y, m, d, eom)
  }

  static addDays ([y, m, d], days) {
    let lp = leapYear(y),
      /**
       *
       * @type {{y: number, m: number,d: number, lp: boolean, cap: number }}
       */
      dt = { y, m, d: d + days, lp, cap: monthCap(m, lp) }
    if (dt.d - 365 > 0) dt = yearForth(dt)
    if (dt.d + 365 < 0) dt = yearBack(dt)
    dt = dt.d >= 0
      ? daysForth(dt)
      : daysBack(dt)
    return [dt.y, dt.m, dt.d]
  }

  static seasonLoHi ([y, m]) {
    let hi = ~~((m - 1) / 3 + 1) * 3
    return [[y, hi - 2, 1], [y, hi, endOfMonth(y, hi)]]
  }

  static monthLoHi ([y, m]) {
    return [[y, m, 1], [y, m, endOfMonth(y, m)]]
  }
}
