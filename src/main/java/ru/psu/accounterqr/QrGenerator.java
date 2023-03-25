package ru.psu.accounterqr;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import ru.psu.accounterqr.model.ObjectEntity;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class QrGenerator {
    private static final String DEFAULT_EXTENSION = "png";

    private final QRCodeWriter codeWriter;

    public QrGenerator() {
        this.codeWriter = new QRCodeWriter();
    }

    public BufferedImage generate(ObjectEntity objectEntity) throws WriterException {
        String content = objectEntity.toString();
        Map<EncodeHintType, String> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");

        BitMatrix bitMatrix = codeWriter.encode(content,
                BarcodeFormat.QR_CODE,
                200,
                200,
                hints);

        return MatrixToImageWriter.toBufferedImage(bitMatrix);
    }

    public void saveAsPicture(BufferedImage qrCodeImage, String savePath, String filename, String extension) throws IOException {
        String filenameExt = filename + "." + extension;
        File outFile = new File(savePath, filenameExt);
        ImageIO.write(qrCodeImage, extension, outFile);
    }

    public void saveAsPicture(BufferedImage qrCodeImage, String savePath, String filename) throws IOException {
        this.saveAsPicture(qrCodeImage, savePath, filename, DEFAULT_EXTENSION);
    }
}