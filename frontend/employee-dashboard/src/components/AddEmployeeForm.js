import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Input,
  Button,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Stack,
  FormControl,
  FormLabel,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { addEmployee } from '../services/api';

const AddEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNo: '',
    designation: '',
    gender: '',
    courses: [],
    img: null,
  });
  const navigate=useNavigate()

  const toast = useToast();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxGroupChange = (selectedValues) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      courses: selectedValues,
    }));
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  const handleGenderChange = (value) => {
    setFormData({ ...formData, gender: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'courses') {
        employeeFormData.append(key, JSON.stringify(formData[key]));
      } else {
        employeeFormData.append(key, formData[key]);
      }
    });

    try {
      await addEmployee(employeeFormData);
      toast({
        title: 'Success!',
        description: 'Employee added successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        mobileNo: '',
        designation: '',
        gender: '',
        courses: [],
        img: null,
      });
    } catch (error) {
      toast({
        title: 'Error!',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={8} p={5} borderWidth={3} borderRadius="lg" boxShadow="xl">
      <Heading as="h2" size="lg" mb={4} textAlign="center">
        Add Employee
      </Heading>
      <Text mb={4} textAlign="center" color="gray.600">
        Fill in the details below to add a new employee.
      </Text>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Enter employee's name"
            onChange={handleInputChange}
            _hover={{ borderColor: 'teal.400' }} // Hover effect
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }} // Focus effect
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter employee's email"
            onChange={handleInputChange}
            _hover={{ borderColor: 'teal.400' }} // Hover effect
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }} // Focus effect
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Mobile No</FormLabel>
          <Input
            name="mobileNo"
            type="tel"
            placeholder="Enter mobile number"
            onChange={handleInputChange}
            _hover={{ borderColor: 'teal.400' }} // Hover effect
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }} // Focus effect
          />
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Designation</FormLabel>
          <Select
            name="designation"
            onChange={handleInputChange}
            _hover={{ borderColor: 'teal.400' }} // Hover effect
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }} // Focus effect
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </Select>
        </FormControl>

        <FormControl isRequired mt={4}>
          <FormLabel>Gender</FormLabel>
          <RadioGroup value={formData.gender} onChange={handleGenderChange}>
            <Stack direction={['column', 'row']} spacing={5}>
              <Radio value="Male" colorScheme="teal">Male</Radio>
              <Radio value="Female" colorScheme="teal">Female</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Stack mt={4}>
          <FormLabel>Courses</FormLabel>
          <CheckboxGroup
            colorScheme="green"
            value={formData.courses}
            onChange={handleCheckboxGroupChange}
          >
            <Stack spacing={[1, 5]} direction={['column', 'row']}>
              <Checkbox value="MCA" colorScheme="green">MCA</Checkbox>
              <Checkbox value="BCA" colorScheme="green">BCA</Checkbox>
              <Checkbox value="BSC" colorScheme="green">BSC</Checkbox>
            </Stack>
          </CheckboxGroup>
        </Stack>

        <FormControl isRequired mt={4}>
          <FormLabel>Profile Image</FormLabel>
          <Input
            type="file"
            name="img"
            accept="image/png, image/jpg"
            onChange={handleFileChange}
            _hover={{ borderColor: 'teal.400' }} // Hover effect
            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.300' }} // Focus effect
          />
        </FormControl>

        <Button colorScheme="teal" mt={6} type="submit" width="full">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployeeForm;
