package ru.psu.accounterqr.entity;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import ru.psu.accounterqr.misc.LocalDateTimeAdapter;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.StringJoiner;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Document
public class ObjectEntity {

    @Id
    @GeneratedValue
    private String id;
    private String name;
    private String type;
    private LocalDateTime creationDateTime;
    private Map<String, String> attributes = new LinkedHashMap<>(); // LinkedHashMap поскольку обычный хешмап не сохраняет порядка атрибутов

    @Transient
    private static final Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .registerTypeAdapter(LocalDateTime.class, new LocalDateTimeAdapter())
            .create();

    public ObjectEntity(String id, String name, String type, Map<String, String> attributes) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.attributes = attributes;
        this.creationDateTime = LocalDateTime.now();
    }

    public ObjectEntity(String id, String name, String type) {
        this(id, name, type, new HashMap<>());
    }

    public void addAttribute(String attribute, String value) {
        this.attributes.put(attribute, value);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(LocalDateTime creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public Map<String, String> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, String> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String toString() {
        return gson.toJson(this);
    }

    public ObjectEntity(String name, String type, LocalDateTime creationDateTime, Map<String, String> attributes) {
        this.name = name;
        this.type = type;
        this.creationDateTime = creationDateTime;
        this.attributes = attributes;
    }
}
