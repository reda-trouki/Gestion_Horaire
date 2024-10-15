package com.master.controllers;

import com.master.models.InterventionID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class InterventionRquest {
    private String intitule;
    private int vhcourInterv;
    private int vhtdInterv;
    private int vhtpInterv;
    private  int nbevalInterv;
    private InterventionID id;
}
