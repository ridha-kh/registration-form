package com.test.registration.Student;

import org.springframework.data.jpa.repository.JpaRepository;

// interface to interact with database
public interface Studentrepository extends JpaRepository<Student, Long> {


    boolean existsByEmail(String email);
    boolean existsByName(String name);
    boolean existsByNameAndEmail(String name, String email);

    Student findByEmail(String email);
}
