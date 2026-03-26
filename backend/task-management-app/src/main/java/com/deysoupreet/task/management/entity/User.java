package com.deysoupreet.task.management.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String email;

    private String passwordHash;

    private String Role;

    private LocalDateTime createdAt = LocalDateTime.now();
    
}