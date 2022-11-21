package ru.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class TestWeb {

    @GetMapping("/")
    public String mainPage() {
        return "ttt";
    }

}
