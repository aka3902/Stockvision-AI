package com.app.stockvisionai.service;

import com.app.stockvisionai.model.StockData;
import com.app.stockvisionai.repository.StockDataRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class StockDataService {
    private final StockDataRepository stockDataRepository;
    private final String ALPHA_VANTAGE_API_KEY = "SCDW023MHE0V0JN4";

    public StockDataService(StockDataRepository stockDataRepository) {
        this.stockDataRepository = stockDataRepository;
    }

    public List<StockData> getStockData(String symbol) {
        /*List<StockData> storedData = stockDataRepository.findBySymbolOrderByDate(symbol);

        if (!storedData.isEmpty()) {
            return storedData; // Serve from database if available
        } else {*/
            return fetchAndStoreStockData(symbol); // Fetch from API if not available
        //}
    }

    public List<StockData> fetchAndStoreStockData(String symbol) {
        String url ="https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=" + ALPHA_VANTAGE_API_KEY;
        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);
        JSONObject jsonResponse = new JSONObject(response);

        if (jsonResponse.has("Time Series (Daily)")) {
            JSONObject timeSeries = jsonResponse.getJSONObject("Time Series (Daily)");

            for (String date : timeSeries.keySet()) {
                JSONObject dayData = timeSeries.getJSONObject(date);
                StockData stockData = new StockData();
                stockData.setSymbol(symbol);
                stockData.setDate(LocalDate.parse(date));
                stockData.setOpen(dayData.getDouble("1. open"));
                stockData.setHigh(dayData.getDouble("2. high"));
                stockData.setLow(dayData.getDouble("3. low"));
                stockData.setClose(dayData.getDouble("4. close"));
                stockData.setVolume(dayData.getInt("5. volume"));

                stockDataRepository.save(stockData);
            }
        }

        return stockDataRepository.findBySymbolOrderByDate(symbol);
    }
}