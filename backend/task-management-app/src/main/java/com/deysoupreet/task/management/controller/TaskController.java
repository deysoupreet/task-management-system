package com.deysoupreet.task.management.controller;

import com.deysoupreet.task.management.entity.Task;
import com.deysoupreet.task.management.entity.User;
import com.deysoupreet.task.management.repository.TaskRepository;
import com.deysoupreet.task.management.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskController(TaskRepository taskRepository,
                          UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @PostMapping
    public Task createTask(@RequestBody Task task) {

        Optional<User> userOpt = userRepository.findById(task.getCreatedBy().getId());

        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        task.setCreatedBy(userOpt.get());
        if (task.getStatus() == null) {
            task.setStatus("TODO");
        }

        return taskRepository.save(task);
    }
}