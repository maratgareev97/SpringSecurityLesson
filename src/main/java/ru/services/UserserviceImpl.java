package ru.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.dao.UserDAO;
import ru.models.Role;
import ru.models.User;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserserviceImpl implements UserService {
    @Autowired
    private UserDAO userDAO;

    private final PasswordEncoder passwordEncoder;

    public UserserviceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User passwordCoder(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return user;
    }

    @Override
    public List<User> index() {
        System.out.println("userdao     " + userDAO.index());
        return userDAO.index();
    }

    @Override
    public User getUserById(int id) {
        return userDAO.getUserById(id);
    }

    @Override
    public void saveUser(User user) {
        userDAO.saveUser(passwordCoder(user));
    }

    @Override
    public void updateUser(int id, User updatedUser) {
        userDAO.updateUser(id, passwordCoder(updatedUser));
    }

    @Override
    public void deleteUser(int id) {
        userDAO.deleteUser(id);
    }

    @Override
    public User getUserByLogin(String username) {
        return userDAO.getUserByLogin(username);
    }

    @Override
    public List<Role> showRole() {
        return userDAO.showRole();
    }

    @Override
    public ArrayList<String> roleList() {
        ArrayList<String> role = new ArrayList<String>();
        role.add("");
        int count = 0;
        for (int i = 0; i < userDAO.showRole().size(); i++) {
            count++;
            if (count != 0) {
                role.add(userDAO.showRole().get(i).toString().substring(5, userDAO.showRole().get(i).toString().length()));
            }
        }
//        role.remove(0);
        return role;
    }

}