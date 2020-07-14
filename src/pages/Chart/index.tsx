import React, { useState, useEffect } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'
import Select from 'react-select'
import { FiCalendar } from 'react-icons/fi'

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

  const renderChart = () => {
    if (chartScreenItems?.length === 0) {
      return <p>Nenhum dado encontrado para o período.</p>
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartScreenItems}
          stackOffset="expand"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="timestamp"
            tickFormatter={timestampToMonthYear}
            interval="preserveStartEnd"
          />
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
            stroke={Colors.chart}
            fill={Colors.chart}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  return (
    <Wrapper>
      <header>
        <h1>Investments Chart</h1>
      </header>
      <main>
        <section className="filter-container">
          <FiCalendar size={26} />
          <p>Período</p>
          <Select
            options={filterOptions}
            defaultValue={filterOptions[0]}
            onChange={handleFilterChange}
            className="filter-select"
            classNamePrefix="filter-select"
          />
        </section>
        <section className="chart-area">{renderChart()}</section>
      </main>
    </Wrapper>
  )
}

export default Chart
