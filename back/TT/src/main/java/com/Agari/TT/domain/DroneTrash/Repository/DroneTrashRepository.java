package com.Agari.TT.domain.DroneTrash.Repository;

import com.Agari.TT.domain.DroneTrash.Entity.DroneTrash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DroneTrashRepository extends JpaRepository<DroneTrash,Long> {
}
