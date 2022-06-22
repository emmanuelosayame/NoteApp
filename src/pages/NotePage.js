import React, {useState, useEffect} from 'react';
import { useParams , useNavigate} from 'react-router-dom'
import {Box, Button, IconButton, Textarea, Flex} from '@chakra-ui/react'
import { CheckIcon, ChevronLeftIcon, DeleteIcon } from '@chakra-ui/icons';
import { addDoc, updateDoc, deleteDoc, doc , collection} from "firebase/firestore";
 

function NotePage({data, db}) {
 
  let noteId = useParams().id

  const history = useNavigate()
  
  const [note, setNote] = useState([]);

   useEffect(() => {
     ( async ()=>{
      if(noteId === 'new') return
      const notedata = data?.find(x => x.id === noteId).body
      setNote(notedata)
      })
      ()
    },[data, noteId]);
  
    

  const updateNote = async () => {
    history('/')
     const noteRef = doc(db, "notes", noteId);
     await updateDoc(noteRef , {
      body: note, updated: Date()
     }) 
  }

  const createNote =  () => {
    if(note.length === 0){
      history('/')
    }
   else if (note.match(/^ *$/) !== null){
      history('/')
     addDoc(collection(db, "notes") , {body:note, updated: Date()})           
    }
     history('/')
 }
  
  const deleteNote = async () => {
    history('/')
  const noteRef = doc(db , "notes", noteId);
      await deleteDoc(noteRef);
  }

 let submitButton = () => {
   if (noteId !== 'new' && (note.length === 0 || note.match(/^ *$/) !== null)) {
     deleteNote()
   } else if(noteId !== 'new'){
     updateNote()
   } else if (noteId === 'new'){
     createNote()
   }
   history('/')
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