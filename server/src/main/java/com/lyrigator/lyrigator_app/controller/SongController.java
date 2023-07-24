package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SongController {
    private final SongService songService;

    private final OpenAiClient ai;

    @Autowired
    public SongController(SongService songService, OpenAiClient ai) {
        this.songService = songService;
        this.ai = ai;
    }

    @GetMapping("/songs")
    public ResponseEntity<List<Song>> getAllSongs() {
        List<Song> songList = songService.findAllSongs();
        return ResponseEntity.ok().body(songList);
    }

    @PostMapping("/new-song")
    public ResponseEntity<Song> createSong(@RequestBody String prompt) {
        String response = ai.makePostRequest(prompt);
        List<LyricPart> lyricParts = SongService.parseSong(response);

        Song song = new Song();
        song.setSongList(lyricParts);
        return ResponseEntity.ok().body(song);
    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable("id") Integer id) {
        Song song = songService.getSongById(id);
        return ResponseEntity.ok().body(song);
    }

    @PostMapping("/save-song")
    public ResponseEntity<Song> saveSongToDb(@RequestBody Song song) {
        Song songToSave = new Song();
        songToSave.setSongName(song.getSongName());
        songToSave.setGenre(song.getGenre());
        songToSave.setMood(song.getMood());
        songToSave.setDescription(song.getDescription());
        songToSave.setSongList(song.getSongList());

        songService.saveLyric(songToSave);
        return ResponseEntity.ok().body(songToSave);
    }

    @PostMapping("/regenerate-part")
    public ResponseEntity<LyricPart> createSongPart(@RequestBody String prompt) {
        String response = ai.makePostRequest(prompt);
        LyricPart regeneratedPart = SongService.parseSingleSongPart(response);

        return ResponseEntity.ok().body(regeneratedPart);
    }

    @PutMapping("/songs/{id}")
    public ResponseEntity<Song> editSong(@PathVariable Integer id, @RequestBody Song song) {
        Song songEdit = songService.editSong(id, song);
        if (songEdit == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(songEdit);
    }

    @DeleteMapping("/songs/{id}")
    public ResponseEntity<Integer> deleteSongById(@PathVariable Integer id) {
        Song songToDelete = songService.getSongById(id);
        if (songToDelete == null) {
            return ResponseEntity.notFound().build();
        }
        songService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
