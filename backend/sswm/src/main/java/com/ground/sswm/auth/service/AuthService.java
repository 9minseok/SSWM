package com.ground.sswm.auth.service;

import com.ground.sswm.auth.domain.Auth;
import com.ground.sswm.auth.dto.JwtDto;
import com.ground.sswm.user.domain.User;
import java.util.Map;

public interface AuthService {

    JwtDto createTokens(User user);
    Map<String, Object> getClaimsFromToken(String token);

    Auth getSavedTokenByUserId(Long id);

    String createAccessToken(Map<String, Object> claims);

    void saveTokens(Long id, JwtDto jwtDto);

    void updateTokens(Auth saved);


}
