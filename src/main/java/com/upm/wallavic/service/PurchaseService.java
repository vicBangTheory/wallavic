package com.upm.wallavic.service;

import com.upm.wallavic.domain.Purchase;
import com.upm.wallavic.repository.PurchaseRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Purchase.
 */
@Service
@Transactional
public class PurchaseService {

    private final Logger log = LoggerFactory.getLogger(PurchaseService.class);
    
    @Inject
    private PurchaseRepository purchaseRepository;

    /**
     * Save a purchase.
     *
     * @param purchase the entity to save
     * @return the persisted entity
     */
    public Purchase save(Purchase purchase) {
        log.debug("Request to save Purchase : {}", purchase);
        Purchase result = purchaseRepository.save(purchase);
        return result;
    }

    /**
     *  Get all the purchases.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Purchase> findAll(Pageable pageable) {
        log.debug("Request to get all Purchases");
        Page<Purchase> result = purchaseRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one purchase by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Purchase findOne(Long id) {
        log.debug("Request to get Purchase : {}", id);
        Purchase purchase = purchaseRepository.findOne(id);
        return purchase;
    }

    /**
     *  Delete the  purchase by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Purchase : {}", id);
        purchaseRepository.delete(id);
    }
}
