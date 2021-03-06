//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract TaskContract{

    event AddTask(address recipient,uint taskId);
    event DeleteTask(uint taskId,bool isDeleted);

    struct Task{
        uint id;
        string taskText;
        bool isDeleted;
    }

    Task[] private tasks;

    mapping(uint256 => address) taskToOwner;

    function addTask(string memory taskText,bool isDeleted) external {
      
    }



}