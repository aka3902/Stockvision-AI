package com.app.stockvisionai.controller;

import com.app.stockvisionai.model.StockData;
import com.app.stockvisionai.service.ChatbotService;
import com.app.stockvisionai.service.MLService;
import com.app.stockvisionai.service.StockDataService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class StockDataController {
	
    private final StockDataService stockDataService;
    private final MLService mlService;
    private final ChatbotService chatBotService;

    public StockDataController(StockDataService stockDataService, MLService mlService, ChatbotService chatBotService) {
        this.stockDataService = stockDataService;
        this.mlService = mlService;
        this.chatBotService=chatBotService;
    }

    @GetMapping("/{symbol}")
    public List<StockData> getStockData(@PathVariable String symbol) {
        return stockDataService.getStockData(symbol);
    }

    @PostMapping("/predict")
    public ResponseEntity<?> getStockForecast(@RequestBody Map<String, String> request) {
        String symbol = request.get("symbol");
        if (symbol == null) {
            return ResponseEntity.badRequest().body("Stock symbol is required");
        }
        return ResponseEntity.ok(mlService.getStockPrediction(symbol));
    }


    @PostMapping("/chat")
    public ResponseEntity<Map<String, String>> getChatBotResponse(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        if (userMessage == null || userMessage.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Message cannot be empty"));
        }

        String botResponse = chatBotService.getChatResponse(userMessage);
        return ResponseEntity.ok(Map.of("response", botResponse));
    }

}
