package ru.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.models.Role;

public interface AuthRoleRepository extends JpaRepository<Role, Long> {
//    Role findByUsername(Long id);
}
