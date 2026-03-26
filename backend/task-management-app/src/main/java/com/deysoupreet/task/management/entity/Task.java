package com.deysoupreet.task.management.entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table (name = "tasks")
public class Task {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String status;

    @ManyToOne
    @JoinColumn (name = "assigned_to")
    private User assignedTo;

    @ManyToOne
    @JoinColumn (name = "created_by")
    private User createdBy;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt = LocalDateTime.now();
}
