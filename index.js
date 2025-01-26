// Import the 'readline' module for user interaction
const readline = require("readline");

// Base Class: Person (Abstraction)
class Person {
  constructor(name, id) {
    this.name = name;
    this.id = id;
  }

  getDetails() {
    return `Name: ${this.name}, ID: ${this.id}`;
  }
}

// Derived Class: Student (Inheritance)
class Student extends Person {
  constructor(name, id) {
    super(name, id);
    this.grades = [];
  }

  addGrade(grade) {
    this.grades.push(grade);
  }

  getGrades() {
    return this.grades;
  }

  calculateAverageGrade() {
    if (this.grades.length === 0) return "No grades available.";
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return (sum / this.grades.length).toFixed(2);
  }

  getDetails() {
    const baseDetails = super.getDetails();
    const averageGrade = this.calculateAverageGrade();
    return `${baseDetails}, Average Grade: ${averageGrade}`;
  }
}

// Student Management System
class StudentManagementSystem {
  constructor() {
    this.students = [];
  }

  addStudent(name, id) {
    const student = new Student(name, id);
    this.students.push(student);
    return `Student added: ${name} (ID: ${id})`;
  }

  viewStudentDetails(id) {
    const student = this.students.find((student) => student.id === id);
    if (!student) return `Student with ID ${id} not found.`;
    return student.getDetails();
  }

  addGradeToStudent(id, grade) {
    const student = this.students.find((student) => student.id === id);
    if (!student) return `Student with ID ${id} not found.`;
    student.addGrade(grade);
    return `Grade ${grade} added to student ID ${id}.`;
  }
}

// Initialize the system
const system = new StudentManagementSystem();

// Set up the CLI interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Display the menu
function showMenu() {
  console.log("\n--- Student Management System ---");
  console.log("1. Add Student");
  console.log("2. View Student Details");
  console.log("3. Add Grade to Student");
  console.log("4. Exit");
  console.log("----------------------------------");

  rl.question("Choose an option (1-4): ", handleUserChoice);
}

// Handle user input
function handleUserChoice(choice) {
  switch (choice) {
    case "1": // Add Student
      rl.question("Enter student name: ", (name) => {
        rl.question("Enter student ID: ", (id) => {
          console.log(system.addStudent(name, id));
          showMenu();
        });
      });
      break;

    case "2": // View Student Details
      rl.question("Enter student ID to view details: ", (id) => {
        console.log(system.viewStudentDetails(id));
        showMenu();
      });
      break;

    case "3": // Add Grade to Student
      rl.question("Enter student ID: ", (id) => {
        rl.question("Enter grade to add: ", (grade) => {
          console.log(system.addGradeToStudent(id, parseFloat(grade)));
          showMenu();
        });
      });
      break;

    case "4": // Exit
      console.log("Exiting the system. Goodbye!");
      rl.close();
      break;

    default:
      console.log("Invalid choice. Please try again.");
      showMenu();
      break;
  }
}

// Start the CLI
showMenu();
