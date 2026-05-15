package com.testrest.students.service;

import com.testrest.students.model.Student;
import com.testrest.students.model.StudentList;
import org.springframework.stereotype.Service;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.List;

@Service
public class StudentServiceXml implements StudentService {

    private static final String FILE_PATH = "E:\\Git_Repositories\\TestRest\\students\\src\\main\\resources\\students.xml";

    @Override
    public List<Student> getStudents() {
            return getStudentList().getStudents();
    }

    @Override
    public Student getStudent(int id) {
        List<Student> students = getStudents();
        return students.stream()
                .filter(student -> student.getId() == id)
                .findFirst()
                .orElse(new Student());
    }

    @Override
    public Student addStudent(Student student) {
        StudentList studentList = getStudentList();
        studentList.getStudents().add(student);
        save(studentList);
        return student;
    }

    @Override
    public Student editStudent(int id, String name) {
        StudentList studentList = getStudentList();
        Student findStudent = studentList.getStudents().stream()
                .filter(student -> student.getId() == id)
                .findFirst()
                .orElse(null);
        if (findStudent == null) {
            return new Student();
        }
        findStudent.setName(name);
        save(studentList);
        return findStudent;
    }

    @Override
    public void deleteStudent(int id) {
        StudentList studentList = getStudentList();
        Student findStudent = studentList.getStudents().stream()
                .filter(student -> student.getId() == id)
                .findFirst()
                .orElse(null);
        if (findStudent != null) {
            studentList.getStudents().remove(findStudent);
            save(studentList);
        }
    }


    private StudentList getStudentList() {
        try {
            File file = new File(FILE_PATH);
            JAXBContext context = JAXBContext.newInstance(StudentList.class);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            return (StudentList) unmarshaller.unmarshal(file);
        } catch (JAXBException e) {
            throw new RuntimeException("Failed to read student list from XML", e);
        }
    }

    private void save(StudentList studentList) {
        try {
            File file = new File(FILE_PATH);
            JAXBContext context = JAXBContext.newInstance(StudentList.class);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            marshaller.marshal(studentList, file);
        } catch (JAXBException e) {
            throw new RuntimeException("Failed to save student list to XML", e);
        }
    }

}
