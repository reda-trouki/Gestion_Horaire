package com.master.Services;

import com.master.controllers.InterventionRquest;
import com.master.models.Enseignant;
import com.master.models.Intervention;
import com.master.models.InterventionID;
import com.master.models.Module;
import com.master.repositories.EnseignantRepository;
import com.master.repositories.InterventionRepository;
import com.master.repositories.ModuleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterventionService {
    private final InterventionRepository interventionRepository;
    private final ModuleRepository moduleRepository;
    private final EnseignantRepository enseignantRepository;

    public InterventionService(InterventionRepository interventionRepository, ModuleRepository moduleRepository, EnseignantRepository enseignantRepository) {
        this.interventionRepository = interventionRepository;
        this.moduleRepository = moduleRepository;
        this.enseignantRepository = enseignantRepository;
    }
    public List<Intervention> getInterventions(){
        return interventionRepository.findAll();
    }
    public ResponseEntity<?> add(InterventionRquest intervRequest, String idModule, String idEnseignant){
        //check if filiere exist
        Module m=this.moduleRepository.findById(idModule).orElse(null);
        if(m==null){
            return ResponseEntity.badRequest().body("Module not found");
        }
        //check if enseignant exist
        Enseignant enseignant=enseignantRepository.findById(idEnseignant).orElse(null);
        if(enseignant==null){
            return ResponseEntity.badRequest().body("Enseignant not found");
        }
        InterventionID id = new InterventionID(enseignant.getEmail(), m.getIntitule());
        Intervention intervention=new Intervention();
        intervention.setId(id);
        intervention.setModule(m);
        intervention.setEnseignant(enseignant);
        intervention.setIntitule(intervRequest.getIntitule());
        intervention.setVHcourInterv(intervRequest.getVhcourInterv());
        intervention.setVHtdInterv(intervRequest.getVhtdInterv());
        intervention.setVHtpInterv(intervRequest.getVhtpInterv());
        intervention.setNBevalInterv(intervRequest.getNbevalInterv());
        return ResponseEntity.ok(interventionRepository.save(intervention));
    }
    public ResponseEntity<?> update(InterventionRquest intervRequest, String idModule, String idEnseignant) {
        //check if module exist
        Module m = this.moduleRepository.findById(idModule).orElse(null);
        if(m == null){
            return ResponseEntity.badRequest().body("Module not found");
        }
        //check if enseignant exist
        Enseignant enseignant = enseignantRepository.findById(idEnseignant).orElse(null);
        if(enseignant == null){
            return ResponseEntity.badRequest().body("Enseignant not found");
        }

        Intervention intervention = interventionRepository.findById(intervRequest.getId()).orElse(null);
//        Intervention intervention = interventionRepository.findByIdEnseignantIDAndIdModuleID(intervRequest.getId().getEnseignantID(),intervRequest.getId().getModuleID()).orElse(null);
        if (intervention == null) {
            return ResponseEntity.badRequest().body("Intervention not found");
        }
//        InterventionID id = new InterventionID(enseignant.getEmail(), m.getIntitule());
//        intervention.setId(id);
        intervention.setModule(m);
        intervention.setEnseignant(enseignant);
        intervention.setIntitule(intervRequest.getIntitule());
        intervention.setVHcourInterv(intervRequest.getVhcourInterv());
        intervention.setVHtdInterv(intervRequest.getVhtdInterv());
        intervention.setVHtpInterv(intervRequest.getVhtpInterv());
        intervention.setNBevalInterv(intervRequest.getNbevalInterv());
        return ResponseEntity.ok(interventionRepository.save(intervention));
    }
    public ResponseEntity<?> delete(String idEnseignant, String idModule){
        Intervention interv=interventionRepository.findByIdEnseignantIDAndIdModuleID(idEnseignant,idModule).orElse(null);
        if(interv==null){
            return ResponseEntity.badRequest().body("Intervention not found");
        }
        interventionRepository.delete(interv);
        return ResponseEntity.ok("Intervention deleted");
    }

    public int countInterventions(){
        return interventionRepository.countAllInterventions();
    }
}
