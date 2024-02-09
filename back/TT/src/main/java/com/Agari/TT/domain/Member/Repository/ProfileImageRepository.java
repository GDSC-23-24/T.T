package com.Agari.TT.domain.Member.Repository;

import com.Agari.TT.domain.Member.Entity.ProfileImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileImageRepository extends JpaRepository<ProfileImage,Long>  {
}
