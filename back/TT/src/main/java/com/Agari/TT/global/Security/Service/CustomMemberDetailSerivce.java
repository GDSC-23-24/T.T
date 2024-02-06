package com.Agari.TT.global.Security.Service;


import com.Agari.TT.domain.Member.Entity.Member;
import com.Agari.TT.domain.Member.Entity.MemberDetail;
import com.Agari.TT.domain.Member.Repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
public class CustomMemberDetailSerivce implements UserDetailsService {

    @Autowired
    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

      log.info("시큐리티 서비스 진입");
        Optional<Member> member = memberRepository.findByLoginId(username);
        if (!member.isPresent()){
            throw new UsernameNotFoundException("계정을 찾을 수 없습니다.");
        }
        log.info("security : " + member.get().getRole().name());
        return new MemberDetail(member.get());
    }


}
