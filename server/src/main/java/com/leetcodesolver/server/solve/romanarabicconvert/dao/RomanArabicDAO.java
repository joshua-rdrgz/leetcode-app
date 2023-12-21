package com.leetcodesolver.server.solve.romanarabicconvert.dao;

import java.util.Optional;
import java.util.UUID;

import com.leetcodesolver.server.solve.romanarabicconvert.entity.RomanArabicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RomanArabicDAO extends JpaRepository<RomanArabicEntity, UUID> {

    Optional<RomanArabicEntity> findByRomanNumeral(String romanNumeral);

    Optional<RomanArabicEntity> findByNumber(int number);

}
