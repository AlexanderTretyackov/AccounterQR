package ru.psu.accounterqr.controller;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.psu.accounterqr.QrGenerator;
import ru.psu.accounterqr.model.ObjectEntity;
import ru.psu.accounterqr.repository.ObjectRepository;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class Controller {

    @Autowired
    ObjectRepository objectRepository;

    @PostMapping("/get-object")
    public ObjectEntity getObjectById(@RequestParam String id){
        return objectRepository.getObjectEntitiesById(id);

    }

    @PostMapping ("/add-object")
    public void addObject(@RequestBody ObjectEntity object) throws WriterException, IOException {
        object.setCreationDateTime(LocalDateTime.now());

        QrGenerator qrGenerator = new QrGenerator();
        BufferedImage bufferedImage = qrGenerator.generate(object);
        qrGenerator.saveAsPicture(bufferedImage, ".\\", "test", "png");
        objectRepository.save(object);
    }

    @PostMapping("/get-all")
    public List<ObjectEntity> objectEntities (){
       return objectRepository.findAll();
    }







}