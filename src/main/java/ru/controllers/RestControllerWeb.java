package ru.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.dao.UserDAOImpl;
import ru.models.Role;
import ru.models.User;
import ru.services.AuthentificationService;
import ru.services.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;

@Controller
@RequestMapping("/rest")
public class RestControllerWeb {
    private AuthentificationService authentificationService;
    //    String[] role = new String[]{"", "Admin", "User"};
    ArrayList<String> role = new ArrayList<String>();

    @Autowired
    public void setUserService(AuthentificationService authentificationService) {
        this.authentificationService = authentificationService;
    }

    @Autowired
    private UserService userService;

    @GetMapping()
    @CrossOrigin
    public String index(Model model) {
        User user;
        model.addAttribute("user", userService.index());
        return "rest/index";
    }


    @GetMapping("/test")
    @CrossOrigin
    public String test() {
//        model.addAttribute("user", userService.index());
        return "rest/test";
    }
}