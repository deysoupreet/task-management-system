package com.deysoupreet.task.management.controller;

import com.deysoupreet.task.management.entity.Task;
import com.deysoupreet.task.management.entity.User;
import com.deysoupreet.task.management.repository.TaskRepository;
import com.deysoupreet.task.management.repository.UserRepository;
import com.deysoupreet.task.management.util.SecurityUtil;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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

        String email = SecurityUtil.getLoggedInUserEmail();

        if (task.getAssignedTo() != null &&
                !task.getAssignedTo().getEmail().equals(email)) {
            throw new RuntimeException("Not authorized to update this task");
        }

        task.setTitle(updatedTask.getTitle());
        task.setDescription(updatedTask.getDescription());
        task.setStatus(updatedTask.getStatus());

        return taskRepository.save(task);
    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        String email = SecurityUtil.getLoggedInUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean isAdmin = user.getRole().equals("ADMIN");
        boolean isCreator = task.getCreatedBy().getEmail().equals(email);

        if (!isAdmin && !isCreator) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to delete this task");
        }

        taskRepository.delete(task);
        return "Task deleted successfully";
    }
}