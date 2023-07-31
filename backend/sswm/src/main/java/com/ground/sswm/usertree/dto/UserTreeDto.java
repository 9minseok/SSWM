package com.ground.sswm.usertree.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class UserTreeDto {

    private Long userId;
    private Long treeId;
    private int exp;
}
