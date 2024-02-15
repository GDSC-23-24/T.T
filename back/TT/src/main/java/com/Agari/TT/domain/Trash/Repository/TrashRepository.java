package com.Agari.TT.domain.Trash.Repository;

import com.Agari.TT.domain.Trash.Dto.MyPageTrashDto;
import com.Agari.TT.domain.Trash.Entity.Trash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrashRepository extends JpaRepository<Trash,Long> {

    @Query("select t from Trash t left join t.member m on m.loginId = ?1 ")
    List<MyPageTrashDto> findByLoginId(String loginId);
}
