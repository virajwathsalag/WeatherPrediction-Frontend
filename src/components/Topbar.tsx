import { Box, IconButton, InputBase, Tooltip, useTheme } from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  NotificationsOutlined,
  SettingsOutlined,
  PersonOutlined,
  Search,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { tokens } from '../theme';

type TopbarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
};

const Topbar = ({ isSidebarOpen, setIsSidebarOpen, mode, setMode }: TopbarProps) => {
  const theme = useTheme();
  const colors = tokens[mode];

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      p={2} 
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* LEFT SIDE */}
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} sx={{ mr: 1 }}>
          <MenuIcon />
        </IconButton>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          sx={{
            boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          <InputBase sx={{ ml: 2, flex: 1, minWidth: '300px' }} placeholder="Search..." />
          <IconButton type="button" sx={{ p: 1 }}>
            <Search />
          </IconButton>
        </Box>
      </Box>

      {/* RIGHT SIDE */}
      <Box display="flex">
        <Tooltip title={mode === 'dark' ? 'Light Mode' : 'Dark Mode'}>
          <IconButton onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
            {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>
        </Tooltip>
        <Tooltip title="Notifications">
          <IconButton>
            <NotificationsOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton>
            <SettingsOutlined />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile">
          <IconButton>
            <PersonOutlined />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Topbar;