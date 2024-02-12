package com.Agari.TT.domain.FishBowl.Entity;

import com.Agari.TT.domain.Likes.Entity.Likes;
import com.Agari.TT.domain.Member.Entity.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FishBowl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fish_bowl_id")
    private Long id;

    private Integer coin;


    // one to many는 패치 쓰면 안됨.
    @OneToMany(mappedBy = "fishBowl" ,fetch = FetchType.LAZY)
    List<Likes> likesList;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
