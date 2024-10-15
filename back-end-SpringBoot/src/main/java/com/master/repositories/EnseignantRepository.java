package com.master.repositories;

import com.master.models.Enseignant;
import com.master.models.Intervention;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnseignantRepository extends JpaRepository<Enseignant, String> {
    Optional<Enseignant> findEnseignantByEmail(String email);

    Boolean existsEnseignantByEmail(String email);

    @Query("SELECT COUNT(e) FROM Enseignant e")
    Integer countAllEnseignants();

    @Query("SELECT e, m FROM Enseignant e JOIN FETCH e.modules m WHERE e.email = :email")
    List<Object[]> getEnseignantAndModules(@Param("email") String email);

    @Query("SELECT i FROM Enseignant e JOIN e.interventions i WHERE e.email = ?1")
    List<Intervention> getInterventions(String email);
}
