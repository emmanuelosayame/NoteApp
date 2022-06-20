import { Box, Flex , useColorMode} from '@chakra-ui/react';
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import NoteList from './pages/NoteList'
import NotePage from './pages/NotePage'
import  useSWR  from 'swr'


function App() {
 
  const fetcher = (url) => fetch(url).then (res => res.json())
  const { data , error } = useSWR('https://fake-server-levi.herokuapp.com/notes/', fetcher,
  {revalidateOnFocus:false, refreshInterval: 2000, }
  )

  const {colorMode} = useColorMode();

  return (
    <Router>
    <Flex justify='center' height='743' >
    <Box  w='590px' h='700px' borderX='2px' borderBottom='2px'
     borderColor={colorMode === 'light'? 'blue.50': 'gray.600'} 
    borderBottomRadius='15' >
      
  <Header />
      <Flex w='100%'mt='8px' >
      <Routes>
      <Route index path="/" element={<NoteList data={data} error={error}  />} />
      <Route path="/note/:id" element ={<NotePage animate={true}  data={data} />} />
      </Routes>
      </Flex>
      </Box>
    </Flex>
    </Router>
  );
}

export default App;
