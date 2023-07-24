package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "song_id")
    private int id;

    private String songName;

    private String genre;

    private String mood;

    private String description;

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
        if (songList != null) {
            for (LyricPart lyricPart : songList) {
                lyricPart.setSong(this);
            }
        }
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
