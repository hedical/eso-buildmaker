import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';

// Material UI
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        color: 'white'
    },
    paper: {
        marginRight: theme.spacing(2),
    },
}));

const AuthOptions = () => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);


    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory(); // will follow everything in the navbar
    const register = () => history.push("/register")
    const login = () => history.push("/login")
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    }

    return (
        <div className="row">
            {
                userData.user
                    ? <>
                        < div className={classes.root} >

                            <div>
                                <Button
                                    className="ml-2"
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    {userData.user.username}
                                </Button>
                                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                        <MenuItem onClick={handleClose}>My builds</MenuItem>
                                                        <MenuItem onClick={handleClose}>Create build</MenuItem>
                                                        <MenuItem onClick={handleClose, logout}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        </div >
                        {/* <button className="btn text-light">{userData.user.username}</button>
                        <button className="btn text-light" onClick={logout}>Log out</button>
                        <div className="mr-2">
                            <Avatar src="/broken-image.jpg" />
                        </div> */}
                    </>

                    :
                    <>
                        <button className="btn text-light" onClick={register}>Register</button>
                        <button className="btn text-light" onClick={login}>Log in</button>
                    </>

            }

        </div>
    )
}

export default AuthOptions

