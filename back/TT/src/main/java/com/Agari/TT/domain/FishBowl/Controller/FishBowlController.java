package com.Agari.TT.domain.FishBowl.Controller;

import com.Agari.TT.domain.FishBowl.Dto.FishBowlDto;
import com.Agari.TT.domain.FishBowl.Service.FishBowlService;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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


    /**
     * 커뮤니티
     */

    /**
     *  어항 방문
     */

    /**
     * 팔로우
     */


}
