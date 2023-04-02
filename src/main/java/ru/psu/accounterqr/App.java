package ru.psu.accounterqr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@SpringBootApplication
public class App {
    public static void main(String[] args) throws IOException {
        Files.createDirectories(Paths.get(".\\qrcodes"));

        SpringApplication.run(App.class, args);

    }
}
