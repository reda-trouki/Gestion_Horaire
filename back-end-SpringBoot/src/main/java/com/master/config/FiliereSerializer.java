package com.master.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.master.models.Filiere;

import java.io.IOException;

public class FiliereSerializer extends JsonSerializer<Filiere> {
    @Override
    public void serialize(Filiere filiere, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("nom", filiere.getNom());
        jsonGenerator.writeNumberField("id", filiere.getId());
        jsonGenerator.writeEndObject();
    }
}