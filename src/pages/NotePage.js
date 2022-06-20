import React, {useState, useEffect} from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import {Box, Button, IconButton, Textarea, Flex} from '@chakra-ui/react'
import { CheckIcon, ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons';
import { mutate } from 'swr';
 

function NotePage({data}) {
 
  let noteId = useParams().id

  const history = useNavigate()
  
  const [note, setNote] = useState([]);
  // eslint-disable-next-line
   useEffect(() => { getNote()},[noteId]);
  
  //  const fetcher = (url) => fetch(url).then (res => res.json())
  //  const { data } = useSWR(`https://fake-server-levi.herokuapp.com/notes/`, fetcher)
  //  const { mutate } = useSWRConfig()
    
  const getNote = async () => {
    if(noteId === 'new') return;
    // let response = await fetch(`https://fake-server-levi.herokuapp.com/notes/${noteId}/`;
    // let data = await response.json();
    let notedata = await data?.find(x => x.id === parseInt(noteId)).body
    setNote(notedata)
  }

  const updateNote = async () => {
     history('/')
     await fetch(`https://fake-server-levi.herokuapp.com/notes/${noteId}/`, {method: 'PUT', 
     headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ 'body':note 
    , 'updated': new Date() }) }
     ) 
   mutate('https://fake-server-levi.herokuapp.com/notes/')
  }

  const createNote = async () => {
    if(note!==null){
      history('/')
    await fetch(`https://fake-server-levi.herokuapp.com/notes/`, {method: 'POST', 
    headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({ 'body':note, 'updated': new Date()}) }
    )
    mutate('https://fake-server-levi.herokuapp.com/notes/')
   
    } else {history('/')}
 }
  
  const deleteNote = async () => {
    history('/')
    await fetch(`https://fake-server-levi.herokuapp.com/notes/${noteId}/`, {method: 'DELETE', 
    headers: { 'Content-Type': 'application/json'}}
    )
    mutate('https://fake-server-levi.herokuapp.com/notes/')
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