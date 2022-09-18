package ru.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.models.Role;
import ru.models.User;
import ru.dao.AuthUserRepository;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class AuthentificationService implements UserDetailsService {
    private AuthUserRepository authUserRepository;

    @Autowired
    public void setUserRepository(AuthUserRepository authUserRepository) {
        this.authUserRepository = authUserRepository;
    }
//-----------------------------------------------------------------------------------------------------------------------
    public User findByUsername(String username) {
        System.out.println("-----" + authUserRepository.findByUsername(username)+ "   ---   " );
        System.out.println(authUserRepository.findByUsername(username).getRoles().toString());

        return authUserRepository.findByUsername(username);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(String.format("User '%s' not found", username));
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), mapRolesToAuthorities(user.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles) {
        return roles.stream().map(r -> new SimpleGrantedAuthority(r.getName())).collect(Collectors.toList());
    }
//    ----------------------------------------------------------------------------------------------------
}





























