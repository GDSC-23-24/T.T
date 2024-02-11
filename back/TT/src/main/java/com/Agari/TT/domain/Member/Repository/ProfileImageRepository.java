package com.Agari.TT.domain.Member.Repository;

import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.OptionalInt;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImage,Long>  {

    @Query("select pi from ProfileImage pi where pi.member = ?1")
    Optional<ProfileImage> findByMember(Member member);
}
