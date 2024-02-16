package com.Agari.TT.domain.BowlComponent.Dto;

import com.Agari.TT.domain.BowlComponent.Entity.BowlComponent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ComponentResponseDto {
    Long id;

    String componentName;

    Integer x;

    Integer y;

    Boolean isInBowl;

    public static ComponentResponseDto from(BowlComponent bowlComponent){
        return new ComponentResponseDto(
                bowlComponent.getId(),
                bowlComponent.getComponentName(),
                bowlComponent.getX(),
                bowlComponent.getY(),
                bowlComponent.getIsInBowl()
        );
    }
}
