import { Box, Button, Container, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [form, SetForm] = useState({ useremail: '', userpassword: '' });

    const handleSubmit = (e) => {


        if (form.useremail === '' || form.userpassword === '') {
            alert("Field can't be blank")
        }
        else {
            const LoginData = JSON.parse(localStorage.getItem("user"))
            if (LoginData !== null) {
                const findData = LoginData.find(item => item.useremail === form.useremail);

                if (findData === undefined) {
                    alert("user is not found")
                }
                else {
                    if (form.userpassword === findData.userpassword) {
                        navigate("/")
                        localStorage.setItem('loggedInUser', JSON.stringify(findData))
                    }
                    else {
                        alert("password is wrong")
                    }
                }
            } else {
                alert("User is not found! Please Register your mail ID")
            }
        }
    }

    function handleChange(evt) {
        const value = evt.target.value;
        SetForm({ ...form, [evt.target.name]: value });
    }

    return (
        <Container maxW="xl" py={8}>
            <FormControl>
                <FormLabel>Email address</FormLabel>
                <Input name="useremail" value={form.useremail} onChange={(e) => handleChange(e)} type='email' />
            </FormControl>
            <FormControl mt="15px">
                <FormLabel>Password</FormLabel>
                <Input name="userpassword" value={form.userpassword} onChange={(e) => handleChange(e)} type='password' />
            </FormControl>
            <Box mt="15px" justifyContent="space-between" alignItems="center" display="flex">
                <Button colorScheme='blue' onClick={handleSubmit}>Login</Button>
                <div>
                    New User ? <Link to="/signin">Sign In</Link>
                </div>
            </Box>
        </Container>
    )
}

export default Login