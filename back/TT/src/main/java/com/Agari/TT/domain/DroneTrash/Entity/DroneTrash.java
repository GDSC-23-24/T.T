package com.Agari.TT.domain.DroneTrash.Entity;

import com.Agari.TT.domain.ImageData.Entity.ImageData;
import com.Agari.TT.domain.Member.Entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DroneTrash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column( name = "drone_trash_id")
    private Long id;


    @CreationTimestamp
    private LocalDateTime createdAt;

    @OneToMany(fetch = FetchType.LAZY,mappedBy = "droneTrash")
    List<ImageData> images;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;

}
