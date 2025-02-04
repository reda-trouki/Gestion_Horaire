package com.master.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegistreRequest {
    private String nom;
    private String prenom;
    private String email;
    private String password;

}
