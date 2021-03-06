import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  Divider,
  Button,
  ListItem,
  List,
  ListItemIcon,
  Box,
  Grid,
  IconButton,
  Avatar,
  Chip,
  ListItemAvatar,
  ListItemText,
  FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import CreateIcon from '@mui/icons-material/Create';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import GoogleAuth from './GoogleAuth';
import { logout } from '../../modules/user';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import client from '../../lib/api/client';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { changeSession, initialize } from '../../modules/study';
import { withdrawal } from '../../lib/api/auth';

const CustomizedAppBar = styled(AppBar)`
  background-color: #f2f3f7;
`;

const CustomizedToolbar = styled(Toolbar)`
  width: 90%;
  margin: 0 auto;
  min-height: 0px;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
`;

const CusotmizedButton = styled(Button)`
  color: black;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.87);
`;

const ModalBoxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalBoxStyle2 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
};

const Navbar = ({ history, location }) => {
  const [session, setSession] = useState('');
  const [open, setOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [enterModalOpen, setEnterModalOpen] = useState(false);
  const [myInfoModalOpen, setMyInfoModalOpen] = useState(false);
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { user } = useSelector(({ user }) => ({
    user: user.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    history.push('/');
    setOpen(true);
  };

  const successWithdrawal = () => {
    dispatch(logout());
    history.push('/');
    setWithdrawalOpen(true);
  };

  const modalHandleOpen = () => setModalOpen(true);
  const modalHandleClose = () => setModalOpen(false);
  const enterModalHandleOpen = () => setEnterModalOpen(true);
  const enterModalHandleClose = () => setEnterModalOpen(false);
  const myInfoModalHandleOpen = () => setMyInfoModalOpen(true);
  const myInfoModalHandleClose = () => setMyInfoModalOpen(false);
  const withdrawalModalHandleopen = () => setWithdrawalModalOpen(true);
  const withdrawalModalHandleClose = () => setWithdrawalModalOpen(false);
  const errorModalHandleopen = () => setErrorModalOpen(true);
  const errorModalHandleClose = () => setErrorModalOpen(false);

  const [sideState, setSideState] = useState(false);

  const onSubmitSession = (e) => {
    dispatch(changeSession(e));
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setSideState(open);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const errorHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorModalOpen(false);
  };
  const withdrawalHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setWithdrawalOpen(false);
  };

  if (location.pathname === '/study') {
    return null;
  }

  return (
    <>
      <Box>
        <CustomizedAppBar elevation={0}>
          <CustomizedToolbar>
            <Box sx={{ flexGrow: 1 }}>
              {/* <CusotmizedButton onClick={toggleDrawer(true)}>
              ????????????
            </CusotmizedButton> */}
              <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Drawer
              anchor="left"
              open={sideState}
              onClose={toggleDrawer(false)}
            >
              <h1 style={{ marginLeft: '5rem', marginRight: '5rem' }}>
                Cohort
              </h1>
              <Divider />

              <Grid
                item
                container
                direction="column"
                justifyContent="space-between"
                xs={12}
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <Grid item>
                  <List>
                    <StyledLink to="/">
                      <ListItem button>
                        <ListItemIcon>
                          <HomeIcon />
                        </ListItemIcon>
                        ????????????
                      </ListItem>
                    </StyledLink>
                    <ListItem
                      button
                      onClick={() => {
                        if (user) {
                          modalHandleOpen();
                        } else {
                          setErrorModalOpen(true);
                        }
                      }}
                    >
                      <ListItemIcon>
                        <CreateIcon />
                      </ListItemIcon>
                      ????????????
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => {
                        if (user) {
                          enterModalHandleOpen();
                          setSession('');
                        } else {
                          setErrorModalOpen(true);
                        }
                      }}
                    >
                      <ListItemIcon>
                        <ConnectWithoutContactIcon />
                      </ListItemIcon>
                      ????????????
                    </ListItem>
                    <StyledLink to="/post">
                      <ListItem button>
                        <ListItemIcon>
                          <WysiwygIcon />
                        </ListItemIcon>
                        ???????????????
                      </ListItem>
                    </StyledLink>
                  </List>
                </Grid>

                {user && (
                  <Grid item>
                    <List>
                      <ListItem button onClick={myInfoModalHandleOpen}>
                        <ListItemIcon>
                          <SettingsIcon />
                        </ListItemIcon>
                        ?????????
                      </ListItem>
                      <ListItem button onClick={onLogout}>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        ????????????
                      </ListItem>
                    </List>
                  </Grid>
                )}
              </Grid>
            </Drawer>
            {/* <CusotmizedButton>?????????</CusotmizedButton> */}
            <GoogleAuth />
          </CustomizedToolbar>
        </CustomizedAppBar>
      </Box>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} variant="filled" severity="success">
          ??????????????? ??????????????????.
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={withdrawalOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={withdrawalHandleClose}
      >
        <MuiAlert
          onClose={withdrawalHandleClose}
          variant="filled"
          severity="success"
        >
          ??????????????? ??????????????????.
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={errorModalOpen}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={errorHandleClose}
      >
        <MuiAlert onClose={errorHandleClose} variant="filled" severity="error">
          ???????????? ????????? ???????????????.
        </MuiAlert>
      </Snackbar>

      {/* ???????????? ?????? */}
      <div>
        <Modal
          keepMounted
          open={modalOpen}
          onClose={modalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle2}>
            <>
              <Box sx={{ p: 3 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}
                >
                  ???????????? ?????????
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  style={{
                    color: 'gray',
                    textAlign: 'center',
                    marginBottom: 30,
                  }}
                >
                  ????????? ???????????? ??????????????? ????????? ?????????. ???????????? ????????????
                  ???????????? ??? ??? ????????????.
                </Typography>
                <Typography
                  id="modal-modal-description"
                  variant="button"
                  sx={{ mt: 2 }}
                >
                  ??? ?????? ??????
                </Typography>
                {user && user.status === 'success' && (
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-basic"
                      value={user.data.mail
                        .substring(0, parseInt(user.data.mail.length) - 10)
                        .replace(/\./g, '')}
                      variant="outlined"
                      size="small"
                      readOnly
                    />
                  </FormControl>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#EEEEEE',
                  p: 2,
                }}
              >
                <Button
                  variant="text"
                  onClick={modalHandleClose}
                  style={{ color: 'black' }}
                >
                  ?????? ??????
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onSubmitSession(
                      user.data.mail
                        .substring(0, parseInt(user.data.mail.length) - 10)
                        .replace(/\./g, ''),
                    );
                    modalHandleClose();
                    history.push('/study');
                  }}
                >
                  ?????????
                </Button>
              </Box>
            </>
          </Box>
        </Modal>
      </div>

      {/* ???????????? ?????? */}
      <div>
        <Modal
          keepMounted
          open={enterModalOpen}
          onClose={enterModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle2}>
            <>
              <Box sx={{ p: 3 }}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 10,
                  }}
                >
                  ???????????? ????????????
                </Typography>
                <Typography
                  id="modal-modal-title"
                  variant="body1"
                  style={{
                    color: 'gray',
                    textAlign: 'center',
                    marginBottom: 30,
                  }}
                >
                  ????????? ?????? ????????? ???????????? ??????????????? ???????????????.
                </Typography>
                <Typography
                  id="modal-modal-description"
                  variant="button"
                  sx={{ mt: 2 }}
                >
                  ??? ?????? ??????
                </Typography>
                {user && user.status === 'success' && (
                  <FormControl fullWidth>
                    <TextField
                      id="filled-required"
                      variant="filled"
                      value={session}
                      onChange={(e) => setSession(e.target.value)}
                      size="small"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          onSubmitSession(session);
                          enterModalHandleClose();
                          history.push('/study');
                        }
                      }}
                    />
                  </FormControl>
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: '#EEEEEE',
                  p: 2,
                }}
              >
                <Button
                  variant="text"
                  onClick={enterModalHandleClose}
                  style={{ color: 'black' }}
                >
                  ?????? ??????
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    onSubmitSession(session);
                    enterModalHandleClose();
                    history.push('/study');
                  }}
                >
                  ????????????
                </Button>
              </Box>
            </>
          </Box>
        </Modal>
      </div>
      {/* ??? ?????? ?????? */}
      <div>
        {/* <Button onClick={modalHandleOpen}>???????????????</Button> */}
        <Modal
          keepMounted
          open={myInfoModalOpen}
          onClose={myInfoModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              style={{ fontWeight: 'bold' }}
            >
              ??? ??????
            </Typography>
            <Divider>
              <Chip label="INFO" />
            </Divider>
            {user && user.status === 'success' && (
              <>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="profile" src={user.data.image} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ textAlign: 'center', margin: 5 }}
                      primary={user.data.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            ????????? :
                          </Typography>
                          {user.data.mail}
                        </>
                      }
                    />
                  </ListItem>
                </List>
              </>
            )}
            <Divider />
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, p: 1 }}
            >
              <Button
                variant="outlined"
                onClick={myInfoModalHandleClose}
                style={{ marginRight: 10 }}
              >
                ??????
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  withdrawalModalHandleopen();
                }}
                color="error"
              >
                ????????????
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
      <div>
        {/* ???????????? ?????? ?????? */}
        <Modal
          keepMounted
          open={withdrawalModalOpen}
          onClose={withdrawalModalHandleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalBoxStyle}>
            <Typography id="modal-modal-title" variant="h6">
              ?????? ???????????? ??????????????????
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  withdrawalModalHandleClose();
                }}
                style={{ marginRight: 10 }}
              >
                ?????????
              </Button>
              <Button
                variant="outlined"
                onClick={async () => {
                  try {
                    const response = await withdrawal(user.data.mail);
                    if (response.data.status === 'success') {
                      successWithdrawal();
                      withdrawalModalHandleClose();
                      myInfoModalHandleClose();
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }}
                color="error"
              >
                ???
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default withRouter(Navbar);
