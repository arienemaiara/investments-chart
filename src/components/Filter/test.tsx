import React from 'react'
import { render, fireEvent } from '@testing-library/react'

// eslint-disable-next-line no-unused-vars
import Filter, { FilterProps } from '.'

function renderFilter(props: Partial<FilterProps> = {}) {
  const defaultProps: FilterProps = {
    onFilterChange() {
      return
    },
    chartFilter: 0
  }
  return render(<Filter {...defaultProps} {...props} />)
}

describe('<Filter />', () => {
  it('should render filter title', () => {
    const { getByText } = renderFilter()

    expect(getByText('Período')).toBeInTheDocument()
  })

  it('should render filter options', () => {
    const { getByTestId, getByText } = renderFilter()

    const selectFilter = getByTestId('filter-options')

    expect(selectFilter).toContainElement(getByText('Desde o início'))
    expect(selectFilter).toContainElement(getByText('Último mês'))
    expect(selectFilter).toContainElement(getByText('3 meses'))
    expect(selectFilter).toContainElement(getByText('1 ano'))
    expect(selectFilter).toContainElement(getByText('2 anos'))
  })

  it('should allow to change filter', () => {
    const onFilterChange = jest.fn()
    const { getByTestId } = renderFilter({
      onFilterChange
    })

    const selectFilter = getByTestId('filter-options')

    fireEvent.change(selectFilter, { target: { value: '365' } })

    expect(onFilterChange).toHaveBeenCalledWith('365')
  })
})
