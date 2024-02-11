package com.Agari.TT.domain.Member.Service;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.FishBowl.Repository.FishBowlRepository;
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
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;
import java.util.UUID;

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

    private final ProfileImageRepository profileImageRepository;

    private final JwtTokenProvider jwtTokenProvider;

    private final FishBowlRepository fishBowlRepository;



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
                .role(Role.USER)
                .build();

        memberRepository.save(member);


        FishBowl fishBowl = FishBowl.builder()
                .coin(0)
                .member(member)
                .build();

        fishBowlRepository.save(fishBowl);


        if(profileImage.isEmpty()) return new CommonResponse(member.getNickname() + " 회원님 성공적으로 저장되었습니다.");


        String url = this.exec(profileImage);

        ProfileImage profileImageBuilder = ProfileImage.builder()
                .name(profileImage.getOriginalFilename())
                .profileImageUrl(url)
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




    public String exec(MultipartFile multipartFile) throws IOException {
        InputStream keyFile = ResourceUtils.getURL(keyFileName).openStream();

        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();


        // 구글 클라우드 스토리지 옵션과 제공된 인증 자격 증명을 사용하여 Storage 객체를 생성합니다.
        Storage storage = StorageOptions.newBuilder()
                .setCredentials(GoogleCredentials.fromStream(keyFile))
                .build()
                .getService();


        // GCS 버킷 이름 및 생성된 고유 식별자를 사용하여 업로드된 이미지의 초기 URL을 구성합니다.
        // 업로드된 파일이 비어있으면 imgUrl을 null로 설정합니다.
        // 그렇지 않으면 파일을 storage.create 메소드를 사용하여 GCS에 업로드하는 로직으로 진행됩니다.
        String imgUrl = "https://storage.googleapis.com/" + bucketName + "/" + uuid;

        if (multipartFile.isEmpty()) {
            imgUrl = null;
        } else {
            BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, uuid)
                    .setContentType(ext).build();

            Blob blob = storage.create(blobInfo, multipartFile.getInputStream());
        }

        return imgUrl;
    }
}
