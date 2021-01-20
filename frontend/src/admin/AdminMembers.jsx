import { 
    Avatar, 
    Container, 
    Divider, 
    Fab, 
    IconButton, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemSecondaryAction, 
    ListItemText, 
    makeStyles,
    Modal,
    Backdrop,
} from '@material-ui/core';
import { AccountCircle, Add, Close, Delete } from '@material-ui/icons';
import React,{ useEffect, useState} from 'react';
import AdminRegistration from '../AdminRegistration';
import colors from '../utils/colors';
import client from '../api/client';

const admins = [{
  emailId: 'sampleadmin@gmail.com',
  password: 'secret'
},{
  emailId: 'sampleadmin2@gmail.com',
  password: 'secret2'
}]

const useStyles = makeStyles((theme) => ({
    '@global': {
        '*::-webkit-scrollbar': {
          width: '0.4em',
          overflowY: 'hidden',
        },
        '*::-webkit-scrollbar-track': {
          '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '*::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          outline: '1px solid slategrey'
        }
    },
    root: {
        paddingLeft: '10%',
        paddingRight: '10%',  
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(7),
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        flexDirection: 'column',
        paddingBottom: '20%',
    },
    box: {
        marginTop: 70,
        width: 600,
        overflowY: 'scroll',
        backgroundColor: colors.light,
        borderRadius: 20,    
    }
}))

function AdminMembers(props) {
    const [open, setOpen] = useState(false);
    const [data,setData] = useState(admins);
    const styles = useStyles();
    useEffect(()=>{
      const fetchData = async ()=>{
        const result=await client.get('api/adminList');
        console.log(result.data);
        setData(result.data);
      }
      fetchData();
    },[]);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <Container className={styles.root}>
            <div className={styles.box}>
            <List>
              {data.map((element,index) => (
                <>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <AccountCircle />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={element.emailId}
                    secondary={`Password: secret`}
                    style={{ marginLeft: 10 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" style={{ marginRight: 20 }}>
                      <Delete style={{ color: colors.danger }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
                </>
              ))}
            </List>
            </div>
            <Modal
                className={styles.modal}
                open={open}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
            >
                <>
                <IconButton onClick={handleClose} style={{ marginLeft: '50%' }}>
                    <Close style={{ color: colors.white }} fontSize="large" />
                </IconButton>
                <AdminRegistration />
                </>
            </Modal>
            <Fab color="primary" className={styles.fab} onClick={handleOpen}>
                <Add />
            </Fab>
        </Container>
    );
}

export default AdminMembers;

