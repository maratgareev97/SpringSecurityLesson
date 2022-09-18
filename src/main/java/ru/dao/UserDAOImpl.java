package ru.dao;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.models.Role;
import ru.models.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;

@Component
@Repository
public class UserDAOImpl implements UserDAO {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<User> index() {
        List<User> users = new ArrayList<>();
//        List<Role> roles = new ArrayList<>();
        try {
            TypedQuery<User> entity = entityManager.createQuery("SELECT u from User u", User.class);
            users = entity.getResultList();

//            System.out.println("users  " + users);

        } catch (Exception e) {
            e.printStackTrace();
        }
        return users;
    }

    @Override
    public User getUserById(int id) {

        User user = null;

        List<User> userList = new ArrayList<>();

        TypedQuery<User> entity = entityManager.createQuery("select p from User p where p.id = :id", User.class);


        entity.setParameter("id", Long.valueOf(id));

        userList = entity.getResultList();

        user = new User();
        user.setId(userList.get(0).getId());
        user.setName(userList.get(0).getName());
        user.setEmail(userList.get(0).getEmail());
        user.setAge(userList.get(0).getAge());
        user.setUsername(userList.get(0).getUsername());
        user.setPassword(userList.get(0).getPassword());
        user.setRoles(userList.get(0).getRoles());

        System.out.println("UserDAOImpl user:   " + user);
//        user.setRoles(userList.get(0).getRoles());

        return user;

    }

    @Override
    @Transactional
    public void saveUser(User user) {

        user.setName(user.getName());
        user.setAge(user.getAge());
        user.setEmail(user.getEmail());
        user.setUsername(user.getUsername());
        user.setPassword(user.getPassword());
        user.setRoles(user.getRoles());
//        user.setRoles_string("USER" + user.getRoles_string());

//        user.setPassword("111");
//        user.setUsername("name");


        System.out.println(user + "           ----");

        entityManager.persist(user);
        entityManager.flush();
    }

    @Override
    @Transactional
    public void updateUser(int id, User updatedUser) {
        System.out.println(updatedUser.getId() + "  !!!!!!!!!!!!!!!!!!!!! " + id);
        updatedUser.setName(updatedUser.getName());
        updatedUser.setAge(updatedUser.getAge());
        updatedUser.setEmail(updatedUser.getEmail());
        updatedUser.setUsername(updatedUser.getUsername());
        updatedUser.setPassword(updatedUser.getPassword());

//        updatedUser.setRoles(updatedUser.getRoles());

        entityManager.merge(updatedUser);
        entityManager.flush();
        System.out.println("updatedUser    " + updatedUser);
    }

    @Override
    @Transactional
    public void deleteUser(int id) {
        User user = entityManager.find(User.class, Long.valueOf(id));
        System.out.println(user + " kkkkkkkkkkkk");
        entityManager.remove(user);
        entityManager.flush();

    }


    @Override
    public User getUserByLogin(String username) {
        TypedQuery<User> q = (entityManager.createQuery("select u from User u " +
                "join fetch u.roles where u.username = :username", User.class));
        q.setParameter("username", username);
        return q.getResultList().stream().findFirst().orElse(null);
    }
}
