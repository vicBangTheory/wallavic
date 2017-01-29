package com.upm.wallavic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.upm.wallavic.domain.Product;
import com.upm.wallavic.domain.enumeration.ProductCat;
import com.upm.wallavic.service.ProductService;
import com.upm.wallavic.service.dto.ProductFilterDTO;
import com.upm.wallavic.service.util.GenericUtilsService;
import com.upm.wallavic.web.rest.util.HeaderUtil;
import com.upm.wallavic.web.rest.util.PaginationUtil;

import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.inject.Inject;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

/**
 * REST controller for managing Product.
 */
@RestController
@RequestMapping("/api")
public class ProductResource {

    private final Logger log = LoggerFactory.getLogger(ProductResource.class);

    @Inject
    private ProductService productService;

    @Value("${filesDir}")
    private String filesDir;

    /**
     * POST  /products : Create a new product.
     *
     * @param product the product to create
     * @return the ResponseEntity with status 201 (Created) and with body the new product, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/products")
    @Timed
    public ResponseEntity<Product> createProduct(@RequestPart @Valid Product product, @RequestPart(value = "file", required = false)MultipartFile file) throws URISyntaxException {
        log.debug("REST request to save Product : {}", product);
        if (product.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("product", "idexists", "A new product cannot already have an ID")).body(null);
        }
        product.setUploadDate(ZonedDateTime.now());

        Product result = productService.save(product);

        if(file != null){
            String fileName = "-"+result.getId()+"-"+file.getOriginalFilename();
            try {
                product.setUrl(GenericUtilsService.uploadFile(file, fileName, filesDir));
            }catch(IOException e){
                log.debug("REST request to save Product : {}", e.getStackTrace());
                return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("product", "errorFile", "error getting the file")).body(null);
            }
            result = productService.save(product);
        }



        return ResponseEntity.created(new URI("/api/products/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("product", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /products : Updates an existing product.
     *
     * @param product the product to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated product,
     * or with status 400 (Bad Request) if the product is not valid,
     * or with status 500 (Internal Server Error) if the product couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/products")
    @Timed
    public ResponseEntity<Product> updateProduct(@RequestPart @Valid Product product, @RequestPart(value = "file", required = false)MultipartFile file) throws URISyntaxException {
        log.debug("REST request to update Product : {}", product);
        if (product.getId() == null) {
            return createProduct(product, file);
        }

        Product prevProduct = productService.findOne(product.getId());

        if(file != null){
            String fileName = "-"+product.getId()+"-"+file.getOriginalFilename();
            if(prevProduct.getUrl() != null && fileName.compareTo(product.getUrl()) != 0){
                GenericUtilsService.removeFile(prevProduct.getUrl(), filesDir);
            }
            try {
                product.setUrl(GenericUtilsService.uploadFile(file, fileName, filesDir));
            }catch(IOException e){
                return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("product", "errorFile", "error getting the file")).body(null);
            }
        }else{
            if(prevProduct.getUrl() != null){
                GenericUtilsService.removeFile(prevProduct.getUrl(), filesDir);
            }
        }
        Product result = productService.save(product);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("product", product.getId().toString()))
            .body(result);
    }

    /**
     * GET  /products : get all the products.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of products in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/products")
    @Timed
    public ResponseEntity<List<Product>> getAllProducts(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Products");

        Page<Product> page = productService.findAll(pageable);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

//    /**
//     * GET  /products : get all the filtered products .
//     *
//     * @param pageable the pagination information
//     * @return the ResponseEntity with status 200 (OK) and the list of products in body
//     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
//     */
//    @GetMapping("/filtered-products")
//    @Timed
//    public ResponseEntity<List<Product>> getAllFilterredProducts(@ApiParam Pageable pageable,@ApiParam Double maxMoney, @ApiParam Double minMoney, @ApiParam ProductCat cat)
//        throws URISyntaxException {
//        log.debug("REST request to get a page of Products");
//        Page<Product> page = productService.findAll(pageable);
//        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/products");
//        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
//    }

    /**
     * GET  /products/:id : get the "id" product.
     *
     * @param id the id of the product to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the product, or with status 404 (Not Found)
     */
    @GetMapping("/products/{id}")
    @Timed
    public ResponseEntity<Product> getProduct(@PathVariable Long id) {
        log.debug("REST request to get Product : {}", id);
        Product product = productService.findOne(id);
        return Optional.ofNullable(product)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /products/:id : delete the "id" product.
     *
     * @param id the id of the product to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/products/{id}")
    @Timed
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        log.debug("REST request to delete Product : {}", id);
        Product prevProduct = productService.findOne(id);
        if(prevProduct.getUrl() != null){
            GenericUtilsService.removeFile(prevProduct.getUrl(), filesDir);
        }
        productService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("product", id.toString())).build();
    }

    /**
     * POST  /filtered_products : Create a new product.
     *
     * @param product the product to create
     * @return the ResponseEntity with status 201 (Created) and with body the new product, or with status 400 (Bad Request) if the product has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/filtered_products")
    @Timed
    public ResponseEntity<List<Product>> getFilteredProducts(@ApiParam Pageable pageable,@Valid @RequestBody ProductFilterDTO productDto) throws URISyntaxException {
        log.debug("esta vez si que deberia coger el puto dto: {}", productDto);
        log.debug("pagination: {}", pageable);

        Page<Product> page = productService.filterProducts(pageable, productDto);

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/filtered_products");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
