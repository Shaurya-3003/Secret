import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import style from "../css-modules/landing.module.css"

export default function InitNav() {

    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky" color='transparent' elevation={0}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link
                            component="button"
                            variant="h6"
                            underline='none'
                            color='white'
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            Secret
                        </Link>
                    </Typography>
                    <Button ><span className={style.btncolor}> About </span></Button>
                    <Button onClick={() => navigate('/login')}><span className={style.btncolor}> Login </span></Button>
                    <Button onClick={() => navigate('/signup')}><span className={style.btncolor}> Signup </span></Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}