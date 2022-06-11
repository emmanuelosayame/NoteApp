import React, {useState, useEffect} from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import {Box, Button, IconButton, Textarea, Flex} from '@chakra-ui/react'
import { CheckIcon, ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons';
 

function NotePage() {
 
  let noteId =useParams().id;

  const history = useNavigate()
  
  const [note, setNote] = useState([]);
  // eslint-disable-next-line
   useEffect(() => { getNote()},[noteId]);
  
   
  const getNote = async () => {
    if(noteId === 'new') return;
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data.body)
  }

  const updateNote = async () => {
     await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {method: 'PUT', 
     headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ 'body':note }) }
     )
     history('/')
  }

  const createNote = async () => {
    console.log('create')
    if(note!==null){
    await fetch(`http://127.0.0.1:8000/api/notes/`, {method: 'POST', 
    headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ 'body':note}) }
    )
    history('/')
    } else {history('/')}
 }
  
  const deleteNote = async () => {
    await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`, {method: 'DELETE', 
    headers: { 'Content-Type': 'application/json'}}
    )
    history('/')
  }

 let submitButton = () => {
   if (noteId !== 'new' && !note) {
     deleteNote()
   } else if(noteId !== 'new'){
     updateNote()
   } else if (noteId === 'new' && note !== null){
     createNote()
   }
   else{history('/')}
 } 


  return (

   <Box w='100%'>
    
    <Flex justifyContent='space-between'  >

    <Button ml='1' color='blue.400' iconSpacing='-2' variant='link' 
     fontWeight='400' size='lg'
    leftIcon={<ChevronLeftIcon h='10' w='10'/>} onClick={submitButton}>  </Button>
 
    {noteId==='new'?
    <IconButton icon={<CheckIcon/>} m='3' colorScheme='red'
    onClick={createNote} />:
    <IconButton icon={<DeleteIcon/>} m='3' onClick={deleteNote} colorScheme='red' />} 
    </Flex>

     <Textarea h='590px' w='100%' m='1' bgColor='transparent' fontSize='20px'
     variant='foutline' resize ='none' value={note} className='scroll-hidden'
     onChange={(evnt) => { 
      setNote(evnt.target.value)
    }} />
  </Box>
  )
}

export default NotePage