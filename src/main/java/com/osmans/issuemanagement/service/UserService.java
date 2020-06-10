package com.osmans.issuemanagement.service;


import com.osmans.issuemanagement.dto.UserDto;
import com.osmans.issuemanagement.entity.User;
import com.osmans.issuemanagement.util.TPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {

    UserDto save(UserDto user);

    UserDto getById(Long id);

    TPage<UserDto> getAllPageable(Pageable pageable);

    UserDto getByUsername(String username);
}
