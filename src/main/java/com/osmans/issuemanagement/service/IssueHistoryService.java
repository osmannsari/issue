package com.osmans.issuemanagement.service;

import com.osmans.issuemanagement.dto.IssueHistoryDto;
import com.osmans.issuemanagement.entity.Issue;
import com.osmans.issuemanagement.entity.IssueHistory;
import com.osmans.issuemanagement.util.TPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface IssueHistoryService {
    IssueHistoryDto save(IssueHistoryDto issueHistory);

    IssueHistoryDto getById(Long id);

    TPage<IssueHistoryDto> getAllPageable(Pageable pageable);

    List<IssueHistoryDto> getByIssueId(Long id);

    Boolean delete(IssueHistoryDto issueHistory);

    void addHistory(Long id, Issue issue);


}
