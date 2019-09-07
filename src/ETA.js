import { Fm } from './GP'

export class ETA {
  constructor () {
    this.current = new Date()
  }

  ini (msg = '') {
    const current = new Date()
    const stamp = `[${Fm.Time.format(current)}] [Ini 0ms] ${msg}`
    this.current = current
    return stamp
  }

  split () {
    const current = new Date()
    const stamp = current - this.current
    this.current = current
    return stamp
  }

  lap (msg = '') {
    const current = new Date()
    const stamp = `[${Fm.Time.format(current)}] [Lap ${current - this.current}ms] ${msg}`
    this.current = current
    return stamp
  }

  end (msg = '') {
    const current = new Date()
    const stamp = `[${Fm.Time.format(current)}] [End ${current - this.current}ms] ${msg}`
    this.current = current
    return stamp
  }
}

// export {
//   ETA
// }
