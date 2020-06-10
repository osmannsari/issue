package com.osmans.issuemanagement.service.impl;

import com.osmans.issuemanagement.dto.IssueDetailDto;
import com.osmans.issuemanagement.dto.IssueDto;
import com.osmans.issuemanagement.dto.IssueHistoryDto;
import com.osmans.issuemanagement.dto.IssueUpdateDto;
import com.osmans.issuemanagement.entity.Issue;
import com.osmans.issuemanagement.entity.IssueStatus;
import com.osmans.issuemanagement.entity.User;
import com.osmans.issuemanagement.repository.IssueRepository;
import com.osmans.issuemanagement.repository.ProjectRepository;
import com.osmans.issuemanagement.repository.UserRepository;
import com.osmans.issuemanagement.service.IssueHistoryService;
import com.osmans.issuemanagement.service.IssueService;
import com.osmans.issuemanagement.util.TPage;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class IssueServiceImpl implements IssueService {

    private final UserRepository userRepository;
    private final IssueRepository issueRepository;
    private final ModelMapper modelMapper;
    private final IssueHistoryService issueHistoryService;
    private final ProjectRepository projectRepository;


    public IssueServiceImpl(ProjectRepository projectRepository, UserRepository userRepository, IssueRepository issueRepository, ModelMapper modelMapper, IssueHistoryService issueHistoryService, IssueHistoryService issueHistoryService1) {

        this.projectRepository = projectRepository;
        this.issueRepository = issueRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.issueHistoryService = issueHistoryService1;
    }


    @Override
    public IssueDto save(IssueDto issue) {
        // Bussiness Logic

        issue.setDate(new Date());
        issue.setIssueStatus(IssueStatus.OPEN);


        Issue issueEntity = modelMapper.map(issue, Issue.class);
        issueEntity.setProject(projectRepository.getOne(issue.getProjectId()));
        issueEntity = issueRepository.save(issueEntity);

        issue.setId(issueEntity.getId());
        return issue;
    }


    @Transactional
    public IssueDetailDto update(Long id, IssueUpdateDto issue) {
        Issue issueDb = issueRepository.getOne(id);
        User user = userRepository.getOne(issue.getAssignee_id());
        issueHistoryService.addHistory(id, issueDb);

        issueDb.setAssignee(user);
        issueDb.setDate(issue.getDate());
        issueDb.setDescription(issue.getDescription());
        issueDb.setDetails(issue.getDetails());
        issueDb.setIssueStatus(issue.getIssueStatus());
        issueDb.setProject(projectRepository.getOne(issue.getProject_id()));
        issueRepository.save(issueDb);
        return getByIdWithDetails(id);
    }


    @Override
    public IssueDto getById(Long id) {
        Issue issue = issueRepository.getOne(id);
        return modelMapper.map(issue, IssueDto.class);
    }

    @Override
    public TPage<IssueDto> getAllPageable(Pageable pageable) {
        Page<Issue> data = issueRepository.findAll(pageable);
        TPage<IssueDto> response = new TPage<IssueDto>();
        response.setStat(data, Arrays.asList(modelMapper.map(data.getContent(), IssueDto[].class)));
        return response;
    }

    public IssueDetailDto getByIdWithDetails(Long id) {
        Issue issue = issueRepository.getOne(id);
        IssueDetailDto detailDto = modelMapper.map(issue, IssueDetailDto.class);
        List<IssueHistoryDto> issueHistoryDtos = issueHistoryService.getByIssueId(issue.getId());
        detailDto.setIssueHistories(issueHistoryDtos);
        return detailDto;
    }

    public List<IssueDto> getAll() {
        List<Issue> data = issueRepository.findAll();
        return Arrays.asList(modelMapper.map(data, IssueDto[].class));
    }

    @Override
    public Boolean delete(Long issueId) {
        issueRepository.deleteById(issueId);
        return true;
    }

    @Override
    public IssueDto update(Long id, IssueDto project) {
        return null;
    }


}
