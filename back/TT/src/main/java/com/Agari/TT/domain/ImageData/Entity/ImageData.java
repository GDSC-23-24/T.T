package com.Agari.TT.domain.ImageData.Entity;

import com.Agari.TT.domain.Member.Entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

    private String name;

    private String type;

    private String filePath;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @ManyToOne
    private Member member;

    private Boolean isProfileImage;


}
