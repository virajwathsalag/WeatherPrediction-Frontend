import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import DisasterForecast from './pages/DisasterForecast';
import Notifications from './pages/Notifications';
import SensorData from './pages/SensorData';
import Reports from './pages/Reports';
import AIForecast from './pages/AIForecast';
import Settings from './pages/Settings';

// Theme settings
import { tokens } from './theme';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Theme configuration
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: tokens.dark.primary[500],
            },
            secondary: {
              main: tokens.dark.greenAccent[500],
            },
            background: {
              default: tokens.dark.primary[500],
              paper: tokens.dark.primary[400],
            },
          }
        : {
            primary: {
              main: tokens.light.primary[100],
            },
            secondary: {
              main: tokens.light.greenAccent[500],
            },
            background: {
              default: '#fcfcfc',
              paper: '#ffffff',
            },
          }),
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app" sx={{ display: 'flex', height: '100%' }}>
        <Sidebar 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          mode={mode} 
          setMode={setMode} 
        />
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Topbar 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen} 
            mode={mode} 
            setMode={setMode} 
          />
          <Box sx={{ p: 2 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/disaster-forecast" element={<DisasterForecast />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/sensor-data" element={<SensorData />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/ai-forecast" element={<AIForecast />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;