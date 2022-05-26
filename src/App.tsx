import Album from './components/Album'
import Search from './components/Search'
import Discography from './components/Discography'
import StyledApp from './styles/StyledApp'

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
