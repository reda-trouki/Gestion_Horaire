package com.master.repositories;

import com.master.models.Filiere;
import com.master.models.ModuleHours;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FiliereRepository extends JpaRepository<Filiere, Long> {

    Optional<Object> findFiliereByNom(String nom);

    @Query("SELECT COUNT(f) FROM Filiere f")
    Integer countAllFillieres();

    @Query("SELECT new com.master.models.ModuleHours(m.intitule, " +
            "SUM(COALESCE(m.VHcour, 0) + " +
            "COALESCE(m.VHtd, 0) + " +
            "COALESCE(m.VHtp, 0) + " +
            "COALESCE(i.VHcourInterv, 0) + " +
            "COALESCE(i.VHtdInterv, 0) + " +
            "COALESCE(i.VHtpInterv, 0))) " +
            "FROM Filiere f " +
            "JOIN f.modules m " +
            "LEFT JOIN m.interventions i " +
            "WHERE f.id = :filiereId " +
            "GROUP BY m.intitule " +
            "ORDER BY SUM(COALESCE(m.VHcour, 0) + " +
            "COALESCE(m.VHtd, 0) + " +
            "COALESCE(m.VHtp, 0) + " +
            "COALESCE(i.VHcourInterv, 0) + " +
            "COALESCE(i.VHtdInterv, 0) + " +
            "COALESCE(i.VHtpInterv, 0)) DESC")
    List<ModuleHours> getTotalHoursForEachModuleInFiliere(@Param("filiereId") Long filiereId);
}
