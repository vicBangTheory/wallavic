package com.upm.wallavic.service;

import com.upm.wallavic.domain.Income;
import com.upm.wallavic.repository.IncomeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Income.
 */
@Service
@Transactional
public class IncomeService {

    private final Logger log = LoggerFactory.getLogger(IncomeService.class);
    
    @Inject
    private IncomeRepository incomeRepository;

    /**
     * Save a income.
     *
     * @param income the entity to save
     * @return the persisted entity
     */
    public Income save(Income income) {
        log.debug("Request to save Income : {}", income);
        Income result = incomeRepository.save(income);
        return result;
    }

    /**
     *  Get all the incomes.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<Income> findAll(Pageable pageable) {
        log.debug("Request to get all Incomes");
        Page<Income> result = incomeRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one income by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public Income findOne(Long id) {
        log.debug("Request to get Income : {}", id);
        Income income = incomeRepository.findOne(id);
        return income;
    }

    /**
     *  Delete the  income by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Income : {}", id);
        incomeRepository.delete(id);
    }
}
