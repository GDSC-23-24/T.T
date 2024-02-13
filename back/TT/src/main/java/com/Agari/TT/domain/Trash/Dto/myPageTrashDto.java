package com.Agari.TT.domain.Trash.Dto;

import com.Agari.TT.domain.Trash.Entity.Trash;
import lombok.AllArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@AllArgsConstructor
public class myPageTrashDto {
    Long id;

    LocalDateTime date;

    public static myPageTrashDto from(Trash trash){
        return new myPageTrashDto(
                trash.getId(),
                trash.getCreatedAt()
        );

    }
}
