class Fm {}

Fm.Day = new Intl.DateTimeFormat(
  undefined,
  {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  }
)

Fm.Time = new Intl.DateTimeFormat(
  undefined,
  {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }
)

Fm.DayTime = new Intl.DateTimeFormat(
  undefined,
  {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  }
)

// Fm.Day = new Intl.DateTimeFormat(
//   undefined,
//   {
//     year: '2-digit',
//     month: '2-digit',
//     day: '2-digit'
//   }
// )
//
// Fm.Time = new Intl.DateTimeFormat(
//   undefined,
//   {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: false
//   }
// )
//
// Fm.DayTime = new Intl.DateTimeFormat(
//   undefined,
//   {
//     year: '2-digit',
//     month: '2-digit',
//     day: '2-digit',
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric',
//     hour12: false
//   }
// )

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
    return `${Fm.Time.format(d)}.${d.getMilliseconds().toPrecision(3)}`
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
