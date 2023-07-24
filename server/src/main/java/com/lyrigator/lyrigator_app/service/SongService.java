package com.lyrigator.lyrigator_app.service;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.repository.LyricPartRepo;
import com.lyrigator.lyrigator_app.repository.SongRepo;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class SongService {
    SongRepo songRepo;
    LyricPartRepo lyricPartRepo;

    public SongService(SongRepo songRepo, LyricPartRepo lyricPartRepo) {
        this.songRepo = songRepo;
        this.lyricPartRepo = lyricPartRepo;
    }

    public void saveLyric(Song song) {
        songRepo.saveLyric(song);
    }

    public List<Song> findAllSongs() {
        return songRepo.getListOfSongs();
    }

    public Song getSongById(Integer id) {
        return songRepo.getSongById(id);
    }

    @Transactional
    public Song editSong(Integer id, Song existingSong) {
        Song songEdit = songRepo.getSongById(id);
        if (songEdit != null) {
            songEdit.setSongName(existingSong.getSongName());
            songEdit.setGenre(existingSong.getGenre());
            songEdit.setMood(existingSong.getMood());
            songEdit.setDescription(existingSong.getDescription());

            for (LyricPart lyricPart : songEdit.getSongList()) {
                lyricPartRepo.delete(lyricPart);
            }
            songEdit.setSongList(existingSong.getSongList());
            songRepo.saveLyric(songEdit);
            return songEdit;
        }
        return null;
    }

    public void deleteById(Integer id) {
        songRepo.deleteSongById(id);
    }

    public static List<LyricPart> parseSong(String songString) {
        String processedSongString = songString.replace("---STOP---", "").replaceAll("(?m)\\s*\\r?\\n", "");
        List<LyricPart> song = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\*(.*?)\\*\\s*([\\s\\S]*?)(?=\\*|$)");

        Matcher matcher = pattern.matcher(processedSongString);
        while (matcher.find()) {
            String lyricTitle = matcher.group(1).trim();
            String lyric = matcher.group(2).trim();
            song.add(new LyricPart(lyricTitle, lyric));
        }
        return song;
    }

    public static LyricPart parseSingleSongPart(String songPart) {
        String cleanSongPart = songPart.replace("---STOP---", "").trim();
        String[] lines = cleanSongPart.split("\n");
        if (lines.length > 0) {
            String firstLine = lines[0].trim();
            String[] possibleTitles = {"INTRO", "VERSE", "CHORUS", "PRE-CHORUS", "BRIDGE"};

            String lyricTitle = "";
            for (String title : possibleTitles) {
                if (firstLine.toUpperCase().contains(title)) {
                    lyricTitle = title;
                    break;
                }
            }
            String lyric;
            if (!lyricTitle.isEmpty()) {
                lyric = String.join("\n", Arrays.copyOfRange(lines, 1, lines.length)).trim();
            } else {
                lyric = String.join("\n", lines).trim();
                lyricTitle = "UNKNOWN";
            }
            return new LyricPart(lyricTitle, lyric);
        } else {
            return null;
        }
    }
}
