package com.master.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.io.IOException;

public class GrantedAuthorityDeserializer extends StdDeserializer<SimpleGrantedAuthority> {

    public GrantedAuthorityDeserializer() {
        super(SimpleGrantedAuthority.class);
    }

    @Override
    public SimpleGrantedAuthority deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        return new SimpleGrantedAuthority(p.getValueAsString());
    }
}