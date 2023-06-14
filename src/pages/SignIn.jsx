import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const SignIn = () => {

    const [form, SetForm] = useState({ userid: '', useremail: '', userpassword: '' });
    const navigate = useNavigate()

    const handleSubmit = () => {
        const id = Date.now()
        const userData = JSON.parse(localStorage.getItem('user'));

        if ((form.useremail !== '' && form.useremail !== undefined && form.useremail !== null) && (form.userpassword !== '' && form.userpassword !== undefined && form.userpassword !== null)) {
            if (userData !== null) {
                const userInStorage = userData.find(item => item.useremail.toLowerCase() === form.useremail.toLowerCase())

                if (userInStorage === undefined) {
                    userData.push({ ...form, userid: id })
                    localStorage.setItem('user', JSON.stringify(userData))
                    localStorage.setItem('loggedInUser', JSON.stringify({ ...form, userid: id }))
                    alert("successfully user add")
                    SetForm({ useremail: '', userpassword: '' });
                    navigate("/")

                } else {
                    alert("user already exists");
                    SetForm({ useremail: '', userpassword: '' });
                }
            } else {
                let arr = [];
                arr.push({ ...form, userid: id })
                localStorage.setItem('user', JSON.stringify(arr))
                localStorage.setItem('loggedInUser', JSON.stringify({ ...form, userid: id }))
                alert("successfully user add")
                SetForm({ useremail: '', userpassword: '' });
                navigate("/")
            }
        } else {
            alert("Field can't be blank")
        }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        SetForm({ ...form, [evt.target.name]: value });
    }

    return (
        <>
            <Box p={4}>
                <Container maxW="xl" py={8}>
                    <FormControl>
                        <FormLabel>Email address</FormLabel>
                        <Input name="useremail" value={form.useremail} onChange={(e) => handleChange(e)} type='email' />
                    </FormControl>
                    <FormControl mt="15px">
                        <FormLabel>Password</FormLabel>
                        <Input name="userpassword" value={form.userpassword} onChange={(e) => handleChange(e)} type='password' />
                    </FormControl>
                    <Button mt="15px" colorScheme='blue' onClick={handleSubmit}>SignIn</Button>
                    <Text mt="15px">Already have an account? <Link to="/login">Log in</Link></Text>
                </Container>
            </Box>
        </>
    )
}

export default SignIn