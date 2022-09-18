package ru.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.models.User;

@Repository
public interface AuthUserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

