package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
public class LyricPart {

    @Id
    @Column(name = "lyric_part_id")
    private String lyricPartId;

    private String lyricTitle;

    private String lyric;

    public LyricPart(String lyricTitle, String lyric) {
        this.lyricTitle = lyricTitle;
        this.lyric = lyric;
    }

    public LyricPart() {
        this.lyricPartId = UUID.randomUUID().toString();
    }

    public String getLyricPartId() {
        return lyricPartId;
    }

    public String getLyricTitle() {
        return lyricTitle;
    }

    public void setLyricTitle(String lyricTitle) {
        this.lyricTitle = lyricTitle;
    }

    public String getLyric() {
        return lyric;
    }

    public void setLyric(String lyric) {
        this.lyric = lyric;
    }
}
