package com.Agari.TT.domain.Trash.Dto;

import com.Agari.TT.domain.Trash.Entity.Trash;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@AllArgsConstructor
@Getter
@NoArgsConstructor
public class MyPageTrashDto {
    Long id;

    LocalDateTime date;

    String status;


    public static MyPageTrashDto from(Trash trash){
        return new MyPageTrashDto(
                trash.getId(),
                trash.getCreatedAt(),
                trash.getStatus()
        );

    }
}
