package com.master.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/token")

@RequiredArgsConstructor
public class TokenController {
    @GetMapping
    public boolean isTokenValid() {
        return true;
    }
}
