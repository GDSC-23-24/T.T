package com.Agari.TT.domain.Trash.Repository;

import com.Agari.TT.domain.Trash.Entity.Trash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrashRepository extends JpaRepository<Trash,Long> {
}
