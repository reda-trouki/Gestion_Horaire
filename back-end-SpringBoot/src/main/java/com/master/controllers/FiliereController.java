package com.master.controllers;

import com.master.Services.FiliereService;
import com.master.models.Filiere;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/filieres")
public class FiliereController {
    public final FiliereService filiereService;

    public FiliereController(FiliereService filiereService) {
        this.filiereService = filiereService;
    }

    @GetMapping
    public ResponseEntity<?> getFilieres(){
        return ResponseEntity.ok(this.filiereService.getFilieres());
    }
    @PostMapping
    public ResponseEntity<?> addFiliere(@RequestBody Filiere filiere){
        return this.filiereService.addFiliere(filiere);
    }
    @PutMapping
    public ResponseEntity<?> updateFiliere(@RequestBody Filiere filiere){
        return this.filiereService.updateFiliere(filiere);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFiliere(@PathVariable Long id){
        return this.filiereService.deleteFiliere(id);
    }

    @GetMapping("/count")
    public ResponseEntity<?> countFilieres(){
        return ResponseEntity.ok(this.filiereService.countFilieres());
    }

    @GetMapping("/{id}/modules/total-hours")
    public ResponseEntity<?> getModulesTotalHoursByFiliereId(@PathVariable Long id){
        return ResponseEntity.ok(this.filiereService.getModulesTotalHoursByFiliereId(id));
    }

}
