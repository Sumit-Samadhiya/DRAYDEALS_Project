import React, { useState } from 'react';
import { Box, Input, Button, FormControl, FormLabel, CheckboxGroup, Stack, Checkbox } from '@chakra-ui/react';

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (username === 'admin' && password === 'password') {  // For simplicity, you can replace this with actual authentication logic
      onLogin();
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <Box maxW="sm" mx="auto" mt={8}>
      <form onSubmit={handleLogin}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button colorScheme="teal" mt={6} type="submit">Login</Button>
      </form>


      
    </Box>
  );
};

export default LoginPage;
