import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import { decimalFormatter, timestampToDate } from '../../utils/formatters'

import { Wrapper } from './styles'

// type ChartItem = {
//   x: number,
//   y: number
// }

const Chart: React.FC = () => {
  const [chartItems, setChartItems] = useState()
  const [chartFilter, setChartFilter] = useState()

  useEffect(() => {
    getChartData()
  }, [])

  const getChartData = async () => {
    api
      .get('/')
      .then((response) => {
        let chartData = response.data.sort(
          (a: Array<number>, b: Array<number>) => {
            return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0
          }
        )
        chartData = chartData.map((item: Array<number>) => {
          return {
            x: item[0],
            y: item[1],
            yAxis: decimalFormatter(item[1]),
            xAxis: timestampToDate(item[0])
          }
        })
        setChartItems(chartData)
        console.log(chartData)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Wrapper>
      <h1>chart</h1>
    </Wrapper>
  )
}

export default Chart
