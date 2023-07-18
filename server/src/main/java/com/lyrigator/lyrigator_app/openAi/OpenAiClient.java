
//package com.lyrigator.lyrigator_app.openAi;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import io.github.cdimascio.dotenv.Dotenv;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.function.BodyInserters;
//import org.springframework.web.reactive.function.client.WebClient;
//import org.springframework.web.reactive.function.client.WebClientResponseException;
//import reactor.core.publisher.Mono;
//
//@Component
//public class OpenAiClient {
//
//    private final String API_KEY;
//    ObjectMapper objectMapper = new ObjectMapper();
//    CompletionPayload payload = new CompletionPayload(
//            "text-davinci-002", "Once upon a time", 100, 0.5, 1, 1
//    );
//    String jsonPayload = objectMapper.writeValueAsString(payload);
//
//
//    @Autowired
//    public OpenAiClient() throws JsonProcessingException {
//        Dotenv dotenv = Dotenv.load();
//        API_KEY = dotenv.get("OPENAI_API_KEY");
//    }
//
//    public String makePostRequest() {
//        WebClient webClient = WebClient.builder()
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY)
//                .build();
//        try {
//            Mono<String> responseMono = webClient.post()
//                    .uri("https://api.openai.com/v1/completions")
//                    .contentType(MediaType.APPLICATION_JSON)
//                    .body(BodyInserters.fromValue(jsonPayload))
//                    .retrieve()
//                    .bodyToMono(String.class);
//            String response = responseMono.block();
//            System.out.println(response);
//            return response;
//        } catch (WebClientResponseException e) {
//            int statusCode = e.getStatusCode().value();
//            String responseBody = e.getResponseBodyAsString();
//            System.err.println("HTTP Error " + statusCode + ": " + responseBody);
//        } catch (Exception e) {
//            System.err.println("Unexpected error: " + e.getMessage());
//        }
//
//        return null;
//    }
//
//
//}
