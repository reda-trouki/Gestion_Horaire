package com.master.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.master.config.GrantedAuthorityDeserializer;
import com.master.config.GrantedAuthoritySerializer;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity

public class Enseignant implements UserDetails {
    @Id
    private String email;
    private String nom;
    private String prenom;
    private String password;

    @JsonIdentityReference(alwaysAsId = false)
    @OneToMany(mappedBy = "enseignant")
    private List<Module> modules;


    @OneToMany(mappedBy = "enseignant")
    private List<Intervention> interventions;
    @Enumerated(EnumType.STRING)
    private Role role;


    @JsonSerialize(contentUsing = GrantedAuthoritySerializer.class)
    @JsonDeserialize(contentUsing = GrantedAuthorityDeserializer.class)
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>(List.of(new SimpleGrantedAuthority(role.name())));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }



}
