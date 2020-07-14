import React from 'react'
import { render, screen } from '@testing-library/react'

import Header from '.'

describe('<Header />', () => {
  it('should render title', () => {
    render(<Header />)

    expect(
      screen.getByRole('heading', { name: /investments chart/i })
    ).toBeInTheDocument()
  })
})
