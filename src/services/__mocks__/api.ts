export default {
  get: jest.fn(() =>
    Promise.resolve({
      data: [
        [1565308800000, 24960],
        [1565568000000, 24960]
      ]
    })
  )
}
