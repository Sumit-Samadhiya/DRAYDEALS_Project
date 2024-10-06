const Employee = require('../models/employeeModel');

// Add Employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, mobileNo, designation, gender, courses } = req.body;
    
    // Check for duplicate email
    let employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: "Employee with this email already exists." });
    }

    // Create new employee
    const newEmployee = new Employee({
      name, email, mobileNo, designation, gender, courses, img: req.file.path
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit Employee
exports.editEmployee = async (req, res) => {
  try {
    const { name, email, mobileNo, designation, gender, courses } = req.body;
    await Employee.findByIdAndUpdate(req.params.id, {
      name, email, mobileNo, designation, gender, courses
    });
    res.json({ message: "Employee updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
