import styled from 'styled-components'

import Colors from '../../constants/colors'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: ${Colors.primary};
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);

  p {
    font-size: 18px;
    margin: 0 15px 0 5px;
  }

  .filter-select {
    width: 200px;
    font-size: 16px;
    padding: 8px 10px;
    border: 1px solid ${Colors.secondary};
    border-radius: 5px;
  }
`
