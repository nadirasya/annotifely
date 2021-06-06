import React, { useState } from 'react';
import {CssBaseline, Container} from '@material-ui/core';

import Navbar from '../Navbar/Navbar';
import EmptyTask from './TaskListComponents//EmptyTask';
import Tasks from './TaskListComponents/Tasks';

const TaskList = () => {
    const [taskList, setTaskList] = useState('empty');

    return (
        <>
            <CssBaseline />
            <Navbar />
            <Container maxWidth="lg">
                <main>
                    { taskList === 'empty' ?
                        <EmptyTask />
                    : 
                    <Tasks />
                    }
                </main>
            </Container>
        </>
    );
}

export default TaskList;