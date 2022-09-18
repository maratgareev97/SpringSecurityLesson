package ru.services;

import ru.models.User;

import java.util.List;

public interface UserService {

    public List<User> index();
    public User getUserById(int id);
    public void saveUser(User user);
    public void updateUser(int id, User updatedUser);

    public void deleteUser(int id);

    User getUserByLogin(String username);

    User passwordCoder(User user);

}
