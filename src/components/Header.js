import { Box, Flex, Switch,Text ,  useColorMode} from '@chakra-ui/react'
import React from 'react'

function Header() {   

  const {colorMode, toggleColorMode} = useColorMode();

  return (
    <Flex 
     justifyContent='end'
      backdropBlur='8px' 
     bgColor={colorMode === 'light'? 'blue.100': 'gray.700'} 
    mx='1'px='5' borderBottomRadius="5px">
    <Box flexBasis='250' fontWeight='600'fontSize={32}>
      Notes 
    </Box>
    
    <Switch mx='3' alignSelf='center' colorScheme='black' size='lg'
    onChange={toggleColorMode} isChecked={colorMode === 'light'? false : true} />
    <Text fontSize='10px' alignSelf='center'>dark</Text>
   

    </Flex>

  )
}

export default Header