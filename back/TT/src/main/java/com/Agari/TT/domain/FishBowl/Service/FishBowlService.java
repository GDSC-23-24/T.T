package com.Agari.TT.domain.FishBowl.Service;

import com.Agari.TT.domain.FishBowl.Dto.FishBowlDto;
import com.Agari.TT.domain.FishBowl.Dto.FishBowlRankResponseDto;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Entity.ProfileImage;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.domain.Member.Repository.ProfileImageRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FishBowlService {


    private final FishBowlRepository fishBowlRepository;

    private final MemberRepository memberRepository;

    private final ProfileImageRepository profileImageRepository;

    public FishBowlDto home(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        Optional<ProfileImage> profileImage = profileImageRepository.findByMember(member);

        FishBowlDto fishBowlDto;

        if (profileImage.isEmpty()) fishBowlDto = FishBowlDto.from(fishBowlRepository.findByMember(member));


        else
            fishBowlDto = FishBowlDto.from(fishBowlRepository.findByMember(member), profileImage.get().getProfileImageUrl());


        return fishBowlDto;
    }

    public List<FishBowlRankResponseDto> rank(){
        List<FishBowlRankResponseDto> fishBowlRankResponseDtos = fishBowlRepository.findAllSortByLikesCount()
                .stream().map(FishBowlRankResponseDto::from).collect(Collectors.toList());

        return fishBowlRankResponseDtos;

    }
}