package com.Agari.TT.domain.FishBowl.Service;

import com.Agari.TT.domain.FishBowl.Dto.FishBowlDto;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FishBowlService {


    private final FishBowlRepository fishBowlRepository;

    private final MemberRepository memberRepository;

    public FishBowlDto home(String loginId){

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        FishBowlDto fishBowlDto =   FishBowlDto.from(fishBowlRepository.findByMember(member));

        return fishBowlDto;

    }
}