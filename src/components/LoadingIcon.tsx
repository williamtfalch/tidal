import styled from 'styled-components'

const StyledLoadingIcon = styled.div`
  width: 20px;
  height: 20px;

  div {
    width: 20px;
    height: 20px;
    border: 2px solid #00b2b2; 
    border-top: 2px solid #383838;
    border-radius: 50%;
    animation-name: spin;
    animation-duration: 3000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 

    @keyframes spin {
      from {
          transform:rotate(0deg);
      }
      to {
          transform:rotate(360deg);
      }
    }
  }
`;

function LoadingIcon() {
  return (
    <StyledLoadingIcon className="loadingIcon">
      <div />
    </StyledLoadingIcon>
  )
}

export default LoadingIcon