import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Cloud as CloudIcon,
  WbSunny as SunnyIcon,
  Opacity as OpacityIcon,
  Air as WindIcon,
  Thermostat as ThermostatIcon,
  LocationOn as LocationIcon,
  CalendarMonth as CalendarIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon,
  Send as SendIcon,
  Psychology as PsychologyIcon,
  BarChart as BarChartIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';
import { tokens } from '../theme';
import Header from '../components/Header';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Mock data for AI predictions
const mockPredictions = [
  {
    id: 1,
    location: 'London',
    date: '2023-05-15',
    temperature: 18,
    humidity: 65,
    windSpeed: 12,
    precipitation: 30,
    condition: 'Partly Cloudy',
    confidence: 92,
    timestamp: '2023-05-10 14:30:00',
  },
  {
    id: 2,
    location: 'Manchester',
    date: '2023-05-15',
    temperature: 16,
    humidity: 70,
    windSpeed: 15,
    precipitation: 40,
    condition: 'Light Rain',
    confidence: 88,
    timestamp: '2023-05-10 15:45:00',
  },
  {
    id: 3,
    location: 'Edinburgh',
    date: '2023-05-15',
    temperature: 14,
    humidity: 75,
    windSpeed: 18,
    precipitation: 60,
    condition: 'Rain',
    confidence: 90,
    timestamp: '2023-05-10 16:20:00',
  },
  {
    id: 4,
    location: 'Cardiff',
    date: '2023-05-15',
    temperature: 17,
    humidity: 68,
    windSpeed: 10,
    precipitation: 20,
    condition: 'Mostly Sunny',
    confidence: 94,
    timestamp: '2023-05-10 17:10:00',
  },
  {
    id: 5,
    location: 'Belfast',
    date: '2023-05-15',
    temperature: 15,
    humidity: 72,
    windSpeed: 14,
    precipitation: 50,
    condition: 'Cloudy',
    confidence: 91,
    timestamp: '2023-05-10 18:05:00',
  },
];

// Mock data for forecast trends
const forecastTrendData = [
  {
    day: 'Mon',
    temperature: 18,
    humidity: 65,
    precipitation: 30,
  },
  {
    day: 'Tue',
    temperature: 20,
    humidity: 60,
    precipitation: 20,
  },
  {
    day: 'Wed',
    temperature: 22,
    humidity: 55,
    precipitation: 10,
  },
  {
    day: 'Thu',
    temperature: 19,
    humidity: 70,
    precipitation: 40,
  },
  {
    day: 'Fri',
    temperature: 17,
    humidity: 75,
    precipitation: 60,
  },
  {
    day: 'Sat',
    temperature: 16,
    humidity: 80,
    precipitation: 70,
  },
  {
    day: 'Sun',
    temperature: 18,
    humidity: 70,
    precipitation: 50,
  },
];

// Mock data for accuracy comparison
const accuracyComparisonData = [
  {
    month: 'Jan',
    ai: 92,
    traditional: 85,
  },
  {
    month: 'Feb',
    ai: 94,
    traditional: 86,
  },
  {
    month: 'Mar',
    ai: 91,
    traditional: 84,
  },
  {
    month: 'Apr',
    ai: 93,
    traditional: 87,
  },
  {
    month: 'May',
    ai: 95,
    traditional: 88,
  },
];

type Prediction = {
  id: number;
  location: string;
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
  confidence: number;
  timestamp: string;
};

const AIForecast = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [predictions, setPredictions] = useState<Prediction[]>(mockPredictions);
  const [selectedLocation, setSelectedLocation] = useState('London');
  const [selectedDate, setSelectedDate] = useState('2023-05-15');
  const [isGenerating, setIsGenerating] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [queryResponse, setQueryResponse] = useState('');

  const locations = ['London', 'Manchester', 'Edinburgh', 'Cardiff', 'Belfast', 'Birmingham', 'Glasgow', 'Liverpool'];
  const dates = [
    '2023-05-15',
    '2023-05-16',
    '2023-05-17',
    '2023-05-18',
    '2023-05-19',
    '2023-05-20',
    '2023-05-21',
  ];

  const handleLocationChange = (event: SelectChangeEvent) => {
    setSelectedLocation(event.target.value);
  };

  const handleDateChange = (event: SelectChangeEvent) => {
    setSelectedDate(event.target.value);
  };

  const handleGenerateForecast = () => {
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      // In a real application, this would be an API call to an AI service
      const newPrediction = {
        id: predictions.length + 1,
        location: selectedLocation,
        date: selectedDate,
        temperature: Math.floor(Math.random() * 10) + 15, // Random temp between 15-25
        humidity: Math.floor(Math.random() * 30) + 50, // Random humidity between 50-80
        windSpeed: Math.floor(Math.random() * 15) + 5, // Random wind speed between 5-20
        precipitation: Math.floor(Math.random() * 70) + 10, // Random precipitation between 10-80
        condition: ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Rain', 'Heavy Rain', 'Thunderstorm'][Math.floor(Math.random() * 7)],
        confidence: Math.floor(Math.random() * 10) + 85, // Random confidence between 85-95
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      };
      setPredictions([newPrediction, ...predictions]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleSubmitQuery = () => {
    if (!customQuery.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call delay
    setTimeout(() => {
      // In a real application, this would be an API call to an AI service
      const responses = [
        `Based on my analysis, ${selectedLocation} will likely experience ${customQuery.includes('rain') ? 'light rainfall' : 'clear conditions'} on ${selectedDate}. The temperature will range between 15-18°C with humidity around 65%.`,
        `My prediction for ${selectedLocation} on ${selectedDate} indicates ${customQuery.includes('temperature') ? 'temperatures between 16-20°C' : 'moderate weather conditions'} with a ${customQuery.includes('wind') ? 'wind speed of 12-15 km/h' : 'precipitation probability of 30%'}.`,
        `After analyzing recent patterns, I forecast ${customQuery.includes('weekend') ? 'weekend weather to be mostly sunny with occasional clouds' : 'conditions to be favorable for outdoor activities'} in ${selectedLocation}. Confidence level: 90%.`,
      ];
      setQueryResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsGenerating(false);
    }, 2000);
  };

  const getSelectedPrediction = () => {
    return predictions.find(p => p.location === selectedLocation && p.date === selectedDate) || predictions[0];
  };

  const getWeatherIcon = (condition: string) => {
    if (condition.includes('Sunny') || condition.includes('Clear')) {
      return <SunnyIcon sx={{ fontSize: 40, color: colors.orangeAccent[500] }} />;
    } else if (condition.includes('Cloud')) {
      return <CloudIcon sx={{ fontSize: 40, color: colors.grey[400] }} />;
    } else if (condition.includes('Rain') || condition.includes('Drizzle')) {
      return <OpacityIcon sx={{ fontSize: 40, color: colors.blueAccent[400] }} />;
    } else {
      return <CloudIcon sx={{ fontSize: 40, color: colors.grey[400] }} />;
    }
  };

  return (
    <Box>
      <Header title="AI WEATHER FORECAST" subtitle="Advanced weather predictions powered by AI" />

      <Grid container spacing={3}>
        {/* Forecast Generator */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
              height: '100%',
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Generate New Forecast
            </Typography>
            <Divider sx={{ mb: 3 }} />

            <Box display="flex" flexDirection="column" gap={2}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <Select
                  value={selectedLocation}
                  label="Location"
                  onChange={handleLocationChange}
                >
                  {locations.map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Date</InputLabel>
                <Select
                  value={selectedDate}
                  label="Date"
                  onChange={handleDateChange}
                >
                  {dates.map((date) => (
                    <MenuItem key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
                onClick={handleGenerateForecast}
                disabled={isGenerating}
                sx={{
                  mt: 2,
                  backgroundColor: colors.greenAccent[600],
                  '&:hover': {
                    backgroundColor: colors.greenAccent[700],
                  },
                }}
              >
                {isGenerating ? 'Generating...' : 'Generate Forecast'}
              </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" fontWeight="bold" mb={2}>
              Ask AI Assistant
            </Typography>

            <TextField
              fullWidth
              label="Ask about weather conditions"
              placeholder="E.g., Will it rain in London this weekend?"
              multiline
              rows={3}
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              sx={{ mb: 2 }}
            />

            <Button
              variant="contained"
              fullWidth
              startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              onClick={handleSubmitQuery}
              disabled={isGenerating || !customQuery.trim()}
              sx={{
                backgroundColor: colors.blueAccent[600],
                '&:hover': {
                  backgroundColor: colors.blueAccent[700],
                },
              }}
            >
              {isGenerating ? 'Processing...' : 'Submit Query'}
            </Button>

            {queryResponse && (
              <Card sx={{ mt: 2, backgroundColor: colors.primary[400] }}>
                <CardContent>
                  <Box display="flex" alignItems="flex-start">
                    <PsychologyIcon sx={{ mr: 1, color: colors.blueAccent[400] }} />
                    <Typography variant="body1">{queryResponse}</Typography>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Paper>
        </Grid>

        {/* Current Prediction Display */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3,
              backgroundColor: theme.palette.background.paper,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" fontWeight="bold">
                AI Weather Prediction
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: colors.greenAccent[700],
                  color: '#fff',
                  px: 2,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                <Typography variant="body2" fontWeight="bold">
                  Confidence: {getSelectedPrediction().confidence}%
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2}>
                    {getWeatherIcon(getSelectedPrediction().condition)}
                    <Box ml={2}>
                      <Typography variant="h4" fontWeight="bold">
                        {getSelectedPrediction().temperature}°C
                      </Typography>
                      <Typography variant="h6">
                        {getSelectedPrediction().condition}
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 2,
                      mt: 2,
                    }}
                  >
                    <Box display="flex" alignItems="center">
                      <LocationIcon sx={{ color: colors.grey[400], mr: 1 }} />
                      <Typography>
                        Location: <strong>{getSelectedPrediction().location}</strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <CalendarIcon sx={{ color: colors.grey[400], mr: 1 }} />
                      <Typography>
                        Date:{' '}
                        <strong>
                          {new Date(getSelectedPrediction().date).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </strong>
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <TimeIcon sx={{ color: colors.grey[400], mr: 1 }} />
                      <Typography>
                        Prediction made:{' '}
                        <strong>{getSelectedPrediction().timestamp}</strong>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        backgroundColor: colors.primary[400],
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100%"
                        >
                          <ThermostatIcon
                            sx={{ fontSize: 40, color: colors.redAccent[500], mb: 1 }}
                          />
                          <Typography variant="h5" fontWeight="bold">
                            {getSelectedPrediction().temperature}°C
                          </Typography>
                          <Typography variant="body2" color={colors.grey[400]}>
                            Temperature
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        backgroundColor: colors.primary[400],
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100%"
                        >
                          <OpacityIcon
                            sx={{ fontSize: 40, color: colors.blueAccent[500], mb: 1 }}
                          />
                          <Typography variant="h5" fontWeight="bold">
                            {getSelectedPrediction().humidity}%
                          </Typography>
                          <Typography variant="body2" color={colors.grey[400]}>
                            Humidity
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        backgroundColor: colors.primary[400],
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100%"
                        >
                          <WindIcon
                            sx={{ fontSize: 40, color: colors.greenAccent[500], mb: 1 }}
                          />
                          <Typography variant="h5" fontWeight="bold">
                            {getSelectedPrediction().windSpeed} km/h
                          </Typography>
                          <Typography variant="body2" color={colors.grey[400]}>
                            Wind Speed
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        backgroundColor: colors.primary[400],
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          justifyContent="center"
                          height="100%"
                        >
                          <OpacityIcon
                            sx={{ fontSize: 40, color: colors.blueAccent[300], mb: 1 }}
                          />
                          <Typography variant="h5" fontWeight="bold">
                            {getSelectedPrediction().precipitation}%
                          </Typography>
                          <Typography variant="body2" color={colors.grey[400]}>
                            Precipitation
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>

          {/* Charts */}
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <TimelineIcon sx={{ color: colors.greenAccent[500], mr: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    7-Day Forecast Trend
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={forecastTrendData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} />
                    <XAxis dataKey="day" stroke={colors.grey[400]} />
                    <YAxis stroke={colors.grey[400]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.primary[400],
                        borderColor: colors.grey[800],
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke={colors.redAccent[500]}
                      activeDot={{ r: 8 }}
                      name="Temperature (°C)"
                    />
                    <Line
                      type="monotone"
                      dataKey="humidity"
                      stroke={colors.blueAccent[500]}
                      name="Humidity (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <Box display="flex" alignItems="center" mb={2}>
                  <BarChartIcon sx={{ color: colors.blueAccent[500], mr: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    AI vs Traditional Forecast Accuracy
                  </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={accuracyComparisonData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grey[800]} />
                    <XAxis dataKey="month" stroke={colors.grey[400]} />
                    <YAxis stroke={colors.grey[400]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: colors.primary[400],
                        borderColor: colors.grey[800],
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="ai"
                      stroke={colors.greenAccent[500]}
                      fill={colors.greenAccent[800]}
                      name="AI Forecast Accuracy (%)"
                    />
                    <Area
                      type="monotone"
                      dataKey="traditional"
                      stroke={colors.blueAccent[500]}
                      fill={colors.blueAccent[800]}
                      name="Traditional Forecast Accuracy (%)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIForecast;