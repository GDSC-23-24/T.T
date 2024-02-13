package com.Agari.TT.domain.FishBowl.Controller;

import com.Agari.TT.domain.FishBowl.Dto.FishBowlDto;
import com.Agari.TT.domain.FishBowl.Dto.FishBowlRankResponseDto;
import com.Agari.TT.domain.FishBowl.Service.FishBowlService;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.ListResponse;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class FishBowlController {

    @Autowired
    FishBowlService fishBowlService;

    @Autowired
    ResponseService responseService;


    /**
     * 어항 home
     */

    @GetMapping("/api/fish-bowl/home")
    public SingleResponse fishHome(@AuthenticationPrincipal MemberDetail memberDetail){
        FishBowlDto fishBowlDto = fishBowlService.home(memberDetail.getUsername());
        return responseService.getSingleResponse(fishBowlDto);
    }

    /**
     * 랭킹
     */
    @GetMapping("/api/fish-bowl/ranking")
    public ListResponse fishRanking(){
        List<FishBowlRankResponseDto> fishBowlRankResponseDto = fishBowlService.rank();

        return responseService.getListResponse(fishBowlRankResponseDto);

    }


    /**
     * 커뮤니티
     */


    /**
     *  어항 방문
     */

    /**
     * 좋아요 목록
     */
    @GetMapping("/api/fish-bowl/likes")
    public ListResponse fishLikes(@AuthenticationPrincipal MemberDetail memberDetail){
        List<FishBowlRankResponseDto> fishBowlRankResponseDtos = fishBowlService.getMyLikes(memberDetail.getUsername());

        return responseService.getListResponse(fishBowlRankResponseDtos);
    }



}
