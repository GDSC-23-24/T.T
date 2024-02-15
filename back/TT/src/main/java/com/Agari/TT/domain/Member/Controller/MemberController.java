package com.Agari.TT.domain.Member.Controller;

import com.Agari.TT.domain.Member.Dto.MyPageResponseDto;
import com.Agari.TT.domain.Member.Dto.SignInDto;
import com.Agari.TT.domain.Member.Dto.SignUpDto;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Member.Service.MemberService;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Response.ListResponse;
import com.Agari.TT.domain.Response.ResponseService;
import com.Agari.TT.domain.Response.SingleResponse;
import com.Agari.TT.domain.Trash.Dto.MyPageTrashDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    ResponseService responseService;

    /**
     * 회원가입
     */
    @PostMapping("/api/sign-up")
    public CommonResponse signUp(@RequestPart MultipartFile profileImage, @RequestPart SignUpDto signUpDto) throws IOException {
        return memberService.save(profileImage, signUpDto);
    }


    /**
     * 로그인
     */
    @PostMapping("api/sign-in")
    public SingleResponse signIn(@RequestBody SignInDto signInDto){
        String token = memberService.signIn(signInDto);

        return responseService.getSingleResponse(token);
    }


    /**
     * 마이페이지
     */
    @GetMapping("/api/my-page")
    public SingleResponse MyPage(@AuthenticationPrincipal MemberDetail memberDetail){

        MyPageResponseDto responseDto = memberService.myPage(memberDetail.getUsername());

        return responseService.getSingleResponse(responseDto);
    }

    /**
     * 마이페이지 캘린더
     */
    @GetMapping("/api/my-page/calender")
    public ListResponse myPageCalender(@AuthenticationPrincipal MemberDetail memberDetail){
        List<MyPageTrashDto> myPageTrashDto = memberService.myPageCalender(memberDetail.getUsername());

        return responseService.getListResponse(myPageTrashDto);

    }

    
}
