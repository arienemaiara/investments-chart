import React from 'react'
import Select from 'react-select'
import { FiCalendar } from 'react-icons/fi'

import { Container } from './styles'

export type ChartFilter = {
  label: string
  value: number
}

interface Props {
  onFilterChange: Function
  chartFilter: ChartFilter
}

const Filter: React.FC<Props> = ({ chartFilter, onFilterChange }) => {
  const filterOptions: ChartFilter[] = [
    { label: 'Desde o início', value: 0 },
    { label: 'Último mês', value: 30 },
    { label: '3 meses', value: 90 },
    { label: '1 ano', value: 365 },
    { label: '2 anos', value: 730 }
  ]

  return (
    <Container>
      <FiCalendar size={26} />
      <p>Período</p>
      <Select
        options={filterOptions}
        value={chartFilter}
        onChange={(data) => onFilterChange(data)}
        className="filter-select"
        classNamePrefix="filter-select"
      />
    </Container>
  )
}

export default Filter
