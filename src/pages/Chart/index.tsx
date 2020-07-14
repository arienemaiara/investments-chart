import React, { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import Select from 'react-select'

import api from '../../services/api'

import {
  currencyFormatter,
  decimalFormatter,
  timestampToDate,
  timestampToMonthYear
} from '../../utils/formatters'
import { sortArrayBy, getMinValue } from '../../utils/helpers'

import { Wrapper, TooltipContent } from './styles'

import Colors from '../../constants/colors'

type ChartItem = {
  timestamp: number
  valor: number
}

type ChartFilter = {
  label: string
  value: number
}

const Chart: React.FC = () => {
  const [chartItems, setChartItems] = useState<ChartItem[]>()
  const [chartScreenItems, setChartScreenItems] = useState<ChartItem[]>()
  const [chartFilter, setChartFilter] = useState<ChartFilter>({
    label: 'Desde o início',
    value: 0
  })

  const filterOptions: ChartFilter[] = [
    { label: 'Desde o início', value: 0 },
    { label: 'Último mês', value: 30 },
    { label: '3 meses', value: 90 },
    { label: '1 ano', value: 365 },
    { label: '2 anos', value: 730 }
  ]

  useEffect(() => {
    getChartData()
  }, [])

  useEffect(() => {
    const applyFilters = (): void => {
      //Apply new filters to chart
      const daysToFilter = chartFilter.value
      if (daysToFilter > 0) {
        const initialDate = new Date() //1579010065000
        initialDate.setDate(initialDate.getDate() - daysToFilter)
        let filteredData = chartItems?.filter(
          (item) => item.timestamp >= Number(initialDate)
        )
        setChartScreenItems(filteredData)
      } else {
        setChartScreenItems(chartItems)
      }
    }

    applyFilters()
  }, [chartFilter])

  const getChartData = async () => {
    api
      .get('/')
      .then((response) => {
        formatChartData(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const formatChartData = (chartData: any): void => {
    let chartValues = chartData.map(
      (item: number[]): ChartItem => {
        const chartItem: ChartItem = {
          timestamp: item[0],
          valor: item[1]
        }
        return chartItem
      }
    )

    //Insert a initial value
    let initalDate = getMinValue(chartValues, 'timestamp')
    initalDate = new Date(initalDate)

    chartValues.push({
      timestamp: initalDate.setDate(initalDate.getDate() - 1),
      valor: 0
    })

    chartValues = chartValues.sort(sortArrayBy('timestamp'))
    setChartItems(chartValues)
    setChartScreenItems(chartValues)
  }

  const handleFilterChange = (data: any) => {
    console.log(data)
    setChartFilter(data)
  }

  const renderTooltipContent = (data: any) => {
    const { payload } = data

    return (
      <TooltipContent>
        {payload &&
          payload.map((item: any, index: number) => {
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
      <section>
        <Select
          options={filterOptions}
          defaultValue={filterOptions[0]}
          onChange={handleFilterChange}
        />
        <div>
          <p>
            Você está vendo o período{' '}
            <strong>{chartFilter?.label || 'Desde o início'}</strong>
          </p>
        </div>
      </section>
      <AreaChart
        width={900}
        height={400}
        data={chartScreenItems}
        stackOffset="expand"
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="timestamp" tickFormatter={timestampToMonthYear} />
        <YAxis
          dataKey="valor"
          tickFormatter={decimalFormatter}
          orientation="right"
        />
        <CartesianGrid stroke="#eee" />
        <Tooltip content={renderTooltipContent} />
        <Area
          type="monotone"
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
