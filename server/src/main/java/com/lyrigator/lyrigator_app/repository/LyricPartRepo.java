package com.lyrigator.lyrigator_app.repository;

import com.lyrigator.lyrigator_app.model.LyricPart;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LyricPartRepo extends CrudRepository<LyricPart, Integer> {}

