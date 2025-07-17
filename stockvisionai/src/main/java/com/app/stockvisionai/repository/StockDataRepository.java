package com.app.stockvisionai.repository;

import com.app.stockvisionai.model.StockData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface StockDataRepository extends JpaRepository<StockData, Long> {
    List<StockData> findBySymbolOrderByDate(String symbol);
}

