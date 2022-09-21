package ru.services;

import ru.models.User;

import java.util.List;

public interface UserService {

    List<User> index();
    User getUserById(int id);
    void saveUser(User user);
    void updateUser(int id, User updatedUser);
    void deleteUser(int id);
    User getUserByLogin(String username);
    User passwordCoder(User user);

}
