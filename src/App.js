import { Box, Flex , useColorMode} from '@chakra-ui/react';
import {HashRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import NoteList from './pages/NoteList'
import NotePage from './pages/NotePage'


function App() {
 
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
      <Route index path="/" element={<NoteList />} />
      <Route path="/note/:id" element ={<NotePage animate={true} />} />
      </Routes>
      </Flex>
      </Box>
    </Flex>
    </Router>
  );
}

export default App;
