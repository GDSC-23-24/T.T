package com.Agari.TT.domain.FishBowl.Dto;

import com.Agari.TT.domain.Member.Dto.MemberDto;
import com.Agari.TT.domain.Trash.Dto.TrashDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class CommunityDto {
    List<TrashDto> trashDtos;

    List<FishBowlDto> likesFishBowl;

}
