package com.Agari.TT.domain.Trash.Controller;

import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import com.Agari.TT.domain.Trash.Service.TrashService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class TrashController {

    @Autowired
    TrashService trashService;

    @Autowired
    ResponseService responseService;


    /**
     * 쓰레기 사진 업로드
     */
    @Operation(summary = "쓰레기 사진 업로드 후 코인 지급")
    @PostMapping("/api/trash")
    public SingleResponse uploadTrash( @RequestPart MultipartFile trashImage,
                                      @AuthenticationPrincipal MemberDetail memberDetail) throws IOException {

        int coin = trashService.save(trashImage,memberDetail.getUsername());

        return responseService.getSingleResponse(coin);
    }
}
