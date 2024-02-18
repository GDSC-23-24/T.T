package com.Agari.TT.domain.Member.Dto;

import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Trash.Dto.MyPageTrashDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor
public class MyPageResponseDto {
    Long id;

    String nickname;

    String profileImageUrl;

    Integer likesCount;

    Integer point;

    Integer waitingCount;

    Integer completeCount;

    List<MyPageTrashDto> trashDtoList;

    public MyPageResponseDto(Member member){
        this.id = member.getId();
        this.profileImageUrl = member.getProfileImageUrl();
        this.nickname = member.getNickname();
        this.likesCount = member.getLikes().size();
        this.point = member.getFishBowl().getCoin();
        this.trashDtoList = member.getTrashes().stream().map(MyPageTrashDto::from).collect(Collectors.toList());
        this.waitingCount = countWaiting(trashDtoList);
        this.completeCount = trashDtoList.size() - waitingCount;
    }

    private int countWaiting(List<MyPageTrashDto> myPageTrashDto){

        int count = 0;

        for(MyPageTrashDto myPageTrashDto1 : myPageTrashDto){
            if(myPageTrashDto1.getStatus().equals("waiting")){
                count += 1;
            }
        }

        return count;

    }


}
