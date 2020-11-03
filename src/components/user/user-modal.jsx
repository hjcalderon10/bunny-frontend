import React, {useState} from 'react';
import constants from './../../constants';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const {create, user} = constants

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
  }
}));

export default function UserModal({handleClose, open, actions}) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');

  const createUser = () => {
    actions(user, create, {name: name.trim(), nickname: nickname.trim()});
    setName('');
    setNickname('');
    handleClose();
  }

  const ocn = (evt) => setName(evt.target.value)
  const ocnn = (evt) => setNickname(evt.target.value)

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
          <h2>Create new User </h2>
          <div className='modal-content'>
            <TextField label="Name" placeholder="Jon Doe" value={name} onChange={ocn}/>
            <TextField label="Nickname" placeholder="The unkown man" value={nickname} onChange={ocnn}/>
          </div>
          <div className='flex-row'>
            <Button className={classes.cancelButton} variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button className={classes.button} variant='contained' onClick={createUser} disabled={(name || nickname) == false}>
              Create
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}