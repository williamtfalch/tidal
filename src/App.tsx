import Album from './components/Album'
import Search from './components/Search'
import Discography from './components/Discography'
import styled from 'styled-components'

const StyledApp = styled.div`
  width: 700px;
  min-height: auto;
  background-color: #303030;
  border-radius: 5px;
  padding: 50px 30px;
  margin: 50px auto;
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
