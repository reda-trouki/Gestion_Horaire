package com.master.repositories;

import com.master.models.Intervention;
import com.master.models.InterventionID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface InterventionRepository extends JpaRepository<Intervention, InterventionID> {

    Optional<Intervention> findByIdEnseignantIDAndIdModuleID(String enseignantID, String moduleID);
    @Query("SELECT COUNT(i) FROM Intervention i")  Integer countAllInterventions();
}
