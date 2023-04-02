package ru.psu.accounterqr.controller;

import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.psu.accounterqr.module.QrGenerator;
import ru.psu.accounterqr.entity.ObjectEntity;
import ru.psu.accounterqr.repository.ObjectRepository;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class Controller {

    private final static String dateTimeFormat = "dd-MM-yyyy-[HH]-[mm]";

    @Autowired
    ObjectRepository objectRepository;

    private final static QrGenerator qrGenerator = new QrGenerator();

    @GetMapping("/get-object")
    public ObjectEntity getObjectById(@RequestParam String id){
        return objectRepository.getObjectEntitiesById(id);
    }

    @GetMapping("/get-object/qr")
    public ResponseEntity<Resource> getObjectQr(@RequestParam String id,
                                                @RequestParam(required = false, defaultValue = "png") String format)
            throws WriterException, IOException
    {
        ObjectEntity entity = objectRepository.getObjectEntitiesById(id);

        BufferedImage bufferedImage = qrGenerator.generate(entity);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(bufferedImage, format, baos);

        ByteArrayResource responseResource = new ByteArrayResource(baos.toByteArray());

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentLength(responseResource.contentLength())
                .body(responseResource);
    }

    @PostMapping ("/add-object")
    public void addObject(@RequestBody ObjectEntity object) throws WriterException, IOException {
        object.setCreationDateTime(LocalDateTime.now());

        String qrcodeName = String.format("%s_%s_%s",
                object.getName(),
                object.getType(),
                object.getCreationDateTime().format(DateTimeFormatter.ofPattern(dateTimeFormat)));

        BufferedImage bufferedImage = qrGenerator.generate(object);
        qrGenerator.saveAsPicture(bufferedImage, ".\\qrcodes\\", qrcodeName, "png");
        objectRepository.save(object);
    }

    @GetMapping("/get-all")
    public List<ObjectEntity> objectEntities (){
       return objectRepository.findAll();
    }


    @DeleteMapping("/delete")
    public void deleteObject(@RequestParam String id){
        objectRepository.deleteById(id);
    }

    @PostMapping ("/update")
    public void updateObject (@RequestBody ObjectEntity object) throws IOException, WriterException {
        addObject(object);

    }
}
