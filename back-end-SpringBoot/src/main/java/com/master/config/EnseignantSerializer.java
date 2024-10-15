package com.master.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.master.models.Enseignant;

import java.io.IOException;

public class EnseignantSerializer extends JsonSerializer<Enseignant> {
    @Override
    public void serialize(Enseignant enseignant, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("email", enseignant.getEmail());
        jsonGenerator.writeStringField("nom", enseignant.getNom());
        jsonGenerator.writeStringField("prenom", enseignant.getPrenom());
        jsonGenerator.writeEndObject();
    }
}