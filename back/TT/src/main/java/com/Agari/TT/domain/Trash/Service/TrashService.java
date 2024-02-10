package com.Agari.TT.domain.Trash.Service;

import com.Agari.TT.domain.ImageData.Service.ImageService;
import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import com.Agari.TT.domain.Member.Service.MemberService;
import com.Agari.TT.domain.Trash.Entity.Trash;
import com.Agari.TT.domain.Trash.Repository.TrashRepository;
import com.Agari.TT.global.Exception.CustomErrorCode;
import com.Agari.TT.global.Exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class TrashService {

    private final ImageService imageService;

    private final MemberRepository memberRepository;

    private final TrashRepository trashRepository;


    public int save(MultipartFile trashImage, String loginId) throws IOException {
        String url = imageService.exec(trashImage);

        Member member =  memberRepository.findByLoginId(loginId)
                .orElseThrow(() -> new CustomException(CustomErrorCode.USER_NOT_FOUND));

        // 여기서 이제 ai랑 연동하는데 내가 url만 주면 바로 사진 가져가서 분석이 가능한 지 (지금은 대충 받았다고 치겠음)

        String trashType = "플라스틱";

        Trash trash = Trash.builder()
                .filePath(url)
                .trashType(trashType)
                .member(member)
                .build();

        // 쓰레기 타입에 따른 코인 차등 부여 (추후 작성)

        trashRepository.save(trash);

        memberRepository.updateMemberCoin(500,member);

        return 500;
    }
}
