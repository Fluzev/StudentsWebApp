package com.testrest.students.service;

import com.testrest.students.model.Student;

import java.util.List;

public interface StudentService {

    List<Student> getStudents() ;
    Student getStudent(int id) ;
    Student addStudent(Student student) ;
    Student editStudent(int id, String name) ;

    void deleteStudent(int id) ;
}
