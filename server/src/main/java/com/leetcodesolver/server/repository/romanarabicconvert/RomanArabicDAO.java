package com.leetcodesolver.server.repository.romanarabicconvert;

import java.util.Optional;
import java.util.UUID;

import com.leetcodesolver.server.entity.romanarabicconvert.RomanArabicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RomanArabicDAO extends JpaRepository<RomanArabicEntity, UUID> {

    Optional<RomanArabicEntity> findByRomanNumeral(String romanNumeral);

    Optional<RomanArabicEntity> findByNumber(int number);

}
