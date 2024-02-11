package com.Agari.TT.domain.FishBowl.Dto;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.Member.Dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FishBowlRankResponseDto {
    Long id;

    Integer likesCount;

    MemberDto memberDto;

    public static FishBowlRankResponseDto from(FishBowl fishBowl){
        return new FishBowlRankResponseDto(
                fishBowl.getId(),
                fishBowl.getLikesList().size(),
                MemberDto.from(fishBowl.getMember())
        );
    }
}
