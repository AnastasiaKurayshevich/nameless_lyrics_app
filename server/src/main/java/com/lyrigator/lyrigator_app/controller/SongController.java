package com.lyrigator.lyrigator_app.controller;

import com.lyrigator.lyrigator_app.model.LyricPart;
import com.lyrigator.lyrigator_app.model.Song;
import com.lyrigator.lyrigator_app.model.Structure;
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
import java.util.stream.Collectors;

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
    public ResponseEntity<List<Song>> getAllSongs(){
       List<Song> songList = songService.findAllSongs();
       return ResponseEntity.ok().body(songList);
    }

//    @PostMapping("/new-song")
//    public ResponseEntity<Song> createSong(@RequestBody Prompt prompt) {
//        String message = createAiCall(prompt);
//        String response = ai.makePostRequest(message);
//        List<LyricPart> lyricParts = parseSong(response);
//
//        Song song = new Song();
//        song.setSongList(lyricParts);
//        System.out.println(lyricParts);
//        return ResponseEntity.ok().body(song);
//    }

    @PostMapping("/new-song")
    public ResponseEntity<Song> createSong(@RequestBody String prompt) {
//        String message = createAiCall(prompt);
        String response = ai.makePostRequest(prompt);
        List<LyricPart> lyricParts = parseSong(response);
        System.out.println(prompt);

        Song song = new Song();
        song.setSongList(lyricParts);
        System.out.println(lyricParts);
        return ResponseEntity.ok().body(song);
    }

    @GetMapping("/songs/{id}")
    public ResponseEntity<Song> getSongById(@PathVariable("id") Integer id) {
        Song song = songService.getSongById(id);
        return ResponseEntity.ok().body(song);
    }

//    private String createAiCall(Prompt prompt) {
//       String mood = prompt.mood();
//       String genre = prompt.genre();
//       String description = prompt.description();
//       List<Structure> structure = prompt.structure();
//        StringBuilder sb = new StringBuilder();
//        for (Structure line : structure) {
//            String string = line.toString();
//            sb.append(string);
//        }
//        String finalStructure = sb.toString();
//
//        System.out.println(finalStructure);

//       String promptMessage =
//               "You are a song writer. We need you to generate a song based on the following parameters: " +
//                       "\n mood: " + mood +
//                       "\n genre: " + genre +
//                       "\n description: " + description +
//                       "\n structure: " + finalStructure +
//
//                       "\n If any of the fields are null, you are free to generate the song based on random parameters. " +
//                       "\n Example: {name='Intro', lyrics='banana'} is an example of a lyric part, where 'name' is the title of the lyric part (verse, pre-chorus, chorus, bridge, intro) " +
//                       "\n and 'lyrics' is the users input (can be empty) that have to be included in generated song part, you MUST incorporate it into your generated lyrics" +
//                       "\n Example: if the structure contains name='Intro', lyrics='banana', that means that you should set 'Intro' as the title and generate lyrics that starts with the users input, in this case 'banana' and CONTINUE generating lyrics." +
//                       "\n You MUST follow the lyric part sequence EXACTLY " +
//
//                       "Please structure your response in the following way: " +
//                       "- For each part of the song (verse, pre-chorus, chorus, bridge, intro), please precede and follow the lyrics with an asterisk (*). " +
//                       "- For example, if you are writing a verse, it should look like this: " +
//                       "\"*Verse 1*\nLyrics here\n*End of Verse 1*\". " +
//                       "- Similarly, for other parts like the chorus or bridge, use: " +
//                       "\"*Chorus*\nLyrics here\n*End of Chorus*\", \"*Bridge*\nLyrics here\n*End of Bridge*\" and so on. " +
//
//                       "The lyrics you generate should only include the song part name and the lyrics for that part. No other information is required. Do not give the song a name";
//        System.out.println(promptMessage);
//       return promptMessage;
//    }



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
