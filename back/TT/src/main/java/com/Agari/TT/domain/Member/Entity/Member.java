package com.Agari.TT.domain.Member.Entity;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.ImageData.Entity.ImageData;
import com.Agari.TT.domain.Likes.Entity.Likes;
import com.Agari.TT.domain.Member.Entity.Enum.Role;
import com.Agari.TT.domain.Trash.Entity.Trash;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Fetch;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {
    @Id
    @GeneratedValue( strategy =  GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    // 로그인 아이디
    @Column(nullable = false)
    private String loginId;

    @Column(nullable = false)
    private String password;

    private String nickname;

    private String profileImageUrl;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @CreationTimestamp
    private LocalDateTime createdAt;

//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
//    private List<ImageData> imageData;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "member")
    private List<Likes> likes;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member")
    private List<Trash> trashes;

    @OneToOne(mappedBy = "member")
    private FishBowl fishBowl;

}
