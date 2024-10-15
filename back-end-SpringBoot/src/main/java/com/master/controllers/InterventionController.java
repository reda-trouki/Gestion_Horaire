package com.master.controllers;

import com.master.Services.InterventionService;
import com.master.models.InterventionID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/interventions")
public class InterventionController {
    private final InterventionService interventionService;

    public InterventionController(InterventionService interventionService) {
        this.interventionService = interventionService;
    }

    @GetMapping
    public ResponseEntity<?> getInterventions(){
        return ResponseEntity.ok(this.interventionService.getInterventions());
    }
    @PostMapping
    public ResponseEntity<?> addModule(@RequestBody InterventionRquest interv, String  idModule, String idEnseignant){
        return interventionService.add(interv, idModule, idEnseignant);
    }
    @PutMapping
    public ResponseEntity<?> updateModule(@RequestBody InterventionRquest interv ,String  idModule, String idEnseignant){
        return interventionService.update(interv, idModule, idEnseignant);
    }
    @DeleteMapping("/{idEnseignant}/{idModule}")
    public ResponseEntity<?> deleteModule(@PathVariable String  idEnseignant, @PathVariable String idModule){
        return interventionService.delete(idEnseignant, idModule);
    }

    @GetMapping("/count")
    public Integer countInterventions(){
        return interventionService.countInterventions();
    }
}
