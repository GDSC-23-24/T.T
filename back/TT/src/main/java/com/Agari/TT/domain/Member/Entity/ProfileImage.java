package com.Agari.TT.domain.Member.Entity;

import com.Agari.TT.domain.ImageData.Entity.ImageData;
import com.Agari.TT.domain.Member.Entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileImage {
    @Id
    @GeneratedValue( strategy =  GenerationType.IDENTITY)
    @Column(name = "profile_image_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "image_id")
    ImageData imageData;

    @OneToOne
    @JoinColumn(name = "member_id")
    Member member;

}
