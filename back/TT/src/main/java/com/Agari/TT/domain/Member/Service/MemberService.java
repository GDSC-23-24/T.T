package com.Agari.TT.domain.Member.Service;

import com.Agari.TT.domain.ImageData.Entity.ImageData;
import com.Agari.TT.domain.ImageData.Service.ImageService;
import com.Agari.TT.domain.Member.Dto.SignInDto;
import com.Agari.TT.domain.Member.Dto.SignUpDto;
import com.Agari.TT.domain.Member.Entity.Enum.Role;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Entity.ProfileImage;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.domain.Member.Repository.ProfileImageRepository;
import com.Agari.TT.domain.Response.CommonResponse;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import com.Agari.TT.global.Jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    private final ImageService imageService;

    private final ProfileImageRepository profileImageRepository;

    private final JwtTokenProvider jwtTokenProvider;


    /**
     * 회원가입
     */
    @Transactional
    public CommonResponse save(MultipartFile profileImage, SignUpDto signUpDto) throws IOException {
        Optional<Member> presentMember = memberRepository.findByLoginId(signUpDto.getLoginId());

        if(presentMember.isPresent()) return new CommonResponse("이미 존재하는 회원입니다.",false);



        Member member = Member.builder()
                .loginId(signUpDto.getLoginId())
                .password(signUpDto.getPassword())
                .nickname(signUpDto.getNickname())
                .coin(0)
                .role(Role.USER)
                .build();

        memberRepository.save(member);

        if(profileImage.isEmpty()) return new CommonResponse(member.getNickname() + " 회원님 성공적으로 저장되었습니다.");


        String filePath = imageService.exec(profileImage);

        ImageData image = ImageData.builder()
                .name(profileImage.getOriginalFilename())
                .type(profileImage.getContentType())
                .filePath(filePath)
                .member(member)
                .isProfileImage(true)
                .build();

        imageService.save(image);


        ProfileImage profileImageBuilder = ProfileImage.builder()
                .imageData(image)
                .member(member)
                .build();

        profileImageRepository.save(profileImageBuilder);

        return new CommonResponse(member.getNickname()+" 회원님 프로필이미지와 함께 성공적으로 저장되었습니다.");

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
}
