import React from 'react'
import { FiCalendar } from 'react-icons/fi'

import { Container } from './styles'

export type ChartFilter = {
  label: string
  value: number
}

export interface FilterProps {
  onFilterChange: (value: string) => void
  chartFilter: number
}

const Filter: React.FC<FilterProps> = ({ chartFilter, onFilterChange }) => {
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
      {/* <Select
        options={filterOptions}
        value={chartFilter}
        onChange={(data: any) => onFilterChange(data)}
        className="filter-select"
        classNamePrefix="filter-select"
      /> */}
      <select
        value={chartFilter}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onFilterChange(e.target.value)
        }
        data-testid="filter-options"
      >
        {filterOptions.map((filter) => (
          <option value={filter.value} key={filter.value}>
            {filter.label}
          </option>
        ))}
      </select>
    </Container>
  )
}

export default Filter
