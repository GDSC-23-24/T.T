package com.Agari.TT.domain.Likes.Controller;

import com.Agari.TT.domain.Likes.Dto.LikesResponseDto;
import com.Agari.TT.domain.Likes.Service.LikesService;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LikesController {

    @Autowired
    LikesService likesService;

    @Autowired
    ResponseService responseService;

    /**
     * 좋아요 추가 및 삭제
     */
    @PostMapping("/api/likes/{fish_bowl_id}")
    public SingleResponse updateLikes(@PathVariable("fish_bowl_id") Long fishBowlId,
                                      @AuthenticationPrincipal MemberDetail memberDetail){
        LikesResponseDto likesResponseDto = likesService.update(memberDetail.getUsername(),fishBowlId);

        SingleResponse response = responseService.getSingleResponse(likesResponseDto.getLikesCount());
        response.setMessage(likesResponseDto.getMsg());

        return response;
    }
}
