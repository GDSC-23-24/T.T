package com.Agari.TT.domain.BowlComponent.Repository;

import com.Agari.TT.domain.BowlComponent.Entity.BowlComponent;
import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BowlRepository extends JpaRepository<BowlComponent,Long> {

    @Modifying
    @Query("update BowlComponent bc set bc.x = ?2, bc.y = ?3, bc.isInBowl=true where bc.id = ?1")
    void editPoint(Long id, Integer x, Integer y);


    @Query("select bc from BowlComponent bc where bc.fishBowl.id = ?1")
    List<BowlComponent> findAllByFishBowlId(Long id);
}
