import React from 'react'
import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent
} from '@testing-library/react'
import axios from 'axios'

import api from '../../services/api'

import Chart from '.'

jest.mock('../../services/api')
const mockedAxios = api as jest.Mocked<typeof axios>

describe('<Chart />', () => {
  afterEach(cleanup)

  it('should be able to get api data', async () => {
    const { getByTestId } = render(<Chart />)
    const chartArea = await waitFor(() => getByTestId('chart-area'))
    expect(chartArea.firstChild).toHaveClass('recharts-responsive-container')
    expect(mockedAxios.get).toHaveBeenCalledTimes(1)
    expect(mockedAxios.get).toHaveBeenCalledWith('/')
  })

  it('should show error message', async () => {
    mockedAxios.get.mockRejectedValueOnce('Erro')
    const { getByTestId } = render(<Chart />)
    const chartArea = await waitFor(() => getByTestId('chart-area'))
    expect(chartArea).toContainElement(
      screen.getByText('Erro ao buscar os dados do gráfico. Tente novamente.')
    )
  })

  it('should store filter in localStorage', async () => {
    const { getByTestId } = render(<Chart />)
    const filterSelect = await waitFor(() => getByTestId('filter-options'))
    fireEvent.change(filterSelect, {
      target: { value: '30' }
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('@chart/filter', '30')
  })

  it('should get initial filter value from localStorage', async () => {
    render(<Chart />)
    await waitFor(() =>
      expect(localStorage.getItem).toHaveBeenLastCalledWith('@chart/filter')
    )
  })
})
