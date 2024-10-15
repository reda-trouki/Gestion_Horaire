package com.master;

import com.master.models.Enseignant;
import com.master.models.Role;
import com.master.repositories.EnseignantRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@SpringBootApplication
public class TestApplication {

	private  EnseignantRepository enseignantRepository;
    private PasswordEncoder PasswordEncoder;
    public TestApplication(EnseignantRepository enseignantRepository, PasswordEncoder PasswordEncoder){
        this.enseignantRepository = enseignantRepository;
        Optional<Enseignant> enseignant =enseignantRepository.findEnseignantByEmail("admin@admin.com");
        if(enseignant.isEmpty()){
			Enseignant enseignant1 = new Enseignant();
			enseignant1.setNom("admin");
			enseignant1.setPrenom("admin");
			enseignant1.setEmail("admin@admin.com");

            enseignant1.setPassword(PasswordEncoder.encode("admin"));
            enseignant1.setRole(Role.valueOf("ADMIN"));
            enseignantRepository.save(enseignant1);
        }
    }

    public static void main(String[] args) {

		SpringApplication.run(TestApplication.class, args);

	}

}
