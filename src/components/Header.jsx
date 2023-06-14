import React from 'react'
import { Box, Flex, Avatar, HStack, IconButton, useDisclosure, useColorModeValue, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    let LoginData = JSON.parse(localStorage.getItem("loggedInUser"))

    const handleSubmit = () => {
        navigate("/login")
        localStorage.setItem("loggedInUser", null)
    }

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <IconButton
                    size={'md'}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems={'center'}>
                    <Box>EMI Calculator</Box>
                </HStack>
                <Flex alignItems={'center'}>
                    {LoginData ?
                        <>
                            <Box textTransform="uppercase" mr="15">WEL COME &nbsp;"{LoginData.useremail}"</Box>
                            <Button mr="15" colorScheme="red" onClick={handleSubmit}> Logout </Button>
                        </>
                        : ""}
                    <Avatar
                        size={'sm'}
                        src={'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'}
                    />
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header