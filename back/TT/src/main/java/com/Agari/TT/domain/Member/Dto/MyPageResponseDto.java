package com.Agari.TT.domain.Member.Dto;

import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Trash.Dto.myPageTrashDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class MyPageResponseDto {
    Long id;

    String nickname;

    Integer likesCount;

    Integer point;

    Integer trashCount;

    List<myPageTrashDto> trashDtoList;

    public MyPageResponseDto(Member member){
        this.id = member.getId();
        this.nickname = member.getNickname();
        this.likesCount = member.getLikes().size();
        this.trashCount = member.getTrashes().size();
        this.point = member.getFishBowl().getCoin();
        this.trashDtoList = member.getTrashes().stream().map(myPageTrashDto::from).collect(Collectors.toList());
    }


}
