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

    private List<ProductCat> cats;

    private Double maxPrice;

    private Double minPrice;

    public ProductFilterDTO(List<ProductCat> cats, Double maxPrice, Double minPrice) {
        this.cats = cats;
        this.maxPrice = maxPrice;
        this.minPrice = minPrice;
    }

    public ProductFilterDTO() {
    }

    public List<ProductCat> getCats() {
        return cats;
    }

    public void setCats(List<ProductCat> cats) {
        this.cats = cats;
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
            "cats=" + cats +
            ", maxPrice=" + maxPrice +
            ", minPrice=" + minPrice +
            '}';
    }
}
