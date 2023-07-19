package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.openAi.OpenAiClient;
import com.lyrigator.lyrigator_app.openAi.Prompt;
import com.lyrigator.lyrigator_app.service.SongService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SongController {
    SongService songService;

    OpenAiClient ai;

    @Autowired
    public SongController(SongService songService, OpenAiClient ai) {
        this.songService = songService;
        this.ai = ai;
    }

    @GetMapping("/all-songs")
    public ResponseEntity<List<Song>> getAllSongs(){
       List<Song> songList = songService.findAllSongs();
       return ResponseEntity.ok().body(songList);
    }

    @PostMapping("/new-song")
    public ResponseEntity<Song> createSong(@RequestBody Prompt prompt) {
        String message = createAiCall(prompt);
        String response = ai.makePostRequest(message);
        List<LyricPart> lyricParts = parseSong(response);

        Song song = new Song();
        song.setSongList(lyricParts);
        return ResponseEntity.ok().body(song);
    }

    private String createAiCall(Prompt prompt) {
       String mood = prompt.mood();
       String genre = prompt.genre();
       String description = prompt.description();
       String structure = prompt.structure();

       String promptMessage =

               "You are a song writer. We need you to generate a song based on the following parameters: " +
                       "\n mood: " + mood +
                       "\n genre: " + genre +
                       "\n description: " + description +
                       "\n structure: " + structure +

                       "\n If any of the fields are null, you are free to generate the song based on random parameters. " +
                       "\n If the structure field is not null, please follow it exactly. " +

                       "Please structure your response in the following way: " +
                       "- For each part of the song (verse, pre-chorus, chorus, bridge, outro), please precede and follow the lyrics with an asterisk (*). " +
                       "- For example, if you are writing a verse, it should look like this: " +
                       "\"*Verse 1*\nLyrics here\n*End of Verse 1*\". " +
                       "- Similarly, for other parts like the chorus or bridge, use: " +
                       "\"*Chorus*\nLyrics here\n*End of Chorus*\", \"*Bridge*\nLyrics here\n*End of Bridge*\" and so on. " +

                       "The lyrics you generate should only include the song part name and the lyrics for that part. No other information is required.";


//               "You are a song writer, generate a song based on these parameters: \n mood: " + mood +
//                       " \n genre: " + genre + " \n description: " + description + " \n structure: " + structure +
//                       " \n If any of the fields are null, generate the whole song based on random parameters. \n If the structure field is " +
//                       "not null, you should follow the exact structure. Your response should only contain " +
//                       "the " + " lyrics and song part name (like verse, pre-chorus, chorus and etc...). Important: Before and After each song part place wildcard " +
//                       "character (*).";
       return promptMessage;
    }



    public static List<LyricPart> parseSong(String songString) {
        List<LyricPart> song = new ArrayList<>();
        Pattern pattern = Pattern.compile("\\*(.*?)\\*\\s*([\\s\\S]*?)(?=\\*|$)"); // Regex pattern to match parts of the song

        Matcher matcher = pattern.matcher(songString);
        while (matcher.find()) {
            String lyricTitle = matcher.group(1).trim();
            String lyric = matcher.group(2).trim();
            song.add(new LyricPart(lyricTitle, lyric));
        }

        return song;
    }








    @PostMapping
    public ResponseEntity<String> postLyricToDb(@RequestBody Song song){
        System.out.println(song.getSongName());
        String response = ai.makePostRequest(song.getSongName());
        System.out.println(response);
        Song aiResponse = new Song();
        aiResponse.setSongName(response);
//        songService.saveLyric(aiResponse);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping
    public ResponseEntity<String> getLyric() {
        String newLyric = "whatever inside";
        return ResponseEntity.ok().body(newLyric);
    }
}
