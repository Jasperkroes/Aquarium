package com.fishtank.services;

import com.fishtank.model.Fish;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FishService extends CrudRepository<Fish, Integer > {
	Optional<Fish> findById(int id);
}
