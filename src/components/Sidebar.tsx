import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material';
import {
  HomeOutlined,
  PeopleOutlined,
  WarningOutlined,
  NotificationsOutlined,
  DataUsageOutlined,
  AssessmentOutlined,
  CloudOutlined,
  SettingsOutlined,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { tokens } from '../theme';

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
};

type MenuItem = {
  title: string;
  to: string;
  icon: JSX.Element;
};

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, mode }: SidebarProps) => {
  const theme = useTheme();
  const colors = tokens[mode];
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const menuItems: MenuItem[] = [
    { title: 'Dashboard', to: '/', icon: <HomeOutlined /> },
    { title: 'User Management', to: '/users', icon: <PeopleOutlined /> },
    { title: 'Disaster Forecast', to: '/disaster-forecast', icon: <WarningOutlined /> },
    { title: 'Notifications', to: '/notifications', icon: <NotificationsOutlined /> },
    { title: 'Sensor Data', to: '/sensor-data', icon: <DataUsageOutlined /> },
    { title: 'Reports', to: '/reports', icon: <AssessmentOutlined /> },
    { title: 'AI Forecast', to: '/ai-forecast', icon: <CloudOutlined /> },
    { title: 'Settings', to: '/settings', icon: <SettingsOutlined /> },
  ];

  const drawerWidth = 240;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', padding: theme.spacing(1, 1) }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, p: 2 }}>
          <CloudOutlined sx={{ mr: 1, color: colors.blueAccent[500] }} />
          <Typography variant="h5" fontWeight="bold" color={colors.blueAccent[500]}>
            WEATHER ADMIN
          </Typography>
        </Box>
        <IconButton onClick={() => setIsSidebarOpen(false)}>
          {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Box sx={{ overflow: 'auto', height: '100%' }}>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                component={Link}
                to={item.to}
                selected={selected === item.to}
                onClick={() => setSelected(item.to)}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: colors.blueAccent[800],
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: colors.blueAccent[700],
                    },
                    '& .MuiListItemIcon-root': {
                      color: '#fff',
                    },
                  },
                  '&:hover': {
                    backgroundColor: colors.blueAccent[900],
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: selected === item.to ? '#fff' : colors.grey[100],
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;