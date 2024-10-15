package com.master.Services;

import com.master.models.Enseignant;
import com.master.models.Filiere;
import com.master.models.Module;
import com.master.repositories.EnseignantRepository;
import com.master.repositories.FiliereRepository;
import com.master.repositories.ModuleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleService {
    private final ModuleRepository moduleRepository;
    private final FiliereRepository filiereRepository;
    private final EnseignantRepository enseignantRepository;

    public ModuleService(ModuleRepository moduleRepository, FiliereRepository filiereRepository, EnseignantRepository enseignantRepository) {
        this.moduleRepository = moduleRepository;
        this.filiereRepository = filiereRepository;
        this.enseignantRepository = enseignantRepository;
    }
    public List<Module> getModules(){
        return moduleRepository.findAll();
    }
    public ResponseEntity<?> add(Module module, Long idFiliere, String idEnseignant){
        //check if filiere exist
        Filiere filiere=filiereRepository.findById(idFiliere).orElse(null);
        if(filiere==null){
            return ResponseEntity.badRequest().body("Filiere not found");
        }
        //check if enseignant exist
        Enseignant enseignant=enseignantRepository.findById(idEnseignant).orElse(null);
        if(enseignant==null){
            return ResponseEntity.badRequest().body("Enseignant not found");
        }
        module.setFiliere(filiere);
        module.setEnseignant(enseignant);
        return ResponseEntity.ok(moduleRepository.save(module));
    }
    public ResponseEntity<?> update(Module module, Long idFiliere, String idEnseignant) {
        //check if filiere exist
        Filiere filiere = filiereRepository.findById(idFiliere).orElse(null);
        if (filiere == null) {
            return ResponseEntity.badRequest().body("Filiere not found");
        }
        //check if enseignant exist
        Enseignant enseignant = enseignantRepository.findById(idEnseignant).orElse(null);
        if (enseignant == null) {
            return ResponseEntity.badRequest().body("Enseignant not found");
        }
        Module moduleOLd = moduleRepository.findById(module.getIntitule()).orElse(null);
        if (moduleOLd == null) {
            return ResponseEntity.badRequest().body("Module not found");
        }
        moduleOLd.setEnseignant(enseignant);
        moduleOLd.setFiliere(filiere);
        moduleOLd.setVHcour(module.getVHcour());
        moduleOLd.setVHtd(module.getVHtd());
        moduleOLd.setVHtp(module.getVHtp());
        moduleOLd.setNBeval(module.getNBeval());
        return ResponseEntity.ok(moduleRepository.save(moduleOLd));
    }
    public ResponseEntity<?> delete(String id){
        Module module=moduleRepository.findById(id).orElse(null);
        if(module==null){
            return ResponseEntity.badRequest().body("Module not found");
        }
        moduleRepository.delete(module);
        return ResponseEntity.ok("Module deleted");
    }

    public int countModules(){
        return moduleRepository.countAllModules();
    }

}
