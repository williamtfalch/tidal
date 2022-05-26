import Album from './components/Album'
import Search from './components/Search'
import Discography from './components/Discography'
import styled from 'styled-components'

const StyledApp = styled.div`
  width: 700px;
  min-height: calc(100vh - 200px);
  background-color: #303030;
  border-radius: 5px;
  padding: 50px 30px;
  margin: 50px auto;
  flex-basis: 0;
  flex-grow: 1;
`;

function App() {
  return (
    <StyledApp>
      <Search />
      <Discography />
      <Album />
    </StyledApp>
  )
}

export default App
