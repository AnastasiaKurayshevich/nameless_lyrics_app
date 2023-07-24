package com.lyrigator.lyrigator_app.openAi;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Component
public class OpenAiClient {

    private final String API_KEY;


    @Autowired
    public OpenAiClient(@Value("${OPENAI_API_KEY}") String apiKey) {
        this.API_KEY = apiKey;
    }

    private String createJsonPayload(String prompt) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("model", "text-davinci-002");
        payload.put("prompt", prompt);
        payload.put("max_tokens", 200);
        payload.put("temperature", 0.5);
        payload.put("top_p", 1);
        payload.put("n", 1);
        return payload.toString();
    }

    public String makePostRequest(String userInput) {
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY)
                .build();
        try {
            Mono<String> responseMono = webClient.post()
                    .uri("https://api.openai.com/v1/completions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(createJsonPayload(userInput)))
                    .retrieve()
                    .bodyToMono(String.class);
            String response = responseMono.block();

            ObjectMapper mapper = new ObjectMapper();
            JsonNode responseJson = mapper.readTree(response);
            String text = responseJson.get("choices").get(0).get("text").asText();
            return text;

        } catch (WebClientResponseException e) {
            int statusCode = e.getStatusCode().value();
            String responseBody = e.getResponseBodyAsString();
            System.err.println("HTTP Error " + statusCode + ": " + responseBody);
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
        }
        return null;
    }
}
