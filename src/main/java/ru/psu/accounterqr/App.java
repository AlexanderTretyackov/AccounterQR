package ru.psu.accounterqr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import ru.psu.accounterqr.entity.ObjectEntity;
import ru.psu.accounterqr.repository.ObjectRepository;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@SpringBootApplication
public class App {

    @Autowired
    private ObjectRepository objectRepository;
    private boolean requiredInitDB = false;
    public static void main(String[] args) throws IOException {
        Files.createDirectories(Paths.get(".\\qrcodes"));
        SpringApplication.run(App.class, args);

    }

    @PostConstruct
    public void initDB() {
        if(!requiredInitDB)
        {
            return;
        }
        List<ObjectEntity> entities = Arrays.asList(
                new ObjectEntity("id1", "Стол1", "Стол",
                        new LinkedHashMap<String, String>() {{
                            put("Число ножек", "4");
                            put("Цвет", "Белый");
                        }}),
                new ObjectEntity("id2", "Стол2", "Стол",
                        new LinkedHashMap<String, String>() {{
                            put("Число ножек", "1");
                            put("Цвет", "Черный");
                        }}));
        objectRepository.saveAll(entities);
    }
}
