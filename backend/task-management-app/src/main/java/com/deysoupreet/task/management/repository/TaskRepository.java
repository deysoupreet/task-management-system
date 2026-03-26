package com.deysoupreet.task.management.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.deysoupreet.task.management.entity.Task;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStatus(String status);

    List<Task> findByAssignedToId(Long userId);
}
