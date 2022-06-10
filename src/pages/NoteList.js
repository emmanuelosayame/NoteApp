import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom'
import {Box, IconButton, Flex,Text} from '@chakra-ui/react'
import '../App.css';
import { AddIcon } from '@chakra-ui/icons';


function NoteList() {

  const [notes, setNotes] = useState([]);
  useEffect(()=>{
    getNotes()
  },[])

  let getNotes = async () => {
  let response = await fetch('https://fake-server-levi.herokuapp.com/notes/');
  let data = await response.json();
    setNotes(data)
  }
 
  const getTitle = (notes) => {
    let title = String(notes.body).split('\n')[0]

    if (title.length > 45) {
     return title.slice(0,45)
    }
    return title
   }

   const getBody = (note) => {
    let title = getTitle(note)
    const content = String(note.body).replaceAll(title,'')
    if (content.length > 34) {
      return '-' + content.slice(0,34) + '...'
    }else if (content==='' || content==='\n'){
      return
    }else{
      return '-' + content
    }
     
   }

  return (
    <Box w='100%' >
    <Flex m='2'>
        <Text alignSelf='center' color='blue.300' ml='3' fontSize='22px' fontWeight='600' >{notes.length}</Text>
      </Flex>

    <Flex overflowY='scroll' h='588px' className='scroll-hidden'>  
    <Box w='100%' >  
    { notes.map(note=>(
     <Link to={`/note/${note.id}`} key={note.id}>
       <Flex flexDirection='column' fontWeight='600' fontSize='18px' 
       p='2' px='4' borderStyle='solid' borderBottomWidth='0' 
       _hover={{bgColor: 'white'}}  >
      {getTitle(note)}
       
       <Flex mt='1'>
       <Box fontWeight='500' fontSize='16px'> {
        new Date(note.updated).toLocaleDateString()
      } </Box>
      <Box fontWeight='500' ml='2' fontSize='16px'> {getBody(note)} </Box>
       </Flex>

      </Flex>
      </Link>
    ))}
    </Box> 
    </Flex>

    <Link to='/note/new' >
    <IconButton isRound='true' mr='8'
    size='lg' float='right' bottom='20' variant='solid'
    leftIcon={<AddIcon boxSize='6' ml='2' />}>  </IconButton>
    </Link>

    </Box>
  )
}

export default NoteList