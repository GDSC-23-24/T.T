package com.Agari.TT.domain.Member.Service;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
import com.Agari.TT.domain.ImageData.Service.ImageService;
import com.Agari.TT.domain.Member.Dto.MyPageResponseDto;
import com.Agari.TT.domain.Member.Dto.SignInDto;
import com.Agari.TT.domain.Member.Dto.SignUpDto;
import com.Agari.TT.domain.Member.Entity.Enum.Role;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.domain.Trash.Dto.MyPageTrashDto;
import com.Agari.TT.domain.Trash.Repository.TrashRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import com.Agari.TT.global.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    @Value("${spring.cloud.gcp.storage.credentials.location}")
    private  String keyFileName;

    @Value("${spring.cloud.gcp.storage.bucket}")
    private String bucketName;

    private final MemberRepository memberRepository;

    private final ImageService imageService;

    private final JwtTokenProvider jwtTokenProvider;

    private final FishBowlRepository fishBowlRepository;

    private final TrashRepository trashRepository;



    /**
     * 회원가입
     */
    @Transactional
    public CommonResponse save(MultipartFile profileImage, SignUpDto signUpDto) throws IOException {
        Optional<Member> presentMember = memberRepository.findByLoginId(signUpDto.getLoginId());

        if(presentMember.isPresent()) return new CommonResponse("이미 존재하는 회원입니다.",false);


        Member member;

        if (profileImage.isEmpty()){
            member = Member.builder()
                    .loginId(signUpDto.getLoginId())
                    .password(signUpDto.getPassword())
                    .nickname(signUpDto.getNickname())
                    .role(Role.USER)
                    .build();
        }

        else{

            String url = imageService.exec(profileImage);

            member = Member.builder()
                    .loginId(signUpDto.getLoginId())
                    .password(signUpDto.getPassword())
                    .nickname(signUpDto.getNickname())
                    .profileImageUrl(url)
                    .role(Role.USER)
                    .build();
        }


        memberRepository.save(member);


        FishBowl fishBowl = FishBowl.builder()
                .coin(0)
                .viewCount(0)
                .member(member)
                .build();

        fishBowlRepository.save(fishBowl);


        return new CommonResponse(member.getNickname()+"님 회원가입이 완료되었습니다.");

    }


    /**
     * 로그인
     */
    public String signIn(SignInDto signInDto) {
        Member member = memberRepository.findByLoginId(signInDto.getLoginId())
                .orElseThrow(() ->  new CustomException(CustomErrorCode.USER_NOT_FOUND));

        if(!member.getPassword().equals(signInDto.getPassword())) throw new CustomException(CustomErrorCode.PASSWORD_NOT_MATCH);

        String token = jwtTokenProvider.createToken(signInDto.getLoginId(),member.getRole());

        return token;

    }

    /**
     * 마이페이지
     */
    public MyPageResponseDto myPage(String loginId){
        Member member = memberRepository.findByLoginIdJoin(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        MyPageResponseDto myPageResponseDto = new MyPageResponseDto(member);



        return myPageResponseDto;

    }


    /**
     * MyPage Calender
     */
    public List<MyPageTrashDto> myPageCalender(String loginId) {
        List<MyPageTrashDto> myPageTrashDto = trashRepository.findByLoginId(loginId);

        return myPageTrashDto;

    }
}
