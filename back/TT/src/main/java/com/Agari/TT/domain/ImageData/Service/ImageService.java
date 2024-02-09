package com.Agari.TT.domain.ImageData.Service;

import com.Agari.TT.domain.ImageData.Dto.ImageDto;
import com.Agari.TT.domain.ImageData.Entity.ImageData;
import com.Agari.TT.domain.ImageData.Repository.ImageDataRepository;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageService {

    @Value("${spring.cloud.gcp.storage.credentials.location}")
    private  static String keyFileName;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private static String bucketName;

    private final ImageDataRepository imageDataRepository;

    @Transactional
    public ImageData save(ImageData image) {
        return imageDataRepository.save(image);
    }


    public static String exec(MultipartFile multipartFile) throws IOException {
        InputStream keyFile = ResourceUtils.getURL(keyFileName).openStream();

        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();


        // 구글 클라우드 스토리지 옵션과 제공된 인증 자격 증명을 사용하여 Storage 객체를 생성합니다.
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();


        // GCS 버킷 이름 및 생성된 고유 식별자를 사용하여 업로드된 이미지의 초기 URL을 구성합니다.
        // 업로드된 파일이 비어있으면 imgUrl을 null로 설정합니다.
        // 그렇지 않으면 파일을 storage.create 메소드를 사용하여 GCS에 업로드하는 로직으로 진행됩니다.
        String imgUrl = "https://storage.googleapis.com/" + bucketName + "/" + uuid;

        if (multipartFile.isEmpty()) {
            imgUrl = null;
        } else {
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, uuid)
                    .setContentType(ext).build();

            Blob blob = storage.create(blobInfo, multipartFile.getInputStream());
        }

        return imgUrl;
    }
}
