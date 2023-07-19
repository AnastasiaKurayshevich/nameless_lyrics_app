package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Song {

    @Id
//    @Column(name = "lyric_id")
    private String  id;

    private String songName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "song_id")
    private List<LyricPart> songList;

    public Song() {
        this.id = UUID.randomUUID().toString();
    }

    public String getId() {
        return id;
    }


    public String getSongName() {
        return songName;
    }

    public void setSongName(String songName) {
        this.songName = songName;
    }

    public List<LyricPart> getSongList() {
        return songList;
    }

    public void setSongList(List<LyricPart> songList) {
        this.songList = songList;
    }
}
