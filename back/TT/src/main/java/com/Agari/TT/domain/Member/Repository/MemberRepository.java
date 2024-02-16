package com.Agari.TT.domain.Member.Repository;

import com.Agari.TT.domain.Member.Dto.MemberDto;
import com.Agari.TT.domain.Member.Entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {

    @Query("select m from Member m where m.loginId = ?1")
    Optional<Member> findByLoginId(String loginId);


    @Query("select m from Member m left join Trash t on m.id = t.member.id where m.loginId = ?1")
    Optional<Member> findByLoginIdJoin(String loginId);



    List<MemberDto> findByLikes(Member member);
}
