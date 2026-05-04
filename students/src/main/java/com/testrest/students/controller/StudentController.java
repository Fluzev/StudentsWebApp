package com.testrest.students.controller;

import com.testrest.students.model.Student;
import com.testrest.students.service.StudentServiceDb;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentServiceDb studentService;

    public StudentController(StudentServiceDb studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public List<Student> getStudents()  {return studentService.getStudents();}

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id)  {return studentService.getStudent(id);}

    @PostMapping
    public Student addStudent(@RequestBody Student student)  {return studentService.addStudent(student);}

    @PutMapping
    public Student editStudent(@PathVariable int id, @RequestBody String name)  {return studentService.editStudent(id, name);}

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable int id)  {studentService.deleteStudent(id);}
}
