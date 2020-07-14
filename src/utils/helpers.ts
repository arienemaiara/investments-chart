export const sortArrayBy = (prop: string): Function => {
  return function (a: any, b: any) {
    return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0
  }
}

export const getMinValue = (data: any, prop: string): any => {
  return data.reduce(
    (min: any, p: any) => (p[prop] < min ? p[prop] : min),
    data[0][prop]
  )
}

export const getMaxValue = (data: any, prop: string): any => {
  return data.reduce(
    (max: any, p: any) => (p[prop] > max ? p[prop] : max),
    data[0][prop]
  )
}
