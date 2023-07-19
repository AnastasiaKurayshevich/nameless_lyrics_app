package com.lyrigator.lyrigator_app.repository;

import com.lyrigator.lyrigator_app.model.Song;
import org.springframework.data.repository.CrudRepository;

public interface JpaSongRepo extends CrudRepository<Song, Integer> {

}
