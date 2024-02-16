package com.Agari.TT.domain.BowlComponent.Service;

import com.Agari.TT.domain.BowlComponent.Controller.BowlComponentController;
import com.Agari.TT.domain.BowlComponent.Dto.ComponentDto;
import com.Agari.TT.domain.BowlComponent.Dto.ComponentRequestDto;
import com.Agari.TT.domain.BowlComponent.Dto.ComponentResponseDto;
import com.Agari.TT.domain.BowlComponent.Entity.BowlComponent;
import com.Agari.TT.domain.BowlComponent.Repository.BowlRepository;
import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BowlService {

    private final BowlRepository bowlRepository;

    private final FishBowlRepository fishBowlRepository;

    private final MemberRepository memberRepository;


    /**
     * 어항 컴포넌트 구매
     */
    @Transactional
    public void purchaseComponent(ComponentDto componentDto,String loginId){

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        FishBowl fishBowl = fishBowlRepository.findByMember(member);

        if((fishBowl.getCoin() - componentDto.getCoin() )< 0){
            throw new CustomException(CustomErrorCode.INSUFFICIENT_FUNDS);
        }

        fishBowlRepository.updateMemberCoin(-componentDto.getCoin(),member);

        BowlComponent bowlComponent = BowlComponent.builder()
                .isInBowl(false)
                .componentName(componentDto.getComponentName())
                .fishBowl(fishBowl)
                .build();

        bowlRepository.save(bowlComponent);

    }

    public void saveEdited(List<ComponentRequestDto> componentRequestDto, String loginId) {


        for(ComponentRequestDto dto : componentRequestDto){
            bowlRepository.editPoint(dto.getId(),dto.getX(),dto.getY());
        }

    }

    /**
     *  어항 편집창
     */
    public List<ComponentResponseDto> getMyComponents(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        FishBowl fishBowl = fishBowlRepository.findByMember(member);

        List<ComponentResponseDto> bowlComponents = bowlRepository.findAllByFishBowlId(fishBowl.getId())
                .stream().map(ComponentResponseDto::from).collect(Collectors.toList());

        return bowlComponents;

    }
}
