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

import api from '../../services/api'

import {
  currencyFormatter,
  decimalFormatter,
  timestampToDate,
  timestampToMonthYear
} from '../../utils/formatters'
import { sortArrayBy, getMinValue } from '../../utils/helpers'

import { Wrapper, TooltipContent } from './styles'

import Header from '../../components/Header'

import Filter from '../../components/Filter'

import Colors from '../../constants/colors'

type ChartItem = {
  timestamp: number
  valor: number
}

const Chart: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [chartItems, setChartItems] = useState<ChartItem[]>()
  const [chartScreenItems, setChartScreenItems] = useState<ChartItem[]>()
  const [chartFilter, setChartFilter] = useState<number>(0)
  const [chatError, setChartError] = useState(false)

  useEffect(() => {
    getChartData()

    //Check if there is a filter already applied
    const savedFilter = localStorage.getItem('@chart/filter')
    if (savedFilter) {
      const savedFilterObj = JSON.parse(savedFilter)
      setChartFilter(savedFilterObj)
    }
  }, [])

  useEffect(() => {
    setChartError(false)
    applyFilters(chartFilter)
  }, [chartFilter, chartItems])

  const getChartData = () => {
    api
      .get('/')
      .then((response) => {
        formatChartData(response.data)
      })
      .catch((error) => {
        console.log(error)
        setChartError(true)
      })
      .finally(() => setLoading(false))
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

  const applyFilters = (daysToFilter: number): void => {
    setLoading(true)
    //Apply new filters to chart
    if (daysToFilter > 0) {
      const initialDate = new Date() //1579010065000
      initialDate.setDate(initialDate.getDate() - daysToFilter)
      const filteredData = chartItems?.filter(
        (item) => item.timestamp >= Number(initialDate)
      )
      setChartScreenItems(filteredData)
    } else {
      setChartScreenItems(chartItems)
    }
    setLoading(false)
  }

  const handleFilterChange = (data: string) => {
    localStorage.setItem('@chart/filter', data)
    setChartFilter(Number(data))
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
                <p>
                  <span>Data: </span> {timestampToDate(itemValue.timestamp)}
                </p>
                <p>
                  <span>Valor: </span>
                  {currencyFormatter(itemValue.valor)}
                </p>
              </div>
            )
          })}
      </TooltipContent>
    )
  }

  const renderChart = () => {
    if (loading) {
      return <p>Carregando informações...</p>
    }

    if (chatError) {
      return <p>Erro ao buscar os dados do gráfico. Tente novamente.</p>
    }

    if (!chartScreenItems || chartScreenItems?.length === 0) {
      return <p>Nenhum dado encontrado para o período.</p>
    }

    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        minHeight={300}
        minWidth={300}
      >
        <AreaChart
          data={chartScreenItems}
          stackOffset="expand"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis
            dataKey="timestamp"
            tickFormatter={timestampToMonthYear}
            interval="preserveStartEnd"
            minTickGap={90}
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
      <Header />
      <main>
        <Filter chartFilter={chartFilter} onFilterChange={handleFilterChange} />
        <section className="chart-area" data-testid="chart-area">
          {renderChart()}
        </section>
      </main>
    </Wrapper>
  )
}

export default Chart
