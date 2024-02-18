package com.Agari.TT.domain.FishBowl.Dto;

import com.Agari.TT.domain.BowlComponent.Dto.ComponentResponseDto;
import com.Agari.TT.domain.BowlComponent.Entity.BowlComponent;
import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.Member.Dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class FishBowlDto {

    Long id;

    Integer likesCount;

    Integer coin;

    Integer viewCount;

    MemberDto memberDto;

    List<ComponentResponseDto> componentResponseDtoList;

    public static FishBowlDto from(FishBowl fishBowl){
        return  new FishBowlDto(
                fishBowl.getId(),
                fishBowl.getLikesList().size(),
                fishBowl.getCoin(),
                fishBowl.getViewCount(),
                MemberDto.from(fishBowl.getMember()),
                null
        );
    }

    public static FishBowlDto from2(FishBowl fishBowl){
        return  new FishBowlDto(
                fishBowl.getId(),
                fishBowl.getLikesList().size(),
                null,
                fishBowl.getViewCount() + 1,
                MemberDto.from(fishBowl.getMember()),
                null
        );
    }

    public static FishBowlDto from3(FishBowl fishBowl){
        return  new FishBowlDto(
                fishBowl.getId(),
                fishBowl.getLikesList().size(),
                null,
                null,
                MemberDto.from(fishBowl.getMember()),
                null
        );
    }





}
