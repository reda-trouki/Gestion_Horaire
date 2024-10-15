package com.master.controllers;

import com.master.Services.EnseignantService;
import com.master.auth.AuthenticationService;
import com.master.auth.RegistreRequest;
import com.master.models.Enseignant;
import com.master.models.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Objects;

@RestController
@RequestMapping("/api/Enseignants")
public class EnseignantController {
    private final EnseignantService enseignantService;
    private final PasswordEncoder passwordEncoder;
    public EnseignantController(EnseignantService EnseignantService, EnseignantService enseignantService, PasswordEncoder passwordEncoder, AuthenticationService service, PasswordEncoder passwordEncoder1) {
        this.enseignantService = enseignantService;
        this.passwordEncoder = passwordEncoder1;
    }

    @GetMapping
    public ResponseEntity<Enseignant> getUserDetails() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        Enseignant user = enseignantService.findByEmail(email);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addEnseignant(@RequestBody Enseignant enseignant){
        return enseignantService.addEnseignant(enseignant);
    }
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<?> deleteEnseignant(@PathVariable String email){
        return ResponseEntity.ok(enseignantService.deleteEnseignant(email));
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateEnseignant(@RequestBody Enseignant enseignant){
        return enseignantService.updateEnseignant(enseignant);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getEnseignants(){
        return ResponseEntity.ok(this.enseignantService.getEnseignants());
    }
    @GetMapping("/count")
    public ResponseEntity<?> countEnseignants(){
        return ResponseEntity.ok(this.enseignantService.countEnseignants());
    }
    @GetMapping("/{email}/modules")
    public ResponseEntity<?> getModules(@PathVariable String email){
        return ResponseEntity.ok(this.enseignantService.getModules(email));
    }
    @GetMapping("/{email}/interventions")
    public ResponseEntity<?> getInterventions(@PathVariable String email){
        return ResponseEntity.ok(this.enseignantService.getInterventions(email));
    }



}
