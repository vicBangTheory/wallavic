package com.upm.wallavic.repository;

import com.upm.wallavic.domain.Purchase;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Purchase entity.
 */
@SuppressWarnings("unused")
public interface PurchaseRepository extends JpaRepository<Purchase,Long> {

    @Query("select purchase from Purchase purchase where purchase.user.login = ?#{principal.username}")
    List<Purchase> findByUserIsCurrentUser();

}
