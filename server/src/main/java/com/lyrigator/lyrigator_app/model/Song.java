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


    private String songName;

    @OneToMany(mappedBy = "song", cascade = CascadeType.ALL)
    private List<LyricPart> songList;

    public Song() {
    }

    public int getId() {
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
