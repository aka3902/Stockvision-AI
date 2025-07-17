package com.app.stockvisionai.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;

@Service
public class MLService {
    private final String ML_API_URL = "http://127.0.0.1:5001/predict";

    public Map<String, Object> getStockPrediction(String symbol) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"symbol\": \"" + symbol + "\"}";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(ML_API_URL, HttpMethod.POST, requestEntity, Map.class);
        return response.getBody();
    }
}

