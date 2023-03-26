package ru.psu.accounterqr.controller;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.psu.accounterqr.module.QrGenerator;
import ru.psu.accounterqr.entity.ObjectEntity;
import ru.psu.accounterqr.repository.ObjectRepository;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class Controller {

    @Autowired
    ObjectRepository objectRepository;
    
    private final static String dateTimeFormat = "dd-MM-yyyy-[HH]-[mm]";

    @GetMapping("/get-object")
    public ObjectEntity getObjectById(@RequestParam String id){
        return objectRepository.getObjectEntitiesById(id);
    }

    @PostMapping ("/add-object")
    public void addObject(@RequestBody ObjectEntity object) throws WriterException, IOException {
        object.setCreationDateTime(LocalDateTime.now());

        String qrcodeName = String.format("%s_%s_%s",
                object.getName(),
                object.getType(),
                object.getCreationDateTime().format(DateTimeFormatter.ofPattern(dateTimeFormat)));

        QrGenerator qrGenerator = new QrGenerator();
        BufferedImage bufferedImage = qrGenerator.generate(object);
        qrGenerator.saveAsPicture(bufferedImage, ".\\qrcodes\\", qrcodeName, "png");
        objectRepository.save(object);
    }

    @GetMapping("/get-all")
    public List<ObjectEntity> objectEntities (){
       return objectRepository.findAll();
    }
}
