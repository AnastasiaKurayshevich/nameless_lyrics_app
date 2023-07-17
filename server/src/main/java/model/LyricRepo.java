package model;

import org.springframework.stereotype.Repository;

@Repository
public class LyricRepo {
    JpaLyricRepo repo;

    public LyricRepo(JpaLyricRepo repo) {
        this.repo = repo;
    }


}
