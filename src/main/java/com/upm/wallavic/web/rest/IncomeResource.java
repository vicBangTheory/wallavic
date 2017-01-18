package com.upm.wallavic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.upm.wallavic.domain.Income;
import com.upm.wallavic.service.IncomeService;
import com.upm.wallavic.service.ManageIncomeService;
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
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Income.
 */
@RestController
@RequestMapping("/api")
public class IncomeResource {

    private final Logger log = LoggerFactory.getLogger(IncomeResource.class);

    @Inject
    private IncomeService incomeService;

    @Inject
    private ManageIncomeService manageIncomeService;

    /**
     * POST  /incomes : Create a new income.
     *
     * @param income the income to create
     * @return the ResponseEntity with status 201 (Created) and with body the new income, or with status 400 (Bad Request) if the income has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/incomes")
    @Timed
    public ResponseEntity<Income> createIncome(@Valid @RequestBody Income income) throws URISyntaxException {
        log.debug("REST request to save Income : {}", income);
        if (income.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("income", "idexists", "A new income cannot already have an ID")).body(null);
        }
        Income result = manageIncomeService.createIncome(income);
        return ResponseEntity.created(new URI("/api/incomes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("income", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /incomes : Updates an existing income.
     *
     * @param income the income to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated income,
     * or with status 400 (Bad Request) if the income is not valid,
     * or with status 500 (Internal Server Error) if the income couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/incomes")
    @Timed
    public ResponseEntity<Income> updateIncome(@Valid @RequestBody Income income) throws URISyntaxException {
        log.debug("REST request to update Income : {}", income);
        if (income.getId() == null) {
            return createIncome(income);
        }
        Income result = incomeService.save(income);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("income", income.getId().toString()))
            .body(result);
    }

    /**
     * GET  /incomes : get all the incomes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of incomes in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/incomes")
    @Timed
    public ResponseEntity<List<Income>> getAllIncomes(@ApiParam Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Incomes");
        Page<Income> page = incomeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/incomes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /incomes/:id : get the "id" income.
     *
     * @param id the id of the income to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the income, or with status 404 (Not Found)
     */
    @GetMapping("/incomes/{id}")
    @Timed
    public ResponseEntity<Income> getIncome(@PathVariable Long id) {
        log.debug("REST request to get Income : {}", id);
        Income income = incomeService.findOne(id);
        return Optional.ofNullable(income)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /incomes/:id : delete the "id" income.
     *
     * @param id the id of the income to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/incomes/{id}")
    @Timed
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {
        log.debug("REST request to delete Income : {}", id);
        incomeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("income", id.toString())).build();
    }

}
