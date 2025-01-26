// Base Class: Person (Abstraction)
class Person {
    constructor(name, id) {
      this.name = name;
      this.id = id;
    }
  
    // Method to display basic details
    getDetails() {
      return `Name: ${this.name}, ID: ${this.id}`;
    }
  }
  
  // Derived Class: Student (Inheritance)
  class Student extends Person {
    constructor(name, id) {
      super(name, id); // Inheriting properties and methods from Person
      this.grades = []; // Encapsulation: Storing grades privately in an array
    }
  
    // Add a grade for the student
    addGrade(grade) {
      if (typeof grade !== "number" || grade < 0 || grade > 100) {
        console.log(`Invalid grade: ${grade}. Please provide a number between 0 and 100.`);
        return;
      }
      this.grades.push(grade);
    }
  
    // Get all grades
    getGrades() {
      return this.grades;
    }
  
    // Calculate the average grade (Polymorphism: Extending functionality)
    calculateAverageGrade() {
      if (this.grades.length === 0) {
        return "No grades available.";
      }
      const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
      return (sum / this.grades.length).toFixed(2); // Average with 2 decimal places
    }
  
    // Override getDetails to include average grade
    getDetails() {
      const baseDetails = super.getDetails();
      const averageGrade = this.calculateAverageGrade();
      return `${baseDetails}, Average Grade: ${averageGrade}`;
    }
  }
  
  // Student Management System
  class StudentManagementSystem {
    constructor() {
      this.students = []; // Array to store all students
    }
  
    // Add a new student
    addStudent(name, id) {
      const existingStudent = this.students.find((student) => student.id === id);
      if (existingStudent) {
        console.log(`A student with ID ${id} already exists.`);
        return;
      }
  
      const student = new Student(name, id);
      this.students.push(student);
      console.log(`Student added: ${name} (ID: ${id})`);
    }
  
    // View details of a specific student by ID
    viewStudentDetails(id) {
      const student = this.students.find((student) => student.id === id);
      if (!student) {
        console.log(`Error: Student with ID ${id} not found.`);
        return;
      }
      console.log(student.getDetails());
    }
  
    // Add a grade for a specific student
    addGradeToStudent(id, grade) {
      const student = this.students.find((student) => student.id === id);
      if (!student) {
        console.log(`Error: Student with ID ${id} not found.`);
        return;
      }
      student.addGrade(grade);
      console.log(`Grade ${grade} added to student ID ${id}.`);
    }
  }
  
  // --- TESTING THE SYSTEM ---
  
  const system = new StudentManagementSystem();
  
  // Adding students
  system.addStudent("kingsley", 101);
  system.addStudent("mamah", 102);
  
  // Adding grades
  system.addGradeToStudent(101, 85);
  system.addGradeToStudent(101, 90);
  system.addGradeToStudent(102, 78);
  
  // Viewing student details
  system.viewStudentDetails(101); // Output: Name: Alice, ID: 101, Average Grade: 87.50
  system.viewStudentDetails(102); // Output: Name: Bob, ID: 102, Average Grade: 78.00
  
  // Handling a student with no grades
  system.addStudent("mamah", 103);
  system.viewStudentDetails(103); // Output: Name: Charlie, ID: 103, Average Grade: No grades available.
  
  // Handling duplicate student IDs
  system.addStudent("kingsley", 101); // Error: A student with ID 101 already exists.
  
  // Handling invalid grades
  system.addGradeToStudent(101, -10); // Error: Invalid grade
  system.addGradeToStudent(101, 105); // Error: Invalid grade
  system.addGradeToStudent(104, 85); // Error: Student with ID 104 not found.
  