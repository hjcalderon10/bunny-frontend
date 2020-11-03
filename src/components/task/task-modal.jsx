import React, {useState, useEffect} from 'react';
import constants from './../../constants';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { cos } from 'prelude-ls';

const {create, task} = constants

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  button: {
    margin: theme.spacing(1),
  },
  cancelButton: {
    margin: theme.spacing(1),
    backgroundColor: '#da6b6b !important'
  },
  select: {
    paddingTop: '15px'
  }
}));

export default function TaskModal({handleClose, open, actions, taskStates, idSelected}) {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [state, setState] = useState();

  useEffect(() => {
    if(taskStates && taskStates.length > 0){
      setState(parseInt(taskStates[0].id));
    }
  }, [taskStates])

  const createTask = () => {
    actions(task, create, {title: title.trim(), description: description.trim(), state_id: state, user_id: idSelected});
    setTitle('');
    setDescription('');
    setState(parseInt(taskStates[0].id));
    handleClose();
  }

  const ocn = (evt) => setTitle(evt.target.value)
  const ocnn = (evt) => setDescription(evt.target.value)
  const ss = (evt) => setState(parseInt(evt.target.value))

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2>Create new Task </h2>
          <div className='modal-content'>
            <TextField label="Title" placeholder="My brand new task" value={title} onChange={ocn}/>
            <TextField label="Description" placeholder="Some stuff I really wanna do" value={description} onChange={ocnn}/>
            <div className='flex-row modal-list'>
              <p>State: </p>
              <div className='grow'/>
              <Select className={classes.select}
                native
                onChange={ss}
                defaultValue={"1"}
              >
                {taskStates.map((ts, idx) => <option key={idx} value={ts.id}>{ts.state}</option>)}
              </Select>
            </div>
          </div>
          <div className='flex-row'>
            <Button className={classes.cancelButton} variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button className={classes.button} variant='contained' onClick={createTask} disabled={(title || description) == false}>
              Create
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}