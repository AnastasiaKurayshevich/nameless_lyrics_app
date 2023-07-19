
package com.lyrigator.lyrigator_app.openAi;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Component
@PropertySource("classpath:secrets.properties")
public class OpenAiClient {

    private final String API_KEY;


    private String createJsonPayload(String prompt) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode payload = objectMapper.createObjectNode();
        payload.put("model", "text-davinci-002");
        payload.put("prompt", prompt);
        payload.put("max_tokens", 10);
        payload.put("temperature", 0.5);
        payload.put("top_p", 1);
        payload.put("n", 1);
        return payload.toString();
    }


    @Autowired
    public OpenAiClient(@Value("${OPENAI_API_KEY}") String apiKey) {
        this.API_KEY = apiKey;
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
            System.out.println(response);
            return response;
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
