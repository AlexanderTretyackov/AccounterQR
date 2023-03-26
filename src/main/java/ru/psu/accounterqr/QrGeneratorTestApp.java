package ru.psu.accounterqr;

import ru.psu.accounterqr.model.ObjectEntity;

import java.awt.image.BufferedImage;
import java.util.LinkedHashMap;
import java.util.Map;

public class QrGeneratorTestApp {
    public static void main(String[] args) throws Exception {
        ObjectEntity objectEntity = new ObjectEntity("1", "default", "type");
        Map<String, String> map = new LinkedHashMap<String, String>() {{
            for (int i = 0; i < 9; i++) {
                int j = i + 1;
                put("Attr" + j, "Val" + j);
            }
        }};
        objectEntity.setAttributes(map);

        System.out.println(objectEntity);

        QrGenerator qrGenerator = new QrGenerator();
        BufferedImage bufferedImage = qrGenerator.generate(objectEntity);
        qrGenerator.saveAsPicture(bufferedImage, ".\\", "test", "png");
    }
}