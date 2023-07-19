package com.lyrigator.lyrigator_app;


import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.model.LyricPart;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class SongTest {

//    Song lyric;
//    LyricPart lyricPart;
//
//    public SongTest(Song lyric, LyricPart lyricPart) {
//        this.lyric = lyric;
//        this.lyricPart = lyricPart;
//    }

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testIfWeCanCreateNewLyric() {
        Song songSong = new Song();
        songSong.setLyricName("SongLyric yoyoyo");
        LyricPart lyricPart1 = new LyricPart("verse1", "test lyric1");
        LyricPart lyricPart2 = new LyricPart("verse2", "test lyric2");
        List<LyricPart> list = new ArrayList<>();
        list.add(lyricPart1);
        list.add(lyricPart2);
        songSong.setLyricList(list);

        Song saveSong = entityManager.persistAndFlush(songSong);

        Song retrievedSong = entityManager.find(Song.class, saveSong.getId());

        // Perform assertions to check the saved and retrieved lyric
        assertEquals("SongLyric yoyoyo", retrievedSong.getLyricName());
        assertEquals(2, retrievedSong.getLyricList().size());
        assertEquals("verse1", retrievedSong.getLyricList().get(0).getLyricTitle());
        assertEquals("test lyric2", retrievedSong.getLyricList().get(1).getLyric());

    }
}
