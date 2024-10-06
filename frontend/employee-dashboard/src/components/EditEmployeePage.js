import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Stack,
  Text,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployees, editEmployee } from '../services/api';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: [],
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const { data } = await getEmployees();
        const employee = data.find(emp => emp._id === id);
        setFormData(employee);
      } catch (error) {
        toast({
          title: 'Error fetching employee data',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchEmployee();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxGroupChange = (selectedValues) => {
    setFormData((prev) => ({ ...prev, courses: selectedValues }));
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editEmployee(id, formData);
      toast({
        title: 'Success!',
        description: 'Employee updated successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error updating employee',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={5} borderWidth={2} borderRadius="lg" boxShadow="lg" bg="white">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Edit Employee
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired mb={4}>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter employee's name"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter employee's email"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Mobile No</FormLabel>
          <Input
            name="mobileNo"
            type="tel"
            value={formData.mobileNo}
            onChange={handleInputChange}
            placeholder="Enter mobile number"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }}
          />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Designation</FormLabel>
          <Select
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            placeholder="Select Designation"
            _hover={{ borderColor: 'teal.400' }}
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </Select>
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup value={formData.gender} onChange={handleGenderChange}>
            <Stack direction="row">
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Stack mt="4">
          <label>Courses</label>
          <CheckboxGroup value={formData.courses} onChange={handleCheckboxGroupChange}>
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox value="MCA">MCA</Checkbox>
              <Checkbox value="BCA">BCA</Checkbox>
              <Checkbox value="BSC">BSC</Checkbox>
            </Stack>
          </CheckboxGroup>
          </Stack>
        

        <Button colorScheme="teal" mt={6} type="submit" width="full">
          Update Employee
        </Button>
      </form>
    </Box>
  );
};

export default EditEmployeePage;
