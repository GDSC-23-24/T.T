package com.Agari.TT.domain.FishBowl.Service;

import com.Agari.TT.domain.FishBowl.Dto.FishBowlDto;
import com.Agari.TT.domain.FishBowl.Dto.FishBowlRankResponseDto;
import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.Likes.Entity.Likes;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FishBowlService {


    private final FishBowlRepository fishBowlRepository;

    private final MemberRepository memberRepository;

    public FishBowlDto home(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));


        FishBowlDto fishBowlDto = FishBowlDto.from(fishBowlRepository.findByMember(member));

        return fishBowlDto;
    }

    public FishBowlDto home(Long member_id) {

        Member member = memberRepository.findById(member_id)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));


        FishBowlDto fishBowlDto = FishBowlDto.from2(fishBowlRepository.findByMember(member));

        return fishBowlDto;
    }

    public List<FishBowlRankResponseDto> rank(){
        List<FishBowlRankResponseDto> fishBowlRankResponseDtos = fishBowlRepository.findAllSortByLikesCount()
                .stream().map(FishBowlRankResponseDto::from).collect(Collectors.toList());

        log.info("fdsfdsfsfs");

        List<FishBowl> fishBowls = fishBowlRepository.findAll();

        log.info("2");

        int a = fishBowls.get(0).getLikesList().size();

        return fishBowlRankResponseDtos;

    }

    public List<FishBowlRankResponseDto> getMyLikes(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        List<Likes> likes = member.getLikes();

        List<FishBowlRankResponseDto> fishBowlRankResponseDtos = fishBowlRepository.findAllByMemberLikes(likes)
                .stream().map(FishBowlRankResponseDto::from).collect(Collectors.toList());

        return fishBowlRankResponseDtos;
    }
}