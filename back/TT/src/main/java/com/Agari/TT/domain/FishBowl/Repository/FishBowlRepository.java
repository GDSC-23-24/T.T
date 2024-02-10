package com.Agari.TT.domain.FishBowl.Repository;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.Member.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FishBowlRepository extends JpaRepository<FishBowl,Long> {

    @Query("select fb from FishBowl  fb where fb.member = ?1")
    FishBowl findByMember(Member member);
}
