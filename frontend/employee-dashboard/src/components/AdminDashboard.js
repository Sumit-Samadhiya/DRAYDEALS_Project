import React, { useState } from 'react';
import { Box, Button, Flex, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import AddEmployeeForm from './AddEmployeeForm';
import EmployeeList from './EmployeeList';

const AdminDashboard = () => {
  const [view, setView] = useState('list');

 
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });

  return (
    <Box>
     
      <Flex 
        as="header" 
        justify="space-between" 
        align="center" 
        p={4} 
        bg="teal.500" 
        color="white"
        boxShadow="md"
      >
        <Text fontSize="2xl" fontWeight="bold">Admin Dashboard</Text>
      </Flex>

      
      <Box p={4}>
        <Flex mb={4} justify="flex-start">
          <Button 
            onClick={() => setView('add')} 
            colorScheme="teal" 
            size={buttonSize} 
            mr={4}
          >
            Add Employee
          </Button>
          <Button 
            onClick={() => setView('list')} 
            colorScheme="blue" 
            size={buttonSize}
          >
            Show All Employees
          </Button>
        </Flex>

        
        <Box 
          borderRadius="md" 
          borderWidth={1} 
          borderColor="gray.300" 
          p={4} 
          bg="white" 
          boxShadow="sm"
        >
          {view === 'add' && <AddEmployeeForm />}
          {view === 'list' && <EmployeeList />}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
