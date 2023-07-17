package com.lyrigator.lyrigator_app.model;

import com.lyrigator.lyrigator_app.model.Lyric;
import org.springframework.data.repository.CrudRepository;

public interface JpaLyricRepo extends CrudRepository<Lyric, Integer> {

}
