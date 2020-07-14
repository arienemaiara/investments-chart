export const sortArrayBy = (prop: string): Function => {
  return function (a: any, b: any) {
    return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0
  }
}
