package com.upm.wallavic.repository;

import com.upm.wallavic.domain.Income;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Income entity.
 */
@SuppressWarnings("unused")
public interface IncomeRepository extends JpaRepository<Income,Long> {

    @Query("select income from Income income where income.user.login = ?#{principal.username}")
    List<Income> findByUserIsCurrentUser();

}
