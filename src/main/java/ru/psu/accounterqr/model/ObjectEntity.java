package ru.psu.accounterqr.model;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;

public class ObjectEntity {
    private String id;
    private String name;
    private String type;
    private LocalDateTime creationDateTime;
    private Map<String, String> attributes;

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
        // TODO: именно этот метод используется для записи в инфы в QR коде.
        //  Необходимо изменить его в финальной версии,
        //  рекомендуется использовать JSON или XML

        return new StringJoiner(", ", ObjectEntity.class.getSimpleName() + "[", "]")
                .add("id='" + id + "'")
                .add("name='" + name + "'")
                .add("type='" + type + "'")
                .add("creationDateTime=" + creationDateTime)
                .add("attributes=" + attributes)
                .toString();
    }
}
