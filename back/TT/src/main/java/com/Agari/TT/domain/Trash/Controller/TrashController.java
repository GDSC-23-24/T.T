package com.Agari.TT.domain.Trash.Controller;

import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import com.Agari.TT.domain.Trash.Dto.ImageUploadResponseDto;
import com.Agari.TT.domain.Trash.Service.TrashService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.hibernate.tool.schema.spi.CommandAcceptanceException;
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

        ImageUploadResponseDto imageUploadResponseDto = trashService.save(trashImage,memberDetail.getUsername());

        SingleResponse response = responseService.getSingleResponse(imageUploadResponseDto.getCoin());

        if(imageUploadResponseDto.getMsg().equals("관리자 승인 요청 대기 중"))
            response.setFailResponse(imageUploadResponseDto.getMsg());

        return response;
    }




}
