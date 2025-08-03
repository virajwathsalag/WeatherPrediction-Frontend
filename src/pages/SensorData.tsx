import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  DownloadOutlined,
  RefreshOutlined,
  SettingsOutlined,
  DeviceThermostatOutlined,
  OpacityOutlined,
  AirOutlined,
  CompareArrowsOutlined,
  WarningAmberOutlined,
} from '@mui/icons-material';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { tokens } from '../theme';
import Header from '../components/Header';

// Mock data for sensor readings
const temperatureData = [
  { time: '00:00', value: 12 },
  { time: '02:00', value: 11 },
  { time: '04:00', value: 10 },
  { time: '06:00', value: 11 },
  { time: '08:00', value: 13 },
  { time: '10:00', value: 15 },
  { time: '12:00', value: 17 },
  { time: '14:00', value: 18 },
  { time: '16:00', value: 17 },
  { time: '18:00', value: 16 },
  { time: '20:00', value: 14 },
  { time: '22:00', value: 13 },
];

const humidityData = [
  { time: '00:00', value: 65 },
  { time: '02:00', value: 67 },
  { time: '04:00', value: 70 },
  { time: '06:00', value: 72 },
  { time: '08:00', value: 68 },
  { time: '10:00', value: 65 },
  { time: '12:00', value: 60 },
  { time: '14:00', value: 55 },
  { time: '16:00', value: 58 },
  { time: '18:00', value: 62 },
  { time: '20:00', value: 64 },
  { time: '22:00', value: 66 },
];

const windSpeedData = [
  { time: '00:00', value: 5 },
  { time: '02:00', value: 6 },
  { time: '04:00', value: 8 },
  { time: '06:00', value: 7 },
  { time: '08:00', value: 9 },
  { time: '10:00', value: 12 },
  { time: '12:00', value: 14 },
  { time: '14:00', value: 15 },
  { time: '16:00', value: 13 },
  { time: '18:00', value: 10 },
  { time: '20:00', value: 8 },
  { time: '22:00', value: 6 },
];

const pressureData = [
  { time: '00:00', value: 1012 },
  { time: '02:00', value: 1011 },
  { time: '04:00', value: 1010 },
  { time: '06:00', value: 1009 },
  { time: '08:00', value: 1010 },
  { time: '10:00', value: 1011 },
  { time: '12:00', value: 1012 },
  { time: '14:00', value: 1013 },
  { time: '16:00', value: 1014 },
  { time: '18:00', value: 1013 },
  { time: '20:00', value: 1012 },
  { time: '22:00', value: 1011 },
];

const sensorLocations = [
  { id: 1, name: 'London City Center', status: 'Online', lastUpdate: '2023-05-10 14:30:45' },
  { id: 2, name: 'Manchester Airport', status: 'Online', lastUpdate: '2023-05-10 14:28:12' },
  { id: 3, name: 'Birmingham Station', status: 'Offline', lastUpdate: '2023-05-09 23:15:33' },
  { id: 4, name: 'Glasgow Harbor', status: 'Online', lastUpdate: '2023-05-10 14:25:50' },
  { id: 5, name: 'Cardiff Bay', status: 'Warning', lastUpdate: '2023-05-10 13:45:22' },
  { id: 6, name: 'Edinburgh Castle', status: 'Online', lastUpdate: '2023-05-10 14:29:01' },
];

const sensorStatusData = [
  { name: 'Online', value: 4 },
  { name: 'Offline', value: 1 },
  { name: 'Warning', value: 1 },
];

const SensorData = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedSensor, setSelectedSensor] = useState('all');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  const handleSensorChange = (event: SelectChangeEvent) => {
    setSelectedSensor(event.target.value);
  };

  const getDataForTab = () => {
    switch (tabValue) {
      case 0: // Temperature
        return temperatureData;
      case 1: // Humidity
        return humidityData;
      case 2: // Wind Speed
        return windSpeedData;
      case 3: // Pressure
        return pressureData;
      default:
        return temperatureData;
    }
  };

  const getUnitForTab = () => {
    switch (tabValue) {
      case 0: // Temperature
        return '°C';
      case 1: // Humidity
        return '%';
      case 2: // Wind Speed
        return 'km/h';
      case 3: // Pressure
        return 'hPa';
      default:
        return '';
    }
  };

  const getIconForTab = () => {
    switch (tabValue) {
      case 0: // Temperature
        return <DeviceThermostatOutlined />;
      case 1: // Humidity
        return <OpacityOutlined />;
      case 2: // Wind Speed
        return <AirOutlined />;
      case 3: // Pressure
        return <CompareArrowsOutlined />;
      default:
        return <DeviceThermostatOutlined />;
    }
  };

  const getColorForTab = () => {
    switch (tabValue) {
      case 0: // Temperature
        return colors.redAccent[500];
      case 1: // Humidity
        return colors.blueAccent[500];
      case 2: // Wind Speed
        return colors.greenAccent[500];
      case 3: // Pressure
        return colors.orangeAccent[500];
      default:
        return colors.redAccent[500];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Online':
        return colors.greenAccent[500];
      case 'Offline':
        return colors.redAccent[500];
      case 'Warning':
        return colors.orangeAccent[500];
      default:
        return colors.grey[500];
    }
  };

  const COLORS = [colors.greenAccent[500], colors.redAccent[500], colors.orangeAccent[500]];

  return (
    <Box>
      <Header title="SENSOR DATA" subtitle="Analyze and visualize sensor readings" />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: getColorForTab(),
            },
          }}
        >
          <Tab label="Temperature" icon={<DeviceThermostatOutlined />} iconPosition="start" />
          <Tab label="Humidity" icon={<OpacityOutlined />} iconPosition="start" />
          <Tab label="Wind Speed" icon={<AirOutlined />} iconPosition="start" />
          <Tab label="Pressure" icon={<CompareArrowsOutlined />} iconPosition="start" />
        </Tabs>
        <Box display="flex" gap={2}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={handleTimeRangeChange}
              size="small"
            >
              <MenuItem value="6h">Last 6 Hours</MenuItem>
              <MenuItem value="12h">Last 12 Hours</MenuItem>
              <MenuItem value="24h">Last 24 Hours</MenuItem>
              <MenuItem value="7d">Last 7 Days</MenuItem>
              <MenuItem value="30d">Last 30 Days</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Sensor Location</InputLabel>
            <Select
              value={selectedSensor}
              label="Sensor Location"
              onChange={handleSensorChange}
              size="small"
            >
              <MenuItem value="all">All Sensors</MenuItem>
              {sensorLocations.map((sensor) => (
                <MenuItem key={sensor.id} value={sensor.id.toString()}>
                  {sensor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            startIcon={<RefreshOutlined />}
            sx={{
              borderColor: getColorForTab(),
              color: getColorForTab(),
              '&:hover': {
                borderColor: getColorForTab(),
                backgroundColor: colors.primary[400],
              },
            }}
          >
            Refresh
          </Button>
          <Button
            variant="outlined"
            startIcon={<DownloadOutlined />}
            sx={{
              borderColor: getColorForTab(),
              color: getColorForTab(),
              '&:hover': {
                borderColor: getColorForTab(),
                backgroundColor: colors.primary[400],
              },
            }}
          >
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Main Chart */}
        <Grid item xs={12} lg={8}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                  {tabValue === 0
                    ? 'Temperature Readings'
                    : tabValue === 1
                    ? 'Humidity Readings'
                    : tabValue === 2
                    ? 'Wind Speed Readings'
                    : 'Pressure Readings'}
                </Typography>
                <IconButton>
                  <SettingsOutlined />
                </IconButton>
              </Box>
              <Box height="400px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getDataForTab()}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} />
                    <XAxis dataKey="time" stroke={colors.grey[100]} />
                    <YAxis stroke={colors.grey[100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.primary[400],
                        borderColor: colors.grey[800],
                        color: colors.grey[100],
                      }}
                      formatter={(value) => [`${value} ${getUnitForTab()}`, '']}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={getColorForTab()}
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sensor Status */}
        <Grid item xs={12} lg={4}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Sensor Status
              </Typography>
              <Box height="200px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sensorStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sensorStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.primary[400],
                        borderColor: colors.grey[800],
                        color: colors.grey[100],
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box mt={2}>
                {sensorLocations.map((sensor) => (
                  <Box
                    key={sensor.id}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    p={1}
                    borderBottom={`1px solid ${colors.grey[800]}`}
                  >
                    <Box display="flex" alignItems="center">
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: getStatusColor(sensor.status),
                          mr: 1,
                        }}
                      />
                      <Typography variant="body2">{sensor.name}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      {sensor.status === 'Warning' && (
                        <WarningAmberOutlined
                          fontSize="small"
                          sx={{ color: colors.orangeAccent[500], mr: 1 }}
                        />
                      )}
                      <Typography variant="body2" color={colors.grey[400]} fontSize="0.8rem">
                        {sensor.lastUpdate}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Statistics Cards */}
        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color={colors.grey[100]}>
                  Average
                </Typography>
                <Box
                  sx={{
                    backgroundColor: getColorForTab(),
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {getIconForTab()}
                </Box>
              </Box>
              <Typography variant="h4" fontWeight="bold" mt={2}>
                {tabValue === 0
                  ? '14.2°C'
                  : tabValue === 1
                  ? '64.3%'
                  : tabValue === 2
                  ? '9.4 km/h'
                  : '1011 hPa'}
              </Typography>
              <Typography variant="body2" color={colors.greenAccent[500]} mt={1}>
                +1.2% from yesterday
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color={colors.grey[100]}>
                  Maximum
                </Typography>
                <Box
                  sx={{
                    backgroundColor: getColorForTab(),
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {getIconForTab()}
                </Box>
              </Box>
              <Typography variant="h4" fontWeight="bold" mt={2}>
                {tabValue === 0
                  ? '18.5°C'
                  : tabValue === 1
                  ? '72.0%'
                  : tabValue === 2
                  ? '15.2 km/h'
                  : '1014 hPa'}
              </Typography>
              <Typography variant="body2" color={colors.redAccent[500]} mt={1}>
                At {tabValue === 0 ? '14:00' : tabValue === 1 ? '06:00' : tabValue === 2 ? '14:00' : '16:00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color={colors.grey[100]}>
                  Minimum
                </Typography>
                <Box
                  sx={{
                    backgroundColor: getColorForTab(),
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {getIconForTab()}
                </Box>
              </Box>
              <Typography variant="h4" fontWeight="bold" mt={2}>
                {tabValue === 0
                  ? '10.0°C'
                  : tabValue === 1
                  ? '55.0%'
                  : tabValue === 2
                  ? '5.0 km/h'
                  : '1009 hPa'}
              </Typography>
              <Typography variant="body2" color={colors.blueAccent[500]} mt={1}>
                At {tabValue === 0 ? '04:00' : tabValue === 1 ? '14:00' : tabValue === 2 ? '00:00' : '06:00'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={3}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" color={colors.grey[100]}>
                  Variance
                </Typography>
                <Box
                  sx={{
                    backgroundColor: getColorForTab(),
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {getIconForTab()}
                </Box>
              </Box>
              <Typography variant="h4" fontWeight="bold" mt={2}>
                {tabValue === 0
                  ? '8.5°C'
                  : tabValue === 1
                  ? '17.0%'
                  : tabValue === 2
                  ? '10.2 km/h'
                  : '5 hPa'}
              </Typography>
              <Typography variant="body2" color={colors.orangeAccent[500]} mt={1}>
                Range over 24 hours
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Historical Comparison */}
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight="bold">
                  Historical Comparison
                </Typography>
                <Box display="flex" gap={2}>
                  <TextField
                    label="From Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    defaultValue="2023-05-03"
                  />
                  <TextField
                    label="To Date"
                    type="date"
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    defaultValue="2023-05-10"
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: getColorForTab(),
                      '&:hover': {
                        backgroundColor: getColorForTab(),
                        opacity: 0.8,
                      },
                    }}
                  >
                    Compare
                  </Button>
                </Box>
              </Box>
              <Box height="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { date: 'May 3', current: 14, previous: 12 },
                      { date: 'May 4', current: 15, previous: 13 },
                      { date: 'May 5', current: 16, previous: 15 },
                      { date: 'May 6', current: 14, previous: 14 },
                      { date: 'May 7', current: 13, previous: 12 },
                      { date: 'May 8', current: 15, previous: 13 },
                      { date: 'May 9', current: 16, previous: 14 },
                      { date: 'May 10', current: 14, previous: 13 },
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} />
                    <XAxis dataKey="date" stroke={colors.grey[100]} />
                    <YAxis stroke={colors.grey[100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.primary[400],
                        borderColor: colors.grey[800],
                        color: colors.grey[100],
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="current"
                      name="Current Period"
                      fill={getColorForTab()}
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="previous"
                      name="Previous Period"
                      fill={colors.grey[500]}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SensorData;