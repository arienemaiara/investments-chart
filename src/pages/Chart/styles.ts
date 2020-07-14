import styled from 'styled-components'

import Colors from '../../constants/colors'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  header {
    width: 100%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
    padding: 15px;

    h1 {
      font-size: 36px;
      text-align: center;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    padding: 40px;
  }

  .filter-container {
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

      .filter-select__option:hover {
        background: ${Colors.secondary};
      }

      .filter-select__option--is-selected {
        background: ${Colors.primary};

        &:hover {
          background: ${Colors.primary};
        }
      }
    }
  }

  .chart-area {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    p {
      font-size: 16px;
      color: #444;
    }
  }
`

export const TooltipContent = styled.div`
  background: #fff;
`
