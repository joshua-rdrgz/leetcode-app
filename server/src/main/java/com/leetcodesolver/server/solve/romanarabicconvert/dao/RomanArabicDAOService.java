package com.leetcodesolver.server.solve.romanarabicconvert.dao;

import com.leetcodesolver.server.solve.romanarabicconvert.entity.RomanArabicEntity;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse;
import com.leetcodesolver.server.solve.romanarabicconvert.response.RomanArabicResponse.RomanArabicData;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RomanArabicDAOService {
    private static RomanArabicDAO romanIntDao;

    public RomanArabicDAOService(RomanArabicDAO dao) {
        romanIntDao = dao;
    }

    public static void deleteAll() {
        romanIntDao.deleteAll();
    }

    public static void saveConversion(String romanNumeral, int number) {
        RomanArabicEntity conversion = new RomanArabicEntity(romanNumeral, number);
        romanIntDao.save(conversion);
    }

    public static RomanArabicResponse checkDatabase(String input, boolean isArabic) {
        if (isArabic) {
            int arabicNumeral = Integer.parseInt(input);
            return checkDatabaseFor(arabicNumeral);
        } else {
            String romanNumeral = input;
            return checkDatabaseFor(romanNumeral);
        }
    }

    private static RomanArabicResponse checkDatabaseFor(int number) {
        Optional<RomanArabicEntity> cachedConversion = romanIntDao
                .findByNumber(number);

        return cachedConversion
                .map(entity -> new RomanArabicResponse(
                        new RomanArabicData(
                                entity.getRomanNumeral(),
                                entity.getNumber())))
                .orElse(null);
    }

    private static RomanArabicResponse checkDatabaseFor(String romanNumeral) {
        Optional<RomanArabicEntity> cachedConversion = romanIntDao
                .findByRomanNumeral(romanNumeral);

        return cachedConversion
                .map(entity -> new RomanArabicResponse(
                        new RomanArabicData(
                                entity.getRomanNumeral(),
                                entity.getNumber())))
                .orElse(null);
    }
}
