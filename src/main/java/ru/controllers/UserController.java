package ru.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.services.AuthentificationService;
import ru.services.UserService;

import java.security.Principal;

@Controller
@RequestMapping("/user")
public class UserController {
    private AuthentificationService authentificationService;

    @Autowired
    public void setUserService(AuthentificationService authentificationService) {
        this.authentificationService = authentificationService;
    }

    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public String pageForUser(Model model,Principal principal) {
        model.addAttribute("user", userService.getUserById(Math.toIntExact(userService.getUserByLogin(principal.getName()).getId())));
        return "admin/show";
    }
}