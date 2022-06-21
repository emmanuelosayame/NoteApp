import { useState , useEffect } from 'react';
import { Box, Flex , useColorMode} from '@chakra-ui/react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import NoteList from './pages/NoteList'
import NotePage from './pages/NotePage'
import { collection, onSnapshot} from "firebase/firestore";
import {db} from './firebase.js'



function App() {
  
   const [notes, setNotes] = useState([]);
   
  useEffect(() => { 
      const unsub = onSnapshot(collection(db, "notes"), (noteSnapshot) => {
        const noteList =  noteSnapshot.docs.map((doc)=>{
          return {...doc.data(), id:doc.id}
         });
         setNotes(noteList)
      })    
     return unsub
    },[]);


    
 


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
      <Route index path="/" element={<NoteList notes={notes} />} />
      <Route path="/note/:id" element ={<NotePage animate={true} data={notes} db={db} />} />
      </Routes>
      </Flex>
      </Box>
    </Flex>
    </Router>
  );
}

export default App;
