package com.testrest.students.model;

import jakarta.persistence.*;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import java.util.Objects;

@Entity
@Table(name = "students")
@XmlAccessorType(XmlAccessType.FIELD)
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // Integer вместо int чтобы разрешить null при POST (Spring сам сгенерирует ID через JPA)

    @Column(name = "name")
    @XmlElement(name = "name")
    private String name;

    public Student() {
    }

    public Student(Integer id, String name) {
        this.id = id;
        this.name = name;
    }
    public Integer getId() {return id;}
    public void setId(Integer id) {this.id = id;}
    public String getName(){return name;}
    public void setName(String name){this.name = name;}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Student student = (Student) o;
        // Сравнение Integer безопасно - вернётся false если один null а другой нет
        return id.equals(student.id);
    }

    @Override
    public int hashCode() {return Objects.hash(id);}
}
