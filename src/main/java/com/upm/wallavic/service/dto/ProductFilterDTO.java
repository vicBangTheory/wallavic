package com.upm.wallavic.service.dto;

import com.upm.wallavic.domain.enumeration.ProductCat;

import java.util.List;

/**
 * Created by Victor on 18/01/2017.
 */
public class ProductFilterDTO {

    private boolean onSale;

    private Double maxPrice;

    private Double minPrice;

    private List<ProductCat> productCats;

    public boolean isOnSale() {
        return onSale;
    }

    public void setOnSale(boolean onSale) {
        this.onSale = onSale;
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

    public List<ProductCat> getProductCats() {
        return productCats;
    }

    public void setProductCats(List<ProductCat> productCats) {
        this.productCats = productCats;
    }

    @Override
    public String toString() {
        return "ProductFilterDTO{" +
            "onSale=" + onSale +
            ", maxPrice=" + maxPrice +
            ", minPrice=" + minPrice +
            ", productCats=" + productCats +
            '}';
    }
}
