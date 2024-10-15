package com.master.Services;

import com.master.models.Filiere;
import com.master.models.ModuleHours;
import com.master.repositories.FiliereRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FiliereService {
    private final FiliereRepository filiereRepository;

    public FiliereService(FiliereRepository filiereRepository) {
        this.filiereRepository = filiereRepository;
    }
    public List<Filiere> getFilieres(){
        return filiereRepository.findAll();
    }
    public ResponseEntity<?> addFiliere(Filiere filiere){
        System.out.println(filiere);
        //check if exist by name :
        if(filiereRepository.findFiliereByNom(filiere.getNom()).isPresent()){
            return ResponseEntity.badRequest().body("La filiere existe deja");
        }

        return ResponseEntity.ok(filiereRepository.save(filiere));
    }
    public ResponseEntity<?> updateFiliere(Filiere filiere){
        //get filiere if exist else null
        Filiere fl=filiereRepository.findById(filiere.getId()).orElse(null);
        //check if exist by name :
        if(fl==null){
            return ResponseEntity.notFound().build();
        }
        fl.setId(filiere.getId());
        fl.setNom(filiere.getNom());
        filiereRepository.save(fl);
        return ResponseEntity.ok("Filiere updated successfully");
    }
    public ResponseEntity<?> deleteFiliere(Long id){
        //get filiere if exist else null
        Filiere fl=filiereRepository.findById(id).orElse(null);
        //check if exist by name :
        if(fl==null){
            return ResponseEntity.notFound().build();
        }
        filiereRepository.deleteById(id);
        return ResponseEntity.ok("Filiere deleted successfully");
    }

    public int countFilieres(){
        return filiereRepository.countAllFillieres();
    }

    public List<ModuleHours> getModulesTotalHoursByFiliereId(Long id){
        return filiereRepository.getTotalHoursForEachModuleInFiliere(id);
    }
}
