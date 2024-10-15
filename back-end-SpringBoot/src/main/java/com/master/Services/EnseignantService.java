package com.master.Services;

import com.master.models.Enseignant;
import com.master.models.Intervention;
import com.master.models.Module;
import com.master.models.Role;
import com.master.repositories.EnseignantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class EnseignantService {

    private final EnseignantRepository EnseignantRepository;

    private final PasswordEncoder passwordEncoder;
    private final EnseignantRepository enseignantRepository;

    public EnseignantService(EnseignantRepository EnseignantRepository, PasswordEncoder passwordEncoder, EnseignantRepository enseignantRepository) {
        this.EnseignantRepository = EnseignantRepository;
        this.passwordEncoder = passwordEncoder;
        this.enseignantRepository = enseignantRepository;
    }

    public Enseignant findByEmail(String email){
        Enseignant Ens = EnseignantRepository.findEnseignantByEmail(email)
                .orElseThrow(()->new RuntimeException("User not found"));
        return Ens;
    }
    public List<Enseignant> getEnseignants(){
        return EnseignantRepository.findAll();
    }

    public ResponseEntity<?> addEnseignant(Enseignant enseignant){
        enseignant.setRole(Role.ENSEIGNANT);
        enseignant.setPassword(passwordEncoder.encode(enseignant.getPassword()));
        if (checkEmail(enseignant.getEmail())) {
            return ResponseEntity.badRequest().body("Email already exists");
        }
        if(!checkPassword(enseignant.getPassword())){
            return ResponseEntity.badRequest().body("Bad Password");
        }
        return ResponseEntity.ok(EnseignantRepository.save(enseignant));
    }

    public ResponseEntity<?> updateEnseignant(Enseignant enseignant){
        // Get the existing Enseignant from the database
        Enseignant existingEnseignant = EnseignantRepository.findEnseignantByEmail(enseignant.getEmail()).orElse(null);

        // Check if the Enseignant exists
        if(existingEnseignant == null){
            return ResponseEntity.notFound().build();
        }

        // Update the fields of the existing Enseignant
        existingEnseignant.setNom(enseignant.getNom());
        existingEnseignant.setPrenom(enseignant.getPrenom());
        existingEnseignant.setRole(enseignant.getRole());

        // Check if the password has changed
        if(!Objects.equals(enseignant.getPassword(), existingEnseignant.getPassword())){
            // Check if the new password is valid
            if(!checkPassword(enseignant.getPassword())){
                return ResponseEntity.badRequest().body("Bad Password");
            } else {
                // Encode the new password and set it
                existingEnseignant.setPassword(passwordEncoder.encode(enseignant.getPassword()));
            }
        }

        // Save the updated Enseignant in the database
        EnseignantRepository.save(existingEnseignant);

        return ResponseEntity.ok("Enseignant updated successfully");
    }
    public ResponseEntity<?>  deleteEnseignant(String email){
        Enseignant ens = EnseignantRepository.findEnseignantByEmail(email).orElse(null);
        //check if exist by name :
        if(ens==null){
            return ResponseEntity.notFound().build();
        }
        EnseignantRepository.deleteById(email);
        return ResponseEntity.ok("Enseignant deleted successfully");
    }

    public Boolean checkEmail(String email) {
        return EnseignantRepository.existsEnseignantByEmail(email);
    }

    public boolean checkPassword(String password) {
        //password greater than 8 characters and contains at least one number and  one letter and one special character and one upper case and one lower case
        return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\\S+$).{8,}$");

    }
    public int countEnseignants(){
        return EnseignantRepository.countAllEnseignants();
    }
    public List<Module> getModules(String email){
            if (!EnseignantRepository.existsEnseignantByEmail(email)) {
                throw new IllegalArgumentException("No Enseignant with the provided email exists");
            }
            List<Object[]> results = EnseignantRepository.getEnseignantAndModules(email);
            List<Module> modules = new ArrayList<>();
            for (Object[] result : results) {
                modules.add((Module) result[1]);
            }
            return modules;
    }
    public List<Intervention> getInterventions(String email){
        if (!EnseignantRepository.existsEnseignantByEmail(email)) {
            throw new IllegalArgumentException("No Enseignant with the provided email exists");
        }
        return EnseignantRepository.getInterventions(email);
    }

}
