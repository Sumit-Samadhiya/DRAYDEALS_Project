import React, { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Image, useToast } from '@chakra-ui/react';
import { getEmployees, deleteEmployee } from '../services/api';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const toast = useToast();

  const fetchEmployees = async () => {
    const { data } = await getEmployees();
    setEmployees(data);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      toast({
        title: 'Employee Deleted',
        description: 'Employee has been successfully deleted.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      toast({
        title: 'Error Deleting Employee',
        description: 'There was an error deleting the employee. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <Table variant="simple" mt={8}>
      <Thead>
        <Tr>
          <Th>Image</Th>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Mobile No</Th>
          <Th>Designation</Th>
          <Th>Gender</Th>
          <Th>Courses</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {employees.map(employee => (
          <Tr key={employee._id}>
            <Td>
              {employee.img && ( 
                <Image
                  src={`http://localhost:5000/${employee.img}`} 
                  alt={employee.name}
                  boxSize="50px" 
                  objectFit="cover"
                  borderRadius="full" 
                />
              )}
            </Td>
            <Td>{employee.name}</Td>
            <Td>{employee.email}</Td>
            <Td>{employee.mobileNo}</Td>
            <Td>{employee.designation}</Td>
            <Td>{employee.gender}</Td>
            <Td>{employee.courses.join(', ')}</Td>
            <Td>
              <Button colorScheme="blue" mr={2} as={Link} to={`/edit/${employee._id}`}>
                Edit
              </Button>
              <Button colorScheme="red" onClick={() => handleDelete(employee._id)}>
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default EmployeeList;
