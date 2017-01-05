package com.upm.wallavic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.upm.wallavic.domain.Purchase;
import com.upm.wallavic.service.PurchaseService;
import com.upm.wallavic.web.rest.util.HeaderUtil;
import com.upm.wallavic.web.rest.util.PaginationUtil;

import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Purchase.
 */
@RestController
@RequestMapping("/api")
public class PurchaseResource {

    private final Logger log = LoggerFactory.getLogger(PurchaseResource.class);
        
    @Inject
    private PurchaseService purchaseService;

    /**
     * POST  /purchases : Create a new purchase.
     *
     * @param purchase the purchase to create
     * @return the ResponseEntity with status 201 (Created) and with body the new purchase, or with status 400 (Bad Request) if the purchase has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/purchases")
    @Timed
    public ResponseEntity<Purchase> createPurchase(@RequestBody Purchase purchase) throws URISyntaxException {
        log.debug("REST request to save Purchase : {}", purchase);
        if (purchase.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("purchase", "idexists", "A new purchase cannot already have an ID")).body(null);
        }
        Purchase result = purchaseService.save(purchase);
        return ResponseEntity.created(new URI("/api/purchases/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("purchase", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /purchases : Updates an existing purchase.
     *
     * @param purchase the purchase to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated purchase,
     * or with status 400 (Bad Request) if the purchase is not valid,
     * or with status 500 (Internal Server Error) if the purchase couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/purchases")
    @Timed
    public ResponseEntity<Purchase> updatePurchase(@RequestBody Purchase purchase) throws URISyntaxException {
        log.debug("REST request to update Purchase : {}", purchase);
        if (purchase.getId() == null) {
            return createPurchase(purchase);
        }
        Purchase result = purchaseService.save(purchase);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("purchase", purchase.getId().toString()))
            .body(result);
    }

    /**
     * GET  /purchases : get all the purchases.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of purchases in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/purchases")
    @Timed
    public ResponseEntity<List<Purchase>> getAllPurchases(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Purchases");
        Page<Purchase> page = purchaseService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/purchases");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /purchases/:id : get the "id" purchase.
     *
     * @param id the id of the purchase to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the purchase, or with status 404 (Not Found)
     */
    @GetMapping("/purchases/{id}")
    @Timed
    public ResponseEntity<Purchase> getPurchase(@PathVariable Long id) {
        log.debug("REST request to get Purchase : {}", id);
        Purchase purchase = purchaseService.findOne(id);
        return Optional.ofNullable(purchase)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /purchases/:id : delete the "id" purchase.
     *
     * @param id the id of the purchase to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/purchases/{id}")
    @Timed
    public ResponseEntity<Void> deletePurchase(@PathVariable Long id) {
        log.debug("REST request to delete Purchase : {}", id);
        purchaseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("purchase", id.toString())).build();
    }

}
