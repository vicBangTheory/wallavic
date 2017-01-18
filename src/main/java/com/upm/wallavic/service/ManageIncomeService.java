package com.upm.wallavic.service;


import com.upm.wallavic.domain.Income;
import com.upm.wallavic.domain.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;

/**
 * Created by Victor on 07/01/2017.
 */

@Service
@Transactional
public class ManageIncomeService {

    private final Logger log = LoggerFactory.getLogger(ManageIncomeService.class);

    @Inject
    private UserService userService;

    @Inject
    private IncomeService incomeService;

    public Income createIncome(Income income){
        Income result = incomeService.save(income);
        User user = income.getUser();
        Double money = 0.0;
        if(user.getMoney() != null){
            money = user.getMoney()+income.getAmount();
        }else{
            money = income.getAmount();
        }
        userService.updateUserMoney(user.getId(), money);
        return result;
    }
}
