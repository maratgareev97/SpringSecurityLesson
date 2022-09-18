package ru.dao;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import ru.models.User;

import java.util.List;

public interface UserDAO {
    public List<User> index();
    public User getUserById(int id);
    public void saveUser(User user);
    public void updateUser(int id, User updatedUser);
    public void deleteUser(int id);

    User getUserByLogin(String username);
}
