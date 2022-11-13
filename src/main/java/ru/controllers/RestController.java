package ru.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.exception.EmployeeIncorrectData;
import ru.exception.NoSuchEployeeException;
import ru.models.Role;
import ru.models.User;
import ru.services.UserService;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {
    @Autowired
    private UserService userService;

    @GetMapping("/employees")
    @CrossOrigin
    public List<User> index(Model model) {
        return userService.index();
    }

    @GetMapping("/employees/{id}")
    @CrossOrigin
    public User getEmployeer(@PathVariable int id) {
        User users = userService.getUserById(id);
        if (users == null) {
            throw new NoSuchEployeeException("Такого пользователя с " + id + " в базе нет");
        }
        return users;
    }

    @PostMapping("/employees")
    @CrossOrigin
    public ResponseEntity<EmployeeIncorrectData> create(@Valid @RequestBody User user) {
        userService.saveUser(user);
        System.out.println("noc " + user);
        return new ResponseEntity<>(HttpStatus.OK);
//        {
//            "name":"tee",
//                "age":89,
//                "username":"tee",
//                "password":"tee",
//                "email":"maratgareev97@gmail.com",
//                "roles": [
//            {
//                "id":1,
//                    "name":"ROLE_ADMIN",
//                    "authority":"ROLE_ADMIN"
//            },
//            {
//                "id":2,
//                    "name":"ROLE_USER",
//                    "authority":"ROLE_USER"
//            }
//    ]
//        }
    }

    @DeleteMapping("/delete/{id}")
    @CrossOrigin
    public User delete(@PathVariable("id") int id) {
        User users = userService.getUserById(id);
        userService.deleteUser(id);
        return users;
//        return "redirect:/admin";
    }

    @PatchMapping("/{id}")
    @CrossOrigin
    public ResponseEntity<EmployeeIncorrectData> edit(@Valid @RequestBody User user, @PathVariable("id") int id) {
        User users = userService.getUserById(id);
//        userService.saveUser(user);
        userService.updateUser(id, user);
        System.out.println("edit " + user);
        return new ResponseEntity<>(HttpStatus.OK);
    }
//    public String updateUser(@ModelAttribute("user") @Valid User user,
//                             BindingResult bindingResult,
//                             @PathVariable("id") int id,
//                             @RequestParam(name = "listRoles") Collection<Role> roles) {
//        if (bindingResult.hasErrors())
//            return "admin/edit";
//        user.setRoles(roles);
//        userService.updateUser(id, user);
//        return "redirect:/admin";
//    }

}
