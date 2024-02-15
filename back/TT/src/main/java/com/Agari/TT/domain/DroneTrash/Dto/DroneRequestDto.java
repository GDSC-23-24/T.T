package com.Agari.TT.domain.DroneTrash.Dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@NoArgsConstructor
public class DroneRequestDto {
    MultipartFile image;
    LocationDto location;
}
