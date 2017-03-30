package com.upm.wallavic.service;

import com.upm.wallavic.domain.Product;
import com.upm.wallavic.domain.enumeration.ProductCat;
import com.upm.wallavic.repository.ProductRepository;
import com.upm.wallavic.security.SecurityUtils;
import com.upm.wallavic.service.dto.ProductFilterDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductService.class);

    @Inject
    private ProductRepository productRepository;


    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     */
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        Product result = productRepository.save(product);
        return result;
    }

    /**
     *  Get all the products.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        Page<Product> result = productRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one product by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Product findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        Product product = productRepository.findOne(id);
        return product;
    }

    /**
     *  Delete the  product by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.delete(id);
    }

    /**
     * Get all the products by money and cat..
     *
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Page<Product> filterProducts(Pageable pageable, ProductFilterDTO productDto) {

        Page<Product> result;
        if(productDto.getCats() == null || productDto.getCats().size() == 0){
            result = productRepository.finAll(pageable, productDto.getMaxPrice(), productDto.getMinPrice(), productDto.getSold());
        }else{
            result = productRepository.finAllByCats(productDto.getMaxPrice(), productDto.getMinPrice(), productDto.getCats(), productDto.getSold(), pageable);
        }
        log.debug("the response would be: {}", result.getContent());

        return result;
    }

}
