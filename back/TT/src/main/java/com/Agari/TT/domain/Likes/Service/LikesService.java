package com.Agari.TT.domain.Likes.Service;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.Likes.Entity.Likes;
import com.Agari.TT.domain.Likes.Repository.LikesRepository;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikesService {

    private final MemberRepository memberRepository;

    private final LikesRepository likesRepository;

    private final FishBowlRepository fishBowlRepository;


    public String update(String loginId, Long fishBowlId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        FishBowl fishBowl = fishBowlRepository.findById(fishBowlId)
                .orElseThrow(()->new CustomException(CustomErrorCode.FISHBOWL_NOT_FOUND));


        Optional<Likes> likes = likesRepository.findByMemberAndFishBowlId(member,fishBowl);

        if (likes.isPresent()){
            likesRepository.delete(likes.get());

            return "좋아요 삭제";
        }

        Likes likes1 = Likes.builder()
                .fishBowl(fishBowl)
                .member(member)
                .build();

        likesRepository.save(likes1);

        return "좋아요 추가";
    }
}
