interface Parts {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
  seconds: number
  ms: number
}
type Unit = 'year' | 'years' | 'month' | 'months' | 'day' | 'days'
| 'hour' | 'hours' | 'minute' | 'minutes' | 'second' | 'seconds'
| 'ms'

export class Time {
  date: Date

  constructor(p?: number | string | Date) {
    this.date = p ? new Date(p) : new Date()
  }

  get Parts(): Parts {
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hours = this.date.getHours()
    const minutes = this.date.getMinutes()
    const seconds = this.date.getSeconds()
    const ms = this.date.getMilliseconds()
    return {
      year, month, day, hours, minutes, seconds, ms
    }
  }

  set Parts(p: Partial<Parts>) {
    const table = {
      year: 'setFullYear',
      month: 'setMonth',
      day: 'setDate',
      hours: 'setHours',
      minutes: 'setMinutes',
      seconds: 'setSeconds',
      ms: 'setMilliseconds'
    } as const
    Object.entries(p).forEach(([key, value]) => {
      const k = key as keyof typeof p
      const v = k === 'month' ? value - 1 : value
      this.date[table[k]](v)
    })
  }

  get year() {
    return this.Parts.year
  }

  set year(v) {
    this.Parts = { year: v }
  }

  get month() {
    return this.Parts.month
  }

  set month(v) {
    this.Parts = { month: v }
  }

  get day() {
    return this.Parts.day
  }

  set day(v) {
    this.Parts = { day: v }
  }

  // set month(v) {
  get hours() {
    return this.Parts.hours
  }

  set hours(v) {
    this.Parts = { hours: v }
  }

  get minutes() {
    return this.Parts.minutes
  }

  set minutes(v) {
    this.Parts = { minutes: v }
  }

  get seconds() {
    return this.Parts.seconds
  }

  set seconds(v) {
    this.Parts = { seconds: v }
  }

  get ms() {
    return this.Parts.ms
  }

  set ms(v) {
    this.Parts = { ms: v }
  }

  format(pattern = 'yyyy-MM-dd') {
    return pattern
      .replace(/yyyy/g, this.year.toString())
      .replace(/MM/g, this.month.toString().padStart(2, '0'))
      .replace(/dd/g, this.day.toString().padStart(2, '0'))
      .replace(/HH/g, this.hours.toString().padStart(2, '0'))
      .replace(/mm/g, this.minutes.toString().padStart(2, '0'))
      .replace(/ss/g, this.seconds.toString().padStart(2, '0'))
      .replace(/fff/g, this.ms.toString().padStart(3, '0'))
  }

  add(n: number, unit: Unit) {
    const table = {
      year: 'year',
      years: 'year',
      month: 'month',
      months: 'month',
      day: 'day',
      days: 'day',
      hour: 'hours',
      hours: 'hours',
      minute: 'minutes',
      minutes: 'minutes',
      second: 'seconds',
      seconds: 'seconds',
      ms: 'ms'
    } as const
    this[table[unit]] += n
    return this
  }
}

export const time = (p?: number | string | Date) => {
  return new Time(p)
}
