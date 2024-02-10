package com.Agari.TT.domain.Member.Dto;

import com.Agari.TT.domain.Member.Entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
@AllArgsConstructor
public class MemberDto {

    Long id;

    String loginId;

    String nickname;

    String profileImageUrl;

    public static MemberDto from(Member member){
        return new MemberDto(
                member.getId(),
                member.getLoginId(),
                member.getNickname(),
                member.getProfileImage().getImageData().getFilePath()
        );
    }

}
