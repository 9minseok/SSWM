package com.ground.sswm.usertree.service;

import com.ground.sswm.tree.model.Tree;
import com.ground.sswm.user.model.User;
import com.ground.sswm.usertree.model.UserTree;
import com.ground.sswm.usertree.model.dto.UserTreeDto;
import com.ground.sswm.usertree.repository.UserTreeRepository;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserTreeServiceImpl implements UserTreeService {

    private final UserTreeRepository userTreeRepository;


    @Override
    public String randTree(Long userId) {
        User user = new User();
        user.setId(userId);

        List<Long> trees = userTreeRepository.findByUserIdNotIn(userId);

        Collections.shuffle(trees);

        Tree tree = new Tree();
        tree.setId(trees.get(0));

        UserTree userTree = new UserTree();
        userTree.setUser(user);
        userTree.setTree(tree);
        userTree.setExp(0);

        userTreeRepository.save(userTree);

        return "생성완료";
    }
    @Override
    public UserTreeDto nowTree(Long userId) {
        Optional<UserTree> userTree = userTreeRepository.findByUserId(userId);

        UserTreeDto userTreeDto = new UserTreeDto();
        userTreeDto.setUserId(userId);
        userTreeDto.setTreeId(userTree.get().getTree().getId());
        userTreeDto.setExp(userTree.get().getExp());

        return userTreeDto;
    }

    @Override
    public List<UserTreeDto> searchMaxTree(Long userId) {
        List<UserTree> userTrees = userTreeRepository.findAllByUserId(userId);
        List<UserTreeDto> userTreeDtos = new ArrayList<>();

        for (UserTree userTree : userTrees) {
            UserTreeDto userTreeDto = new UserTreeDto();
            userTreeDto.setUserId(userId);
            userTreeDto.setTreeId(userTree.getTree().getId());
            userTreeDto.setExp(userTree.getExp());

            userTreeDtos.add(userTreeDto);
        }

        return userTreeDtos;
    }
}
