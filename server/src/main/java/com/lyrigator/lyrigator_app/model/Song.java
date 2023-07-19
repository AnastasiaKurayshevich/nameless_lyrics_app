package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Song {

    @Id
//    @Column(name = "lyric_id")
    private String  id;

    private String lyricName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "lyric_id")
    private List<LyricPart> lyricList;

    public Song() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }


    public String getLyricName() {
        return lyricName;
    }

    public void setLyricName(String lyricName) {
        this.lyricName = lyricName;
    }

    public List<LyricPart> getLyricList() {
        return lyricList;
    }

    public void setLyricList(List<LyricPart> lyricList) {
        this.lyricList = lyricList;
    }
}
