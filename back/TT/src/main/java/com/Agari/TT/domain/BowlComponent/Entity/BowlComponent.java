package com.Agari.TT.domain.BowlComponent.Entity;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
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
public class BowlComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bowl_component_id")
    private Long id;

    // fish, bowl, deco ...
    private String componentName;

    private Integer x;

    private Integer y;

    private Boolean isInBowl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fish_bowl_id")
    private FishBowl fishBowl;

}
