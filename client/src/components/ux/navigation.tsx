import { Link } from '@tanstack/react-router'
import { RemoveAuthToken } from '../../atoms/token'
import { useEffect, useState } from 'react';
import { apiClient } from '../../lib/api/client';
import { IsAdmin, SetAdmin } from '../../atoms/isadmin';
import LoadingLabel from '../ui/loading_label';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';

export default function Navigation() {

    function logOut() {
        RemoveAuthToken();
    }

    const { mutate, isPending } = apiClient.useMutation("get", "/api/user/", {
        onSuccess: (data) => {
            if (data.roles?.includes('ROLE_ADMIN')) {
                SetAdmin(true);
            }
            else {
                SetAdmin(false);
            }
        }
    });

    useEffect(() => {
        mutate({});
    }, [])


    const pages =
        [
            {
                name: "Home",
                route: "/",
                isAdmin: false
            },
            {
                name: "Collections",
                route: "/collection",
                isAdmin: false

            },
            {
                name: "Users",
                route: "/users",
                isAdmin: true
            },
            {
                name: "Settings",
                route: "/settings"
            },
        ]

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    if (isPending) return <LoadingLabel />


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page, i) => (
                                <MenuItem key={i} onClick={handleCloseNavMenu}>
                                    <Button
                                        component={Link}
                                        to={page.route}
                                        sx={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        {page.name}
                                    </Button>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Button
                                key={i}
                                component={Link}
                                to={page.route}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}