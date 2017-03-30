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

    @Query("select p from Product p where p.price <= ?1 and p.price >= ?2 and p.sold = ?3 ")
    Page<Product> finAll(Pageable pageable, Double maxPrice, Double minPrice, Boolean sold);

    @Query("select p from Product p where p.price <= ?1 and p.price >= ?2 and p.cat in ?3 and p.sold = ?4")
    Page<Product> finAllByCats(Double maxPrice, Double minPrice, List<ProductCat> cats, Boolean sold, Pageable pageable);
}
