package com.lyrigator.lyrigator_app.openAi;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@Component
@PropertySource("classpath:secrets.properties")
public class OpenAiClient {

    private final String API_KEY;
    private final String jsonPayload;

    @Autowired
    public OpenAiClient(@Value("${OPENAI_API_KEY}") String apiKey) {
        this.API_KEY = apiKey;
//        API_KEY = loadApiKeyFromProperties("secrets.properties", "OPENAI_API_KEY");
        this.jsonPayload = initializeJsonPayload();
    }

    private String initializeJsonPayload() {
        ObjectMapper objectMapper = new ObjectMapper();
        CompletionPayload payload = new CompletionPayload(
                "text-davinci-002", "Once upon a time", 10, 0.5, 1, 1
        );

        try {
            return objectMapper.writeValueAsString(payload);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Failed to convert payload to JSON", e);
        }
    }
//    private String loadApiKeyFromProperties(String propertiesFileName, String apiKeyProperty) {
//        Properties prop = new Properties();
//        InputStream inputStream = getClass().getClassLoader().getResourceAsStream(propertiesFileName);
//
//        if (inputStream != null) {
//            try {
//                prop.load(inputStream);
//            } catch (IOException e) {
//                throw new RuntimeException("Failed to load properties from file: " + propertiesFileName, e);
//            }
//        } else {
//            throw new RuntimeException("Property file '" + propertiesFileName + "' not found in the classpath");
//        }
//
//        return prop.getProperty(apiKeyProperty);
//    }

    public String makePostRequest() {
        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + API_KEY)
                .build();
        try {
            Mono<String> responseMono = webClient.post()
                    .uri("https://api.openai.com/v1/completions")
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(BodyInserters.fromValue(jsonPayload))
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
