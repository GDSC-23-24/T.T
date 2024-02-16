package com.Agari.TT.domain.Likes.Repository;

import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.Likes.Entity.Likes;
import com.Agari.TT.domain.Member.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikesRepository extends JpaRepository<Likes,Long> {

    @Query("select l from Likes l where l.member = ?1 and l.fishBowl = ?2")
    Optional<Likes> findByMemberAndFishBowlId(Member member, FishBowl fishBowl);
}
