package com.Agari.TT.domain.FishBowl.Service;

import com.Agari.TT.domain.FishBowl.Dto.CommunityDto;
import com.Agari.TT.domain.FishBowl.Dto.FishBowlDto;
import com.Agari.TT.domain.FishBowl.Dto.FishBowlRankResponseDto;
import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.Likes.Entity.Likes;
import com.Agari.TT.domain.Likes.Repository.LikesRepository;
import com.Agari.TT.domain.Member.Dto.MemberDto;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.domain.Trash.Dto.TrashDto;
import com.Agari.TT.domain.Trash.Repository.TrashRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class FishBowlService {


    private final FishBowlRepository fishBowlRepository;

    private final MemberRepository memberRepository;

    private final TrashRepository trashRepository;

    private final LikesRepository likesRepository;

    public FishBowlDto visitHome(String loginId) {

        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));


        FishBowlDto fishBowlDto = FishBowlDto.from(fishBowlRepository.findByMember(member));

        return fishBowlDto;
    }

    public FishBowlDto visitHome(Long member_id) {

        Member member = memberRepository.findById(member_id)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));



        FishBowl fishBowl = fishBowlRepository.findByMember(member);

        fishBowlRepository.updateViewCount(fishBowl);

        FishBowlDto fishBowlDto = FishBowlDto.from2(fishBowl);

        return fishBowlDto;
    }

    public List<FishBowlRankResponseDto> rank(){
        List<FishBowlRankResponseDto> fishBowlRankResponseDtos = fishBowlRepository.findAllSortByLikesCount()
                .stream().map(FishBowlRankResponseDto::from).collect(Collectors.toList());

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

    public CommunityDto getCommunity(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        List<TrashDto> trashDtos = trashRepository.findRecentImage()
                .stream().map(TrashDto::from).collect(Collectors.toList());

        List<FishBowlDto> likesFishBowl = likesRepository.findFishBowlsLikedByMember(member)
                .stream().map(FishBowlDto::from3).collect(Collectors.toList());


        return new CommunityDto(trashDtos,likesFishBowl);
    }
}