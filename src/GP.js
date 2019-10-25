const
  _d_2 = '2-digit',
  _num = 'numeric'
const
  confDate = {
    year: _d_2,
    month: _d_2,
    day: _d_2
  },
  confTime = {
    hour: _num,
    minute: _num,
    second: _num,
    hour12: false
  }

class Fm {
  /**
   *
   * @type {Intl.DateTimeFormat}
   */
  static Day = new Intl.DateTimeFormat(
    undefined,
    confDate
  )

  /**
   *
   * @type {Intl.DateTimeFormat}
   */
  static Time = new Intl.DateTimeFormat(
    undefined,
    confTime
  )

  /**
   *
   * @type {Intl.DateTimeFormat}
   */
  static DayTime = new Intl.DateTimeFormat(
    undefined,
    {
      ...confDate,
      ...confTime
    }
  )
}

const padMilli = (ms) => {
  ms = '' + ms
  return ms.length > 2 ? ms : ('00' + ms).slice(-3)
}

class GP {

  /**
   * Return string of current time.
   * Format: hh:mm:ss
   * @return {string}
   */
  static roughlyNow () {
    return Fm.Time.format(new Date())
  }

  /**
   * Return string of current time with 3-digit milliseconds.
   * Format: hh:mm:ss.mmm
   * @return {string}
   */
  static now () {
    let d = new Date()

    return `${Fm.Time.format(d)}.${padMilli(d.getMilliseconds())}`
  }

  /**
   * Return string of current date.
   * Format: mm/dd/yy
   * @return {string}
   */
  static today () {
    return Fm.Day.format(new Date())
  }

  /**
   * Return string of current date with time.
   * Format: mm/dd/yy, hh:mm:ss
   * @return {string}
   */
  static present () {
    return Fm.DayTime.format(new Date())
  }
}

export {
  Fm,
  GP
}
