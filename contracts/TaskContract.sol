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
        uint taskId = tasks.length;
        tasks.push(Task(taskId,taskText,isDeleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    }

     function deleteTask(uint taskId,bool isDeleted) external {
        if(taskToOwner[taskId] == msg.sender){
            tasks[taskId].isDeleted = isDeleted;
            emit DeleteTask(taskId, isDeleted);
        }
    }

    function getMyTasks() external view returns (Task[] memory){
        // Write here
    }



}