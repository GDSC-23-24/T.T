package com.Agari.TT.domain.ImageData.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ImageDto {
    String name;
    String type;
    String filePath;
    LocalDateTime fileDate;
    Boolean isProfileImage;
}
