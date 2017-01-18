package com.upm.wallavic.repository;

import com.upm.wallavic.domain.Product;

import com.upm.wallavic.domain.enumeration.ProductCat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("select product from Product product where product.user.login = ?#{principal.username}")
    List<Product> findByUserIsCurrentUser();

    @Query("select p from Product p where p.price <= ?2 and p.price >= ?3 and p.sold = false")
    Page<Product> finAllByPrice(Pageable pageable, Double maxPrice, Double minPrice);

    @Query("select p from Product p where p.price <= ?2 and p.price >= ?3 and p.cat in ?4 and p.sold = false")
    Page<Product> finAllByPriceAndCat(Pageable pageable, Double maxPrice, Double minPrice, List<ProductCat> cats);


}
