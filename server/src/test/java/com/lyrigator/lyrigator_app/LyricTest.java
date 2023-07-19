package com.lyrigator.lyrigator_app;


import com.lyrigator.lyrigator_app.model.Lyric;
import com.lyrigator.lyrigator_app.model.LyricPart;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class LyricTest {

//    Lyric lyric;
//    LyricPart lyricPart;
//
//    public LyricTest(Lyric lyric, LyricPart lyricPart) {
//        this.lyric = lyric;
//        this.lyricPart = lyricPart;
//    }

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testIfWeCanCreateNewLyric() {
        Lyric songLyric = new Lyric();
        songLyric.setLyricName("SongLyric yoyoyo");
        LyricPart lyricPart1 = new LyricPart("verse1", "test lyric1");
        LyricPart lyricPart2 = new LyricPart("verse2", "test lyric2");
        List<LyricPart> list = new ArrayList<>();
        list.add(lyricPart1);
        list.add(lyricPart2);
        songLyric.setLyricList(list);

        Lyric saveLyric = entityManager.persistAndFlush(songLyric);

        Lyric retrievedLyric = entityManager.find(Lyric.class, saveLyric.getId());

        // Perform assertions to check the saved and retrieved lyric
        assertEquals("SongLyric yoyoyo", retrievedLyric.getLyricName());
        assertEquals(2, retrievedLyric.getLyricList().size());
        assertEquals("verse1", retrievedLyric.getLyricList().get(0).getLyricTitle());
        assertEquals("test lyric2", retrievedLyric.getLyricList().get(1).getLyric());

    }
}
