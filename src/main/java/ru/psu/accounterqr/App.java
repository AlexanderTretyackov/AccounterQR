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
import java.util.List;

@SpringBootApplication
public class App {

    @Autowired
    private ObjectRepository objectRepository;

    public static void main(String[] args) throws IOException {
        Files.createDirectories(Paths.get(".\\qrcodes"));

        SpringApplication.run(App.class, args);

    }

    @PostConstruct
    public void initDB() {

        List<ObjectEntity> entities = Arrays.asList(
                new ObjectEntity("id1", "test1", "type1"),
                new ObjectEntity("id2", "test2", "type9"),
                new ObjectEntity("id3", "test3", "type5")
        );

        objectRepository.saveAll(entities);

    }
}
