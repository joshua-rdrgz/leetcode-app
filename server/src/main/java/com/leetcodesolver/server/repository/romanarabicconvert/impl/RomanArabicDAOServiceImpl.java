package com.leetcodesolver.server.repository.romanarabicconvert.impl;

import com.leetcodesolver.server.dto.romanarabicconvert.RomanArabicResponse;
import com.leetcodesolver.server.entity.romanarabicconvert.RomanArabicEntity;
import com.leetcodesolver.server.repository.romanarabicconvert.RomanArabicDAO;
import com.leetcodesolver.server.repository.romanarabicconvert.RomanArabicDAOService;
import com.leetcodesolver.server.utility.romanarabicconvert.RomanArabicInput;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RomanArabicDAOServiceImpl implements RomanArabicDAOService {
    private final RomanArabicDAO romanIntDao;

    public RomanArabicDAOServiceImpl(RomanArabicDAO dao) {
        this.romanIntDao = dao;
    }

    @Override
    public void deleteAll() {
        romanIntDao.deleteAll();
    }

    @Override
    public void saveConversion(String romanNumeral, int number) {
        RomanArabicEntity conversion = new RomanArabicEntity(romanNumeral, number);
        romanIntDao.save(conversion);
    }

    @Override
    public RomanArabicResponse checkDatabase(RomanArabicInput input) {
        if (input.isArabicNumeral()) {
            return checkDatabaseFor(input.getArabicNumeral());
        } else {
            return checkDatabaseFor(input.getRomanNumeral());
        }
    }

    private RomanArabicResponse checkDatabaseFor(int number) {
        Optional<RomanArabicEntity> cachedConversion = romanIntDao.findByNumber(number);

        return cachedConversion
                .map(entity -> new RomanArabicResponse(
                        new RomanArabicResponse.RomanArabicData(
                                entity.getRomanNumeral(),
                                entity.getNumber())))
                .orElse(null);
    }

    private RomanArabicResponse checkDatabaseFor(String romanNumeral) {
        Optional<RomanArabicEntity> cachedConversion = romanIntDao.findByRomanNumeral(romanNumeral);

        return cachedConversion
                .map(entity -> new RomanArabicResponse(
                        new RomanArabicResponse.RomanArabicData(
                                entity.getRomanNumeral(),
                                entity.getNumber())))
                .orElse(null);
    }
}