package com.master.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.master.config.EnseignantSerializer;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Intervention {
    @EmbeddedId
    private InterventionID id;
    private String intitule;
    private int VHcourInterv;
    private int VHtdInterv;
    private int VHtpInterv;
    private int NBevalInterv;


    @ManyToOne
    @MapsId("enseignantID")
    @JoinColumn(name = "enseignant_id")
    @JsonSerialize(using = EnseignantSerializer.class)
    private Enseignant enseignant;

    @ManyToOne
    @MapsId("moduleID")
    @JoinColumn(name = "module_id")
    private Module module;
}
