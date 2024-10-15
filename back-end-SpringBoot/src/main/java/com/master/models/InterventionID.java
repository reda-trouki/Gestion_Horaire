package com.master.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class InterventionID  implements Serializable {
    @Column(name = "enseignant_id")
    private String enseignantID;
    @Column(name = "module_id")
    private String moduleID;
}
