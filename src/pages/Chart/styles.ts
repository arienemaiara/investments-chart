import styled from 'styled-components'

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;

  main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%;
    max-width: 1200px;
    margin: auto;
    padding: 20px;

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
  }
`

export const TooltipContent = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;

  p {
    font-size: 16px;
    margin: 2px 0;

    span {
      font-weight: 700;
    }
  }
`
