import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

import api from '../../services/api'

import {
  currencyFormatter,
  decimalFormatter,
  timestampToDate,
  timestampToMonthYear
} from '../../utils/formatters'
import { sortArrayBy } from '../../utils/helpers'

import { Wrapper, TooltipContent } from './styles'

import Colors from '../../constants/colors'
import { AnySoaRecord } from 'dns'

interface ChartItem {
  timestamp: number
  valor: number
}

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
        let chartData = response.data.map(
          (item: number[]): ChartItem => {
            const chartItem: ChartItem = {
              timestamp: item[0],
              valor: item[1]
            }
            return chartItem
          }
        )
        chartData = chartData.sort(sortArrayBy('timestamp'))
        setChartItems(chartData)
        console.log(chartData)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const renderTooltipContent = (data: any) => {
    const { payload } = data

    return (
      <TooltipContent>
        {payload.map((item: any, index: number) => {
          const itemValue: ChartItem = item.payload
          return (
            <div key={index}>
              <h3>Patrimônio</h3>
              <p>
                <span>Data: </span> {timestampToDate(itemValue.timestamp)}
              </p>
              <p>
                <span>Valor:</span>
                {currencyFormatter(itemValue.valor)}
              </p>
            </div>
          )
        })}
      </TooltipContent>
    )
  }

  return (
    <Wrapper>
      <h1>Investments Chart</h1>
      <AreaChart
        width={800}
        height={400}
        data={chartItems}
        stackOffset="expand"
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="timestamp" tickFormatter={timestampToMonthYear} />
        <YAxis
          dataKey="valor"
          tickFormatter={decimalFormatter}
          orientation="right"
        />
        <Tooltip content={renderTooltipContent} />
        <Area
          type="linear"
          dataKey="valor"
          stroke={Colors.primary}
          fill={Colors.primary}
          strokeWidth={2}
        />
      </AreaChart>
    </Wrapper>
  )
}

export default Chart
