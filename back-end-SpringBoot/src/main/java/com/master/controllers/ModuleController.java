package com.master.controllers;
import com.master.models.Module;
import com.master.Services.ModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {
    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }
    @GetMapping
    public ResponseEntity<?> getModules(){
        return ResponseEntity.ok(this.moduleService.getModules());
    }
    @PostMapping
    public ResponseEntity<?> addModule(@RequestBody Module module, Long idFiliere, String idEnseignant){
        return moduleService.add(module, idFiliere, idEnseignant);
    }
    @PutMapping
    public ResponseEntity<?> updateModule(@RequestBody Module module, Long idFiliere, String idEnseignant){
        return moduleService.update(module, idFiliere, idEnseignant);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteModule(@PathVariable String id){
        return moduleService.delete(id);
    }
    @GetMapping("/count")
    public ResponseEntity<?> countModules(){
        return ResponseEntity.ok(this.moduleService.countModules());
    }
}
