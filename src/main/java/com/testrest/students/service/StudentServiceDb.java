package com.testrest.students.service;

import com.testrest.students.model.Student;
import com.testrest.students.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("studentService")
    public class StudentServiceDb implements StudentService {

        private final StudentRepository studentRepository;

        public StudentServiceDb(StudentRepository studentRepository){
            this.studentRepository = studentRepository;
        }
        @Override
        public List<Student> getStudents() {
            return studentRepository.findAll();
        }

        @Override
        public Student getStudent(int id) {
            return studentRepository.findById(id).orElse(new Student());
        }

        @Override
        public Student addStudent(Student student)  {
            return studentRepository.save(student);
        }

        @Override
        public Student editStudent(int id, String name)  {
            Student findStudent = getStudent(id);
            findStudent.setName(name);
            return studentRepository.save(findStudent);
        }

        @Override
        public void deleteStudent(int id)  {
            studentRepository.deleteById(id);
        }

}
