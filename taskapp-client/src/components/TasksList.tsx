import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Box, Button, Chip } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { User } from '../services/auth';
import { Task } from '../types/Task';


function getDummyTasks(user: User): Task[] {
  return [
    {
      id: 5,
      createdAt: '2022-05-26T00:00:00Z',
      modifiedAt: '2022-05-26T00:00:00Z',
      title: 'Task 5',
      description: '',
      body: '',
      status: 'Unassigned',
      creator: user,
      assignee: null,
    },
    {
      id: 4,
      createdAt: '2022-05-26T00:00:00Z',
      modifiedAt: '2022-05-26T00:00:00Z',
      title: 'Task 4',
      description: '',
      body: '',
      status: 'Assigned',
      creator: user,
      assignee: user,
    },
    {
      id: 3,
      createdAt: '2022-05-26T00:00:00Z',
      modifiedAt: '2022-05-26T00:00:00Z',
      title: 'Task 3',
      description: '',
      body: '',
      status: 'In Progress',
      creator: user,
      assignee: user,
    },
    {
      id: 2,
      createdAt: '2022-05-26T00:00:00Z',
      modifiedAt: '2022-05-26T00:00:00Z',
      title: 'Task 2',
      description: '',
      body: '',

      creator: user,
      assignee: user,
      status: 'Needs Review',
    },
    {
      id: 1,
      createdAt: '2022-05-26T00:00:00Z',
      modifiedAt: '2022-05-26T00:00:00Z',
      title: 'Task 1',
      description: '',
      body: '',
      creator: user,
      assignee: user,
      status: 'Done',
    },
  ];
}

// TODO connect to backend
async function fetchTasks(user: User): Promise<Task[]> {
  return Promise.resolve(getDummyTasks(user));
}


type TaskStatusChipProps = {
  status: string;
}
type ChipColor = 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';

const TaskStatusChip = ({ status }: TaskStatusChipProps) => {
  let chipType: ChipColor;
  if (status === 'Done') {
    chipType = 'success';
  } else if (status === 'Needs Review') {
    chipType = 'warning';
  } else if (status === 'In Progress') {
    chipType = 'primary';
  } else if (status === 'Assigned') {
    chipType = 'secondary';
  } else {
    chipType = 'info';
  }
  return (
    <Chip label={status} color={chipType} />
  );
}

type TasksListsTableProps = {
  tasks: Task[];
};

const TasksListsTable = ({ tasks }: TasksListsTableProps) => {
  const [navigateToTaskId, setNavigateToTaskId] = useState<null | string>(null);
  function onClickTaskTitle(task: Task) {
    setNavigateToTaskId('/tasks/' + task.id);
  }
  return (
    <>
      {navigateToTaskId !== null && <Redirect to={navigateToTaskId} />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Assignee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow
                key={task.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {task.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button variant="text" onClick={() => onClickTaskTitle(task)}>
                    {task.title}
                  </Button>
                </TableCell>
                <TableCell align="right">{task.createdAt}</TableCell>
                <TableCell align="right"><TaskStatusChip status={task.status} /></TableCell>
                <TableCell align="right">{task.assignee && task.assignee.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

type TasksListProps = {
  user: User;
};

type TasksListState = {
  error: boolean;
  loading: boolean;
  tasks: null | Task[];
};

export const TasksList = ({ user }: TasksListProps) => {
  const [state, setState] = useState<TasksListState>({ error: false, loading: true, tasks: null });

  useEffect(() => {
    fetchTasks(user)
      .then(tasks => setState({ loading: false, error: false, tasks }))
      .catch(() => setState({ loading: false, error: true, tasks: null}));
  });

  return (
    <Box>
      {state.loading && <LoadingButton />}
      {state.error && <Alert severity='error'>Error loading tasks</Alert>}
      {state.tasks !== null && <TasksListsTable tasks={state.tasks} />}
    </Box>
  );
};
