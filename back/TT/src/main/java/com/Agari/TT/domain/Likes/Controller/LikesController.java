package com.Agari.TT.domain.Likes.Controller;

import com.Agari.TT.domain.Likes.Service.LikesService;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.CommonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LikesController {

    @Autowired
    LikesService likesService;

    /**
     * 좋아요 추가 및 삭제
     */
    @PostMapping("/api/likes/{fish_bowl_id}")
    public CommonResponse updateLikes(@PathVariable("fish_bowl_id") Long fishBowlId,
            @AuthenticationPrincipal MemberDetail memberDetail){
        String msg = likesService.update(memberDetail.getUsername(),fishBowlId);

        return new CommonResponse(msg);
    }
}
