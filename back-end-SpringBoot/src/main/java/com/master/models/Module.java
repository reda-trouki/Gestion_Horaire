package com.master.models;

import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.master.config.EnseignantSerializer;
import com.master.config.FiliereSerializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "intitule")
public class Module {
    @Id
    private String intitule ;
    private int VHcour;
    private int VHtd;
    private int VHtp;
    private int NBeval;

    @JsonSerialize(using = FiliereSerializer.class)
    @ManyToOne
    private Filiere filiere;


    @JsonSerialize(using = EnseignantSerializer.class)
    @ManyToOne
    private Enseignant enseignant;


    @OneToMany(mappedBy = "module")
    private List<Intervention> interventions;

}
