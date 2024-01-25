package com.caio.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.caio.backend.entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
	
	//@Query("SELECT e FROM Event e WHERE e.user.id = :userId")
    List<Event> findAllByUserId(Long userId);

}
