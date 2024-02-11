package com.Agari.TT.domain.FishBowl.Repository;

import com.Agari.TT.domain.FishBowl.Dto.FishBowlRankResponseDto;
import com.Agari.TT.domain.FishBowl.Entity.FishBowl;
import com.Agari.TT.domain.Member.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FishBowlRepository extends JpaRepository<FishBowl,Long> {

    @Query("select fb from FishBowl  fb where fb.member = ?1")
    FishBowl findByMember(Member member);

    @Modifying
    @Query("update FishBowl fb set fb.coin = fb.coin + ?1 where fb.member = ?2")
    int updateMemberCoin(int coin, Member member);


    @Query("SELECT fb " +
            "FROM FishBowl fb LEFT JOIN fb.likesList l " +
            "GROUP BY fb.id " +
            "ORDER BY COUNT(l) DESC, fb.id ASC")
    List<FishBowl> findAllSortByLikesCount();
}
