package com.upm.wallavic.service.util;

import com.upm.wallavic.domain.Product;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;

/**
 * Created by Victor on 15/01/2017.
 */
public class GenericUtilsService {

    private final static Logger log = LoggerFactory.getLogger(Product.class);

    public static String uploadFile(MultipartFile file, String fileName, String url) throws IOException {

        InputStream inputStream = null;
        OutputStream outputStream = null;

        log.debug("path to save: " + url + fileName);

        File newFile = new File(url + fileName);
        inputStream = file.getInputStream();

        if (!newFile.exists()) {
            newFile.createNewFile();
        }
        outputStream = new FileOutputStream(newFile);
        int read = 0;
        byte[] bytes = new byte[1024];
        while ((read = inputStream.read(bytes)) != -1) {
            outputStream.write(bytes, 0, read);
        }

        log.debug("path to save: " + newFile.getAbsolutePath());

        return fileName;
    }

    public static boolean removeFile(String fileName, String filesDir){
        log.debug("path to remove: "+filesDir);
        String url = filesDir+fileName;

        File file = new File(url);
        log.debug("url to remove:" +url);
        return file.delete();
    }
}
