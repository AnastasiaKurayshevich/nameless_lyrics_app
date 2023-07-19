package com.lyrigator.lyrigator_app.model;

import jakarta.persistence.*;

@Entity
public class LyricPart {

    @Id
    @Column(name = "lyric_part_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int lyricPartId;

    private String lyricTitle;

    private String lyric;

    public LyricPart(String lyricTitle, String lyric) {
        this.lyricTitle = lyricTitle;
        this.lyric = lyric;
    }

    public LyricPart() {

    }

    public int getLyricPartId() {
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
