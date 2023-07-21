package com.lyrigator.lyrigator_app.model;

public class Structure {

    private String name;

    private String lyrics;

    public Structure(String name, String lyrics) {
        this.name = name;
        this.lyrics = lyrics;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLyrics() {
        return lyrics;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    @Override
    public String toString() {
        return "{" +
                "name='" + name + '\'' +
                ", lyrics='" + lyrics + '\'' +
                '}';
    }
}
