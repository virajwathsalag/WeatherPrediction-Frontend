import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  DataUsage as DataUsageIcon,
  Person as PersonIcon,
  Map as MapIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { tokens } from '../theme';
import Header from '../components/Header';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const Settings = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [tabValue, setTabValue] = useState(0);
  const [settings, setSettings] = useState({
    // General settings
    language: 'english',
    timeFormat: '24h',
    dateFormat: 'dd/mm/yyyy',
    temperatureUnit: 'celsius',
    windSpeedUnit: 'kmh',
    defaultLocation: 'London',
    startPage: 'dashboard',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    alertThreshold: 'medium',
    notificationSound: true,
    dailyDigest: true,
    weeklyReport: true,
    
    // Display settings
    darkMode: theme.palette.mode === 'dark',
    highContrast: false,
    fontSize: 'medium',
    animationsEnabled: true,
    dataRefreshRate: 5, // minutes
    showGridLines: true,
    compactView: false,
    
    // Map settings
    mapType: 'standard',
    mapZoomLevel: 10,
    showLegend: true,
    showLabels: true,
    mapLayers: ['temperature', 'precipitation', 'wind'],
    
    // Data settings
    dataRetentionPeriod: 90, // days
    dataExportFormat: 'csv',
    autoBackup: true,
    backupFrequency: 'weekly',
    dataResolution: 'hourly',
    
    // Account settings
    email: 'admin@weatherdashboard.com',
    name: 'Admin User',
    role: 'Administrator',
    twoFactorAuth: true,
    sessionTimeout: 30, // minutes
    apiAccessEnabled: true,
  });

  const [saveStatus, setSaveStatus] = useState<{
    saved: boolean;
    message: string;
  } | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSettingChange = (setting: string, value: any) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
    setSaveStatus(null);
  };

  const handleSaveSettings = () => {
    // In a real application, this would save settings to a backend
    setSaveStatus({
      saved: true,
      message: 'Settings saved successfully!',
    });
    
    // Clear the message after 3 seconds
    setTimeout(() => {
      setSaveStatus(null);
    }, 3000);
  };

  const handleResetSettings = () => {
    // Confirm before resetting
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      // Reset to default values (this would be more comprehensive in a real app)
      setSettings({
        // General settings
        language: 'english',
        timeFormat: '24h',
        dateFormat: 'dd/mm/yyyy',
        temperatureUnit: 'celsius',
        windSpeedUnit: 'kmh',
        defaultLocation: 'London',
        startPage: 'dashboard',
        
        // Notification settings
        emailNotifications: true,
        pushNotifications: true,
        smsNotifications: false,
        alertThreshold: 'medium',
        notificationSound: true,
        dailyDigest: true,
        weeklyReport: true,
        
        // Display settings
        darkMode: theme.palette.mode === 'dark',
        highContrast: false,
        fontSize: 'medium',
        animationsEnabled: true,
        dataRefreshRate: 5,
        showGridLines: true,
        compactView: false,
        
        // Map settings
        mapType: 'standard',
        mapZoomLevel: 10,
        showLegend: true,
        showLabels: true,
        mapLayers: ['temperature', 'precipitation', 'wind'],
        
        // Data settings
        dataRetentionPeriod: 90,
        dataExportFormat: 'csv',
        autoBackup: true,
        backupFrequency: 'weekly',
        dataResolution: 'hourly',
        
        // Account settings
        email: 'admin@weatherdashboard.com',
        name: 'Admin User',
        role: 'Administrator',
        twoFactorAuth: true,
        sessionTimeout: 30,
        apiAccessEnabled: true,
      });
      
      setSaveStatus({
        saved: true,
        message: 'Settings reset to defaults!',
      });
      
      // Clear the message after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }
  };

  return (
    <Box>
      <Header title="SETTINGS" subtitle="Customize your dashboard experience" />

      <Paper
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: colors.blueAccent[500],
              },
            }}
          >
            <Tab 
              icon={<PersonIcon />} 
              label="General" 
              {...a11yProps(0)} 
              sx={{ 
                minHeight: 64,
                '&.Mui-selected': {
                  color: colors.blueAccent[500],
                },
              }}
            />
            <Tab 
              icon={<NotificationsIcon />} 
              label="Notifications" 
              {...a11yProps(1)} 
              sx={{ 
                minHeight: 64,
                '&.Mui-selected': {
                  color: colors.blueAccent[500],
                },
              }}
            />
            <Tab 
              icon={<PaletteIcon />} 
              label="Display" 
              {...a11yProps(2)} 
              sx={{ 
                minHeight: 64,
                '&.Mui-selected': {
                  color: colors.blueAccent[500],
                },
              }}
            />
            <Tab 
              icon={<MapIcon />} 
              label="Map" 
              {...a11yProps(3)} 
              sx={{ 
                minHeight: 64,
                '&.Mui-selected': {
                  color: colors.blueAccent[500],
                },
              }}
            />
            <Tab 
              icon={<DataUsageIcon />} 
              label="Data" 
              {...a11yProps(4)} 
              sx={{ 
                minHeight: 64,
                '&.Mui-selected': {
                  color: colors.blueAccent[500],
                },
              }}
            />
            <Tab 
              icon={<SecurityIcon />} 
              label="Account" 
              {...a11yProps(5)} 
              sx={{ 
                minHeight: 64,
                '&.Mui-selected': {
                  color: colors.blueAccent[500],
                },
              }}
            />
          </Tabs>
        </Box>

        {/* General Settings */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Regional Settings
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select
                        value={settings.language}
                        label="Language"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('language', e.target.value)}
                      >
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="french">French</MenuItem>
                        <MenuItem value="german">German</MenuItem>
                        <MenuItem value="spanish">Spanish</MenuItem>
                        <MenuItem value="chinese">Chinese</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth>
                      <InputLabel>Time Format</InputLabel>
                      <Select
                        value={settings.timeFormat}
                        label="Time Format"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('timeFormat', e.target.value)}
                      >
                        <MenuItem value="12h">12-hour (AM/PM)</MenuItem>
                        <MenuItem value="24h">24-hour</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth>
                      <InputLabel>Date Format</InputLabel>
                      <Select
                        value={settings.dateFormat}
                        label="Date Format"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('dateFormat', e.target.value)}
                      >
                        <MenuItem value="dd/mm/yyyy">DD/MM/YYYY</MenuItem>
                        <MenuItem value="mm/dd/yyyy">MM/DD/YYYY</MenuItem>
                        <MenuItem value="yyyy-mm-dd">YYYY-MM-DD</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Measurement Units
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <FormControl fullWidth>
                      <InputLabel>Temperature Unit</InputLabel>
                      <Select
                        value={settings.temperatureUnit}
                        label="Temperature Unit"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('temperatureUnit', e.target.value)}
                      >
                        <MenuItem value="celsius">Celsius (°C)</MenuItem>
                        <MenuItem value="fahrenheit">Fahrenheit (°F)</MenuItem>
                        <MenuItem value="kelvin">Kelvin (K)</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth>
                      <InputLabel>Wind Speed Unit</InputLabel>
                      <Select
                        value={settings.windSpeedUnit}
                        label="Wind Speed Unit"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('windSpeedUnit', e.target.value)}
                      >
                        <MenuItem value="kmh">Kilometers per hour (km/h)</MenuItem>
                        <MenuItem value="mph">Miles per hour (mph)</MenuItem>
                        <MenuItem value="ms">Meters per second (m/s)</MenuItem>
                        <MenuItem value="knots">Knots</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth>
                      <InputLabel>Default Location</InputLabel>
                      <Select
                        value={settings.defaultLocation}
                        label="Default Location"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('defaultLocation', e.target.value)}
                      >
                        <MenuItem value="London">London</MenuItem>
                        <MenuItem value="Manchester">Manchester</MenuItem>
                        <MenuItem value="Birmingham">Birmingham</MenuItem>
                        <MenuItem value="Edinburgh">Edinburgh</MenuItem>
                        <MenuItem value="Glasgow">Glasgow</MenuItem>
                        <MenuItem value="Cardiff">Cardiff</MenuItem>
                        <MenuItem value="Belfast">Belfast</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Dashboard Preferences
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>Start Page</InputLabel>
                    <Select
                      value={settings.startPage}
                      label="Start Page"
                      onChange={(e: SelectChangeEvent) => handleSettingChange('startPage', e.target.value)}
                    >
                      <MenuItem value="dashboard">Dashboard</MenuItem>
                      <MenuItem value="sensor-data">Sensor Data</MenuItem>
                      <MenuItem value="disaster-forecast">Disaster Forecast</MenuItem>
                      <MenuItem value="ai-forecast">AI Forecast</MenuItem>
                      <MenuItem value="reports">Reports</MenuItem>
                      <MenuItem value="user-management">User Management</MenuItem>
                    </Select>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Notification Settings */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Notification Channels
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.emailNotifications}
                          onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Email Notifications"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.pushNotifications}
                          onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Push Notifications"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.smsNotifications}
                          onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="SMS Notifications"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.notificationSound}
                          onChange={(e) => handleSettingChange('notificationSound', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Notification Sound"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Alert Settings
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <FormControl fullWidth>
                      <InputLabel>Alert Threshold</InputLabel>
                      <Select
                        value={settings.alertThreshold}
                        label="Alert Threshold"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('alertThreshold', e.target.value)}
                      >
                        <MenuItem value="low">Low (All Alerts)</MenuItem>
                        <MenuItem value="medium">Medium (Important Alerts)</MenuItem>
                        <MenuItem value="high">High (Critical Alerts Only)</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.dailyDigest}
                          onChange={(e) => handleSettingChange('dailyDigest', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Daily Digest Email"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.weeklyReport}
                          onChange={(e) => handleSettingChange('weeklyReport', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Weekly Summary Report"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Display Settings */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Appearance
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.darkMode}
                          onChange={(e) => handleSettingChange('darkMode', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Dark Mode"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.highContrast}
                          onChange={(e) => handleSettingChange('highContrast', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="High Contrast Mode"
                    />
                    
                    <FormControl fullWidth sx={{ mt: 2 }}>
                      <InputLabel>Font Size</InputLabel>
                      <Select
                        value={settings.fontSize}
                        label="Font Size"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('fontSize', e.target.value)}
                      >
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.animationsEnabled}
                          onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Enable Animations"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.compactView}
                          onChange={(e) => handleSettingChange('compactView', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Compact View"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Chart & Data Display
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Box>
                      <Typography gutterBottom>Data Refresh Rate (minutes)</Typography>
                      <Slider
                        value={settings.dataRefreshRate}
                        min={1}
                        max={60}
                        step={1}
                        marks={[
                          { value: 1, label: '1m' },
                          { value: 15, label: '15m' },
                          { value: 30, label: '30m' },
                          { value: 60, label: '60m' },
                        ]}
                        valueLabelDisplay="auto"
                        onChange={(_e, value) => handleSettingChange('dataRefreshRate', value)}
                      />
                    </Box>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showGridLines}
                          onChange={(e) => handleSettingChange('showGridLines', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Show Grid Lines on Charts"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Map Settings */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Map Display
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <FormControl fullWidth>
                      <InputLabel>Map Type</InputLabel>
                      <Select
                        value={settings.mapType}
                        label="Map Type"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('mapType', e.target.value)}
                      >
                        <MenuItem value="standard">Standard</MenuItem>
                        <MenuItem value="satellite">Satellite</MenuItem>
                        <MenuItem value="terrain">Terrain</MenuItem>
                        <MenuItem value="hybrid">Hybrid</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Box>
                      <Typography gutterBottom>Default Zoom Level</Typography>
                      <Slider
                        value={settings.mapZoomLevel}
                        min={1}
                        max={20}
                        step={1}
                        marks={[
                          { value: 1, label: '1' },
                          { value: 10, label: '10' },
                          { value: 20, label: '20' },
                        ]}
                        valueLabelDisplay="auto"
                        onChange={(_e, value) => handleSettingChange('mapZoomLevel', value)}
                      />
                    </Box>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showLegend}
                          onChange={(e) => handleSettingChange('showLegend', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Show Map Legend"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.showLabels}
                          onChange={(e) => handleSettingChange('showLabels', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Show Location Labels"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Map Layers
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.mapLayers.includes('temperature')}
                          onChange={(e) => {
                            const newLayers = e.target.checked
                              ? [...settings.mapLayers, 'temperature']
                              : settings.mapLayers.filter(layer => layer !== 'temperature');
                            handleSettingChange('mapLayers', newLayers);
                          }}
                          color="primary"
                        />
                      }
                      label="Temperature Layer"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.mapLayers.includes('precipitation')}
                          onChange={(e) => {
                            const newLayers = e.target.checked
                              ? [...settings.mapLayers, 'precipitation']
                              : settings.mapLayers.filter(layer => layer !== 'precipitation');
                            handleSettingChange('mapLayers', newLayers);
                          }}
                          color="primary"
                        />
                      }
                      label="Precipitation Layer"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.mapLayers.includes('wind')}
                          onChange={(e) => {
                            const newLayers = e.target.checked
                              ? [...settings.mapLayers, 'wind']
                              : settings.mapLayers.filter(layer => layer !== 'wind');
                            handleSettingChange('mapLayers', newLayers);
                          }}
                          color="primary"
                        />
                      }
                      label="Wind Layer"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.mapLayers.includes('pressure')}
                          onChange={(e) => {
                            const newLayers = e.target.checked
                              ? [...settings.mapLayers, 'pressure']
                              : settings.mapLayers.filter(layer => layer !== 'pressure');
                            handleSettingChange('mapLayers', newLayers);
                          }}
                          color="primary"
                        />
                      }
                      label="Pressure Layer"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.mapLayers.includes('clouds')}
                          onChange={(e) => {
                            const newLayers = e.target.checked
                              ? [...settings.mapLayers, 'clouds']
                              : settings.mapLayers.filter(layer => layer !== 'clouds');
                            handleSettingChange('mapLayers', newLayers);
                          }}
                          color="primary"
                        />
                      }
                      label="Cloud Cover Layer"
                    />
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.mapLayers.includes('alerts')}
                          onChange={(e) => {
                            const newLayers = e.target.checked
                              ? [...settings.mapLayers, 'alerts']
                              : settings.mapLayers.filter(layer => layer !== 'alerts');
                            handleSettingChange('mapLayers', newLayers);
                          }}
                          color="primary"
                        />
                      }
                      label="Weather Alerts Layer"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Data Settings */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Data Management
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <Box>
                      <Typography gutterBottom>Data Retention Period (days)</Typography>
                      <Slider
                        value={settings.dataRetentionPeriod}
                        min={7}
                        max={365}
                        step={1}
                        marks={[
                          { value: 7, label: '7d' },
                          { value: 30, label: '30d' },
                          { value: 90, label: '90d' },
                          { value: 365, label: '365d' },
                        ]}
                        valueLabelDisplay="auto"
                        onChange={(_e, value) => handleSettingChange('dataRetentionPeriod', value)}
                      />
                    </Box>
                    
                    <FormControl fullWidth>
                      <InputLabel>Data Export Format</InputLabel>
                      <Select
                        value={settings.dataExportFormat}
                        label="Data Export Format"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('dataExportFormat', e.target.value)}
                      >
                        <MenuItem value="csv">CSV</MenuItem>
                        <MenuItem value="excel">Excel</MenuItem>
                        <MenuItem value="json">JSON</MenuItem>
                        <MenuItem value="pdf">PDF</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth>
                      <InputLabel>Data Resolution</InputLabel>
                      <Select
                        value={settings.dataResolution}
                        label="Data Resolution"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('dataResolution', e.target.value)}
                      >
                        <MenuItem value="minute">Minute</MenuItem>
                        <MenuItem value="hourly">Hourly</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Backup & Recovery
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.autoBackup}
                          onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Automatic Backup"
                    />
                    
                    <FormControl fullWidth>
                      <InputLabel>Backup Frequency</InputLabel>
                      <Select
                        value={settings.backupFrequency}
                        label="Backup Frequency"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('backupFrequency', e.target.value)}
                        disabled={!settings.autoBackup}
                      >
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Create Manual Backup
                    </Button>
                    
                    <Button
                      variant="outlined"
                      color="secondary"
                    >
                      Restore from Backup
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Account Settings */}
        <TabPanel value={tabValue} index={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Profile Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                      label="Name"
                      fullWidth
                      value={settings.name}
                      onChange={(e) => handleSettingChange('name', e.target.value)}
                    />
                    
                    <TextField
                      label="Email"
                      fullWidth
                      value={settings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                    />
                    
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={settings.role}
                        label="Role"
                        onChange={(e: SelectChangeEvent) => handleSettingChange('role', e.target.value)}
                        disabled
                      >
                        <MenuItem value="Administrator">Administrator</MenuItem>
                        <MenuItem value="Analyst">Analyst</MenuItem>
                        <MenuItem value="Viewer">Viewer</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ mt: 2 }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" mb={2}>
                    Security & Access
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Box display="flex" flexDirection="column" gap={3}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Two-Factor Authentication"
                    />
                    
                    <Box>
                      <Typography gutterBottom>Session Timeout (minutes)</Typography>
                      <Slider
                        value={settings.sessionTimeout}
                        min={5}
                        max={120}
                        step={5}
                        marks={[
                          { value: 5, label: '5m' },
                          { value: 30, label: '30m' },
                          { value: 60, label: '60m' },
                          { value: 120, label: '120m' },
                        ]}
                        valueLabelDisplay="auto"
                        onChange={(_e, value) => handleSettingChange('sessionTimeout', value)}
                      />
                    </Box>
                    
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.apiAccessEnabled}
                          onChange={(e) => handleSettingChange('apiAccessEnabled', e.target.checked)}
                          color="primary"
                        />
                      }
                      label="Enable API Access"
                    />
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      disabled={!settings.apiAccessEnabled}
                      sx={{ mt: 2 }}
                    >
                      Manage API Keys
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Save/Reset Buttons */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${colors.grey[800]}`,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<RefreshIcon />}
            onClick={handleResetSettings}
          >
            Reset to Defaults
          </Button>
          
          <Box display="flex" alignItems="center" gap={2}>
            {saveStatus && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: saveStatus.saved ? colors.greenAccent[500] : colors.redAccent[500],
                }}
              >
                {saveStatus.saved && <CheckIcon sx={{ mr: 0.5 }} />}
                <Typography>{saveStatus.message}</Typography>
              </Box>
            )}
            
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
              sx={{
                backgroundColor: colors.greenAccent[600],
                '&:hover': {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
            >
              Save Settings
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;