package com.test.registration.Student;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.beans.Transient;
import java.util.Objects;

@Service
public class StudentService {

    // inject student repository
    private final Studentrepository studentrepository;

    // constructor
    public StudentService(Studentrepository studentrepository) {
        this.studentrepository = studentrepository;
    }
    // save student
    public void saveStudent(Student student) {
        // check if email exists
        boolean emailExists = studentrepository.existsByEmail(student.getEmail());

        if (emailExists) {
            throw new IllegalStateException("Email already exists");
        }
        // save student
        studentrepository.save(student);
    }
    public void saveStudent(String name, String email, String password) {

    }
    // get student by id
    public Student getStudentById(Long id) {
        return studentrepository.findById(id).orElse(null);
    }
    // delete student by id
    public void deleteStudentById(Long id) throws IllegalAccessException {
        // check if student exists
       boolean exists = studentrepository.existsById(id);
       if(exists) {
           // delete student
           studentrepository.deleteById(id);
       }
       else {
           // throw exception
           throw new IllegalAccessException("Student with " + id + " does not found ");
       }
    }

    // get all students
    public Iterable<Student> getAllStudents() {
        return studentrepository.findAll();
    }

    // update student
    // transactional annotation to ensure that the update is atomic and not partially applied
    @Transactional
    public void updateStudent(Student student) {
        // check if student exists
        Student existingStudent = studentrepository.findById(student.getId())
                .orElseThrow(() ->
                        new IllegalStateException(
                                "Student with id " + student.getId() + " not found"));

        if (student.getName() != null
                && !student.getName().isBlank()
                && !Objects.equals(student.getName(), existingStudent.getName())) {

            existingStudent.setName(student.getName());
        }

        if (student.getEmail() != null
                && !student.getEmail().isBlank()
                && !Objects.equals(student.getEmail(), existingStudent.getEmail())) {

            if (studentrepository.existsByEmail(student.getEmail())) {
                throw new IllegalStateException("Email already exists");
            }

            existingStudent.setEmail(student.getEmail());
        }

        if (student.getPassword() != null
                && !student.getPassword().isBlank()
                && !Objects.equals(student.getPassword(), existingStudent.getPassword())) {

            existingStudent.setPassword(student.getPassword());
        }

        // No save() needed
    }


    public Student login(Student student) {

        Student dbStudent =
                studentrepository.findByEmail(student.getEmail());

        if (dbStudent != null &&
                dbStudent.getPassword().equals(student.getPassword())) {

            return dbStudent;
        }

        return null;
    }

}
