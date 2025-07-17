package com.app.stockvisionai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatbotService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.model}")
    private String model;

    @Value("${gemini.api.url}")
    private String apiBaseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getChatResponse(String userMessage) {
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return "Error: Message cannot be empty";
        }

        // Set Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Prepare Request Body
        Map<String, Object> textPart = Map.of("text", userMessage);
        Map<String, Object> content = Map.of("parts", List.of(textPart));
        Map<String, Object> requestBody = Map.of("contents", List.of(content));

        // Build URL
        String urlWithKey = apiBaseUrl + model + ":generateContent?key=" + apiKey;

        try {
            ResponseEntity<Map> responseEntity = restTemplate.postForEntity(urlWithKey, new HttpEntity<>(requestBody, headers), Map.class);

            if (responseEntity.getStatusCode() == HttpStatus.OK && responseEntity.getBody() != null) {
                return extractTextFromGeminiResponse(responseEntity.getBody());
            } else {
                return "Error: Invalid response from Gemini API (" + responseEntity.getStatusCode() + ")";
            }

        } catch (Exception e) {
            e.printStackTrace();
            return "Error: Exception occurred - " + e.getMessage();
        }
    }

    private String extractTextFromGeminiResponse(Map<String, Object> responseBody) {
        try {
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            if (candidates == null || candidates.isEmpty()) return "Error: No candidates found";

            Map<String, Object> firstCandidate = candidates.get(0);
            Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
            List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");

            if (parts != null && !parts.isEmpty()) {
                return parts.get(0).get("text").toString();
            } else {
                return "Error: Empty response from Gemini";
            }
        } catch (Exception e) {
            return "Error: Failed to parse Gemini response";
        }
    }
}

