package ru.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.dao.UserDAO;
import ru.dao.UserDAOImpl;
import ru.models.Role;
import ru.models.User;
import ru.services.AuthentificationService;
import ru.services.UserService;

import javax.validation.Valid;
import java.util.Collection;

@Controller
@RequestMapping("/admin")
public class AdminController {
    private AuthentificationService authentificationService;

    @Autowired
    public void setUserService(AuthentificationService authentificationService) {
        this.authentificationService = authentificationService;
    }

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private UserDAOImpl userDAOImpl;

    @Autowired
    private UserService userService;

    @GetMapping()
    public String index(Model model) {
        model.addAttribute("user", userService.index());
        return "admin/index";
    }

    @GetMapping("/{id}")
    public String getUserById(@PathVariable("id") int id, Model model) {
        model.addAttribute("user", userService.getUserById(id));
        return "admin/show";
    }

    @GetMapping("/new")
    public String newUser(@ModelAttribute("user") User user) {

        return "admin/new";
    }

    @PostMapping()
    public String create(@ModelAttribute("user") @Valid User user,
                         BindingResult bindingResult, @RequestParam("listRoles") Collection<Role> roles) {

        user.setRoles(roles);
        userService.saveUser(user);

        System.out.println("!!!!!!!!!!!!!!!!!!!!1" + user + "    " + roles);
        System.out.println("Добавил  " + user);
        return "redirect:/admin";
    }


    @GetMapping("/edit")
    public String edit(Model model, @RequestParam("id") String id) {
        System.out.println("edit: " + id);
        model.addAttribute("user", userService.getUserById(Integer.parseInt(id)));
        System.out.println("Good   " + Integer.parseInt(id));
        return "admin/edit";
    }

    @PatchMapping("/{id}")
    public String updateUser(@ModelAttribute("user") @Valid User user, BindingResult bindingResult,
                             @PathVariable("id") int id,
                             @RequestParam(name = "listRoles") Collection<Role> roles) {

        if (bindingResult.hasErrors())
            return "admin/edit";
//        System.out.println("!!!!!!!!!!!!!!!!!!!!!!");

        user.setRoles(roles);
        userService.updateUser(id, user);
        System.out.println("-----------------------------------------------     " + user.getRoles());
        return "redirect:/admin";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {

        userService.deleteUser(id);
        System.out.println("userService.deleteUser(id);+++++++++++++");
        return "redirect:/admin";
    }

//    @GetMapping("/authenticated")
//    public String pageAuthoticatedUsers(Principal principal) {
//        User user = authentificationService.findByUsername(principal.getName());
//        return "sequred part of web service  " + user.getName() + "  " + user.getEmail();
//    }
//
//    @GetMapping("/read_profiles")
//    public String pageForReadProfiles() {
//        return "read profiles page  ";
//    }
//
//    @GetMapping("/only_for_admins")
//    public String pageOnlyForAdmins() {
//        return "admin page  ";
//    }
}
