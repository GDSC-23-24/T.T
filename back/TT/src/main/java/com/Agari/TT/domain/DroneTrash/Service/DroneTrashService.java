package com.Agari.TT.domain.DroneTrash.Service;

import com.Agari.TT.domain.DroneTrash.Dto.LocationDto;
import com.Agari.TT.domain.DroneTrash.Entity.DroneTrash;
import com.Agari.TT.domain.DroneTrash.Repository.DroneTrashRepository;
import com.Agari.TT.domain.ImageData.Entity.ImageData;
import com.Agari.TT.domain.ImageData.Repository.ImageDataRepository;
import com.Agari.TT.domain.ImageData.Service.ImageService;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class DroneTrashService {

    @Value("${spring.cloud.gcp.storage.credentials.location}")
    private  String keyFileName;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    private final DroneTrashRepository droneTrashRepository;

    private final ImageService imageService;

    private final MemberRepository memberRepository;

    /**
     * 드론 이미지 업로드
     */
    @Transactional
    public void upload(List<MultipartFile> files, List<LocationDto> locations, String loginId) throws IOException {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        DroneTrash droneTrash = DroneTrash.builder()
                .member(member)
                .build();

        droneTrashRepository.save(droneTrash);

        List<ImageData> imageDataList = new ArrayList<>();

        for (int i = 0; i < files.size(); i++) {

            String url = imageService.exec(files.get(i));

            ImageData imageData = ImageData.builder()
                    .imageUrl(url)
                    .latitude(locations.get(i).getLatitude())
                    .longitude(locations.get(i).getLongitude())
                    .member(member)
                    .droneTrash(droneTrash)
                    .build();

            imageDataList.add(imageData);
        }

        imageService.saveAll(imageDataList);


    }



}
