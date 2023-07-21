package com.ground.sswm.auth.domain;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthRepository extends JpaRepository<Auth,Integer> {
    Auth findByUserId(Long userId);
}
