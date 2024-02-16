package com.Agari.TT.domain.BowlComponent.Controller;

import com.Agari.TT.domain.BowlComponent.Dto.ComponentDto;
import com.Agari.TT.domain.BowlComponent.Dto.ComponentRequestDto;
import com.Agari.TT.domain.BowlComponent.Dto.ComponentResponseDto;
import com.Agari.TT.domain.BowlComponent.Service.BowlService;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Response.ListResponse;
import com.Agari.TT.domain.Response.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BowlComponentController {

    @Autowired
    BowlService bowlService;

    @Autowired
    ResponseService responseService;

    /**
     * 상점에서 구매
     */

    @PostMapping("/api/component/store")
    public CommonResponse purchaseComponent(@RequestBody ComponentDto componentDto,
                                            @AuthenticationPrincipal MemberDetail memberDetail){

        bowlService.purchaseComponent(componentDto, memberDetail.getUsername());

        return new CommonResponse("성공적으로 구매하였습니다.");
    }

    /**
     *  편집 저장
     */

    @PostMapping("/api/component/edit")
    public CommonResponse saveFishBowl(@RequestBody List<ComponentRequestDto> componentRequestDto,
                                       @AuthenticationPrincipal MemberDetail memberDetail){

        bowlService.saveEdited(componentRequestDto,memberDetail.getUsername());

        return new CommonResponse("성공적으로 저장되었습니다.");
    }

    /**
     *  편집창 열기
     */

    @GetMapping("/api/component/edit")
    public ListResponse editFishBowl(@AuthenticationPrincipal MemberDetail memberDetail){
        List<ComponentResponseDto> componentResponseDtos = bowlService.getMyComponents(memberDetail.getUsername());

        return responseService.getListResponse(componentResponseDtos);
    }
}
