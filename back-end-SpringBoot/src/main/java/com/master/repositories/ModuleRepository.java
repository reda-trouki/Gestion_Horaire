package com.master.repositories;
import com.master.models.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ModuleRepository extends JpaRepository<Module, String> {
    @Query("SELECT COUNT(m) FROM Module m")
    Integer countAllModules();
}
