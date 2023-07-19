package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

@Entity
public class Song {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private int id;

    private String inner_id =  UUID.randomUUID().toString();

    private String songName;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "song_id")
    private List<LyricPart> songList;

    public Song() {
    }

    public int getId() {
        return id;
    }

    public String getInner_id() {
        return inner_id;
    }

    public void setInner_id(String inner_id) {
        this.inner_id = inner_id;
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
