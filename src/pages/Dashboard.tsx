import { Box, Button, Grid, IconButton, Typography, useTheme } from '@mui/material';
import {
  CloudOutlined,
  WarningAmberOutlined,
  NotificationsActiveOutlined,
  DeviceThermostatOutlined,
  DownloadOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
} from '@mui/icons-material';
import { tokens } from '../theme';
import Header from '../components/Header';
import StatBox from '../components/StatBox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const weatherData = [
  { name: 'Jan', temperature: 4, humidity: 65, rainfall: 20 },
  { name: 'Feb', temperature: 6, humidity: 60, rainfall: 25 },
  { name: 'Mar', temperature: 10, humidity: 55, rainfall: 30 },
  { name: 'Apr', temperature: 15, humidity: 50, rainfall: 35 },
  { name: 'May', temperature: 20, humidity: 45, rainfall: 25 },
  { name: 'Jun', temperature: 25, humidity: 40, rainfall: 15 },
  { name: 'Jul', temperature: 30, humidity: 35, rainfall: 10 },
  { name: 'Aug', temperature: 28, humidity: 40, rainfall: 15 },
  { name: 'Sep', temperature: 23, humidity: 45, rainfall: 20 },
  { name: 'Oct', temperature: 18, humidity: 50, rainfall: 25 },
  { name: 'Nov', temperature: 12, humidity: 55, rainfall: 30 },
  { name: 'Dec', temperature: 6, humidity: 60, rainfall: 20 },
];

const recentAlerts = [
  { id: 1, type: 'Flood Warning', location: 'River Thames, London', severity: 'High', time: '2 hours ago' },
  { id: 2, type: 'Heavy Rain', location: 'Manchester City Center', severity: 'Medium', time: '5 hours ago' },
  { id: 3, type: 'Strong Winds', location: 'Coastal Areas, Brighton', severity: 'Medium', time: '8 hours ago' },
  { id: 4, type: 'Heat Wave', location: 'Southern Counties', severity: 'High', time: '1 day ago' },
];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your Weather Admin Dashboard" />
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: colors.blueAccent[800],
            },
          }}
          startIcon={<DownloadOutlined />}
        >
          Download Reports
        </Button>
      </Box>

      {/* GRID & CHARTS */}
      <Grid container spacing={3}>
        {/* ROW 1 - STAT BOXES */}
        <Grid item xs={12} sm={6} md={3}>
          <StatBox
            title="12°C"
            subtitle="Current Temperature"
            progress={0.66}
            increase="+2°C"
            icon={
              <DeviceThermostatOutlined
                sx={{ color: colors.grey[100], fontSize: '26px' }}
              />
            }
            color={colors.greenAccent[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatBox
            title="15"
            subtitle="Active Alerts"
            progress={0.5}
            increase="+3"
            icon={
              <WarningAmberOutlined
                sx={{ color: colors.grey[100], fontSize: '26px' }}
              />
            }
            color={colors.redAccent[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatBox
            title="32"
            subtitle="Notifications Sent"
            progress={0.75}
            increase="+12"
            icon={
              <NotificationsActiveOutlined
                sx={{ color: colors.grey[100], fontSize: '26px' }}
              />
            }
            color={colors.blueAccent[500]}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatBox
            title="89%"
            subtitle="System Uptime"
            progress={0.89}
            increase="+4%"
            icon={
              <CloudOutlined
                sx={{ color: colors.grey[100], fontSize: '26px' }}
              />
            }
            color={colors.orangeAccent[500]}
          />
        </Grid>

        {/* ROW 2 - CHARTS */}
        <Grid item xs={12} md={8}>
          <Box
            backgroundColor={theme.palette.background.paper}
            p={3}
            borderRadius="0.55rem"
            sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
                Weather Trends
              </Typography>
              <IconButton>
                <DownloadOutlined sx={{ fontSize: '26px', color: colors.greenAccent[500] }} />
              </IconButton>
            </Box>
            <Box height="350px">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={weatherData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} />
                  <XAxis dataKey="name" stroke={colors.grey[100]} />
                  <YAxis stroke={colors.grey[100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: colors.primary[400],
                      borderColor: colors.grey[800],
                      color: colors.grey[100]
                    }} 
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke={colors.greenAccent[500]}
                    activeDot={{ r: 8 }}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke={colors.blueAccent[500]}
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="rainfall"
                    stroke={colors.orangeAccent[500]}
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </Grid>

        {/* ROW 2 - RECENT ALERTS */}
        <Grid item xs={12} md={4}>
          <Box
            backgroundColor={theme.palette.background.paper}
            p={3}
            borderRadius="0.55rem"
            sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
            height="100%"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={2}>
              Recent Alerts
            </Typography>
            <Box sx={{ overflowY: 'auto', maxHeight: '350px' }}>
              {recentAlerts.map((alert) => (
                <Box
                  key={alert.id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`1px solid ${colors.grey[800]}`}
                  p={2}
                  sx={{
                    '&:last-child': {
                      borderBottom: 'none',
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      {alert.type}
                    </Typography>
                    <Typography color={colors.grey[400]}>{alert.location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Box
                      backgroundColor={
                        alert.severity === 'High'
                          ? colors.redAccent[500]
                          : alert.severity === 'Medium'
                          ? colors.orangeAccent[500]
                          : colors.greenAccent[500]
                      }
                      p={1}
                      borderRadius="4px"
                      mr={2}
                    >
                      <Typography color={colors.grey[100]} variant="body2">
                        {alert.severity}
                      </Typography>
                    </Box>
                    <Typography color={colors.grey[400]} variant="body2">
                      {alert.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* ROW 3 - WEATHER SUMMARY */}
        <Grid item xs={12}>
          <Box
            backgroundColor={theme.palette.background.paper}
            p={3}
            borderRadius="0.55rem"
            sx={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)' }}
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]} mb={2}>
              Weather Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Box
                  backgroundColor={colors.primary[400]}
                  p={2}
                  borderRadius="0.55rem"
                  display="flex"
                  alignItems="center"
                >
                  <ArrowUpwardOutlined sx={{ color: colors.greenAccent[500], mr: 1 }} />
                  <Typography color={colors.grey[100]}>
                    Temperature expected to rise by 3°C in the next 24 hours
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  backgroundColor={colors.primary[400]}
                  p={2}
                  borderRadius="0.55rem"
                  display="flex"
                  alignItems="center"
                >
                  <ArrowDownwardOutlined sx={{ color: colors.redAccent[500], mr: 1 }} />
                  <Typography color={colors.grey[100]}>
                    Humidity levels decreasing, potential for dry conditions
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box
                  backgroundColor={colors.primary[400]}
                  p={2}
                  borderRadius="0.55rem"
                  display="flex"
                  alignItems="center"
                >
                  <WarningAmberOutlined sx={{ color: colors.orangeAccent[500], mr: 1 }} />
                  <Typography color={colors.grey[100]}>
                    Potential for thunderstorms in the northern regions
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;