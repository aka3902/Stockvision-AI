package com.app.stockvisionai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AIRecommendationService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final String OPENAI_API_URL = "https://api.openai.com/v1/completions";

    public String getInvestmentAdvice(String stockSymbol) {
        RestTemplate restTemplate = new RestTemplate();

        // Construct request headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        // Construct request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4");
        requestBody.put("prompt", "Give a short investment recommendation for " + stockSymbol);
        requestBody.put("max_tokens", 100);

        // Wrap headers and body in an HttpEntity
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Make API request
        ResponseEntity<Map> response = restTemplate.exchange(OPENAI_API_URL, HttpMethod.POST, requestEntity, Map.class);

        // Extract response text
        if (response.getBody() != null && response.getBody().containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (!choices.isEmpty() && choices.get(0).containsKey("text")) {
                return choices.get(0).get("text").toString().trim();
            }
        }

        return "No recommendation available.";
    }
}
