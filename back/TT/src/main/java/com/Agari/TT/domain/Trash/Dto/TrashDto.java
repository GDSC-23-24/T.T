package com.Agari.TT.domain.Trash.Dto;

import com.Agari.TT.domain.Member.Dto.MemberDto;
import com.Agari.TT.domain.Trash.Entity.Trash;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;


@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TrashDto {
    Long id;

    String trashImageUrl;

    String trashType;

    Double longitude;

    Double latitude;

    // Complete, Waiting, Rejection
    String status;

    LocalDateTime createdAt;

    MemberDto member;

    public static TrashDto from(Trash trash){
        return new TrashDto(
                trash.getId(),
                trash.getTrashImageUrl(),
                trash.getTrashType(),
                trash.getLongitude(),
                trash.getLatitude(),
                trash.getStatus(),
                trash.getCreatedAt(),
                MemberDto.from(trash.getMember())
        );
    }
}
