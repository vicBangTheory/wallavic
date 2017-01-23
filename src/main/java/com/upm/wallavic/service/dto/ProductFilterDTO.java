package com.upm.wallavic.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.upm.wallavic.domain.enumeration.ProductCat;

import java.io.Serializable;
import java.util.List;

/**
 * Created by Victor on 18/01/2017.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ProductFilterDTO implements Serializable{


    private Double maxPrice;

    private Double minPrice;

    public ProductFilterDTO( Double maxPrice, Double minPrice) {
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
    }

    public ProductFilterDTO() {
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice) {
        this.minPrice = minPrice;
    }

    @Override
    public String toString() {
        return "ProductFilterDTO{" +
            ", maxPrice=" + maxPrice +
            ", minPrice=" + minPrice +
            '}';
    }
}
