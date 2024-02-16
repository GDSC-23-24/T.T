package com.Agari.TT.domain.FishBowl.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class CommunityDto {
    List<PostDto> postDtoList;


}
