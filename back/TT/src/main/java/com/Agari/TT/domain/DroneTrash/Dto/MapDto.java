package com.Agari.TT.domain.DroneTrash.Dto;

import com.Agari.TT.domain.ImageData.Entity.ImageData;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MapDto {
    Long id;

    double latitude;

    double longitude;

    LocalDateTime createdAt;


    public static MapDto from(ImageData imageData) {
        return new MapDto(
                imageData.getId(),
                imageData.getLatitude(),
                imageData.getLongitude(),
                imageData.getCreatedAt()
        );
    }
}
