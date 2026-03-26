package com.deysoupreet.task.management.controller;

import com.deysoupreet.task.management.entity.Task;
import com.deysoupreet.task.management.entity.User;
import com.deysoupreet.task.management.repository.TaskRepository;
import com.deysoupreet.task.management.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.List;

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

    @GetMapping
    public List<Task> getAllTasks(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) Long assignedTo) {

        if (status != null) {
            return taskRepository.findByStatus(status);
        }

        if (assignedTo != null) {
            return taskRepository.findByAssignedToId(assignedTo);
        }

        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        if (updatedTask.getAssignedTo() != null) {
            User user = userRepository.findById(updatedTask.getAssignedTo().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            task.setAssignedTo(user);
        }

        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {
        taskRepository.deleteById(id);
        return "Task deleted successfully";
    }
}