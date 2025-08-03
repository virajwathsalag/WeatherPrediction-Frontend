import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Warning as WarningIcon,
  Notifications as NotificationsIcon,
  LocationOn as LocationIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { tokens } from '../theme';
import Header from '../components/Header';

// Mock data for disaster warnings
const initialWarnings = [
  {
    id: 1,
    type: 'Flood',
    severity: 'High',
    location: 'River Thames, London',
    description: 'Potential flooding due to heavy rainfall and high tide. Residents in low-lying areas should prepare for evacuation.',
    startDate: '2023-05-15',
    endDate: '2023-05-18',
    status: 'Active',
  },
  {
    id: 2,
    type: 'Storm',
    severity: 'Medium',
    location: 'Northern Scotland',
    description: 'Strong winds and heavy rain expected. Potential for power outages and travel disruption.',
    startDate: '2023-05-16',
    endDate: '2023-05-17',
    status: 'Active',
  },
  {
    id: 3,
    type: 'Heat Wave',
    severity: 'High',
    location: 'Southern England',
    description: 'Extreme temperatures expected. Vulnerable individuals should take precautions to avoid heat-related illness.',
    startDate: '2023-06-01',
    endDate: '2023-06-05',
    status: 'Scheduled',
  },
  {
    id: 4,
    type: 'Thunderstorm',
    severity: 'Medium',
    location: 'Midlands',
    description: 'Severe thunderstorms with potential for lightning strikes and flash flooding.',
    startDate: '2023-05-20',
    endDate: '2023-05-21',
    status: 'Scheduled',
  },
  {
    id: 5,
    type: 'Drought',
    severity: 'Low',
    location: 'East Anglia',
    description: 'Extended period of low rainfall leading to water shortages. Water conservation measures recommended.',
    startDate: '2023-05-01',
    endDate: '2023-06-30',
    status: 'Active',
  },
  {
    id: 6,
    type: 'Fog',
    severity: 'Medium',
    location: 'Coastal Areas',
    description: 'Dense fog expected to cause travel disruption, particularly on roads and at airports.',
    startDate: '2023-05-12',
    endDate: '2023-05-13',
    status: 'Expired',
  },
];

type DisasterWarning = {
  id: number;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  location: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Scheduled' | 'Expired';
};

const DisasterForecast = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [warnings, setWarnings] = useState<DisasterWarning[]>(initialWarnings);
  const [filter, setFilter] = useState('All');
  const [openDialog, setOpenDialog] = useState(false);
  const [editWarning, setEditWarning] = useState<DisasterWarning | null>(null);
  const [newWarning, setNewWarning] = useState<Partial<DisasterWarning>>({
    type: '',
    severity: 'Medium',
    location: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'Scheduled',
  });

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const filteredWarnings = filter === 'All' 
    ? warnings 
    : warnings.filter(warning => warning.status === filter);

  const handleAddWarning = () => {
    setEditWarning(null);
    setNewWarning({
      type: '',
      severity: 'Medium',
      location: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      status: 'Scheduled',
    });
    setOpenDialog(true);
  };

  const handleEditWarning = (warning: DisasterWarning) => {
    setEditWarning(warning);
    setNewWarning({ ...warning });
    setOpenDialog(true);
  };

  const handleDeleteWarning = (id: number) => {
    setWarnings(warnings.filter((warning) => warning.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveWarning = () => {
    if (editWarning) {
      // Update existing warning
      setWarnings(
        warnings.map((warning) =>
          warning.id === editWarning.id ? { ...warning, ...newWarning, id: editWarning.id } as DisasterWarning : warning
        )
      );
    } else {
      // Add new warning
      const id = Math.max(...warnings.map((warning) => warning.id)) + 1;
      setWarnings([
        ...warnings,
        { ...newWarning, id } as DisasterWarning,
      ]);
    }
    setOpenDialog(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return colors.redAccent[500];
      case 'Medium':
        return colors.orangeAccent[500];
      case 'Low':
        return colors.greenAccent[500];
      default:
        return colors.grey[500];
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return colors.redAccent[500];
      case 'Scheduled':
        return colors.blueAccent[500];
      case 'Expired':
        return colors.grey[500];
      default:
        return colors.grey[500];
    }
  };

  return (
    <Box>
      <Header title="DISASTER FORECAST" subtitle="Manage and monitor potential disaster warnings" />

      <Box display="flex" justifyContent="space-between" mb={3}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={filter}
            label="Filter by Status"
            onChange={handleFilterChange}
          >
            <MenuItem value="All">All Warnings</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddWarning}
          sx={{
            backgroundColor: colors.greenAccent[600],
            '&:hover': {
              backgroundColor: colors.greenAccent[700],
            },
          }}
        >
          Add Warning
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredWarnings.map((warning) => (
          <Grid item xs={12} md={6} lg={4} key={warning.id}>
            <Card
              sx={{
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                borderLeft: `5px solid ${getSeverityColor(warning.severity)}`,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={() => handleEditWarning(warning)}
                  sx={{ color: colors.blueAccent[500] }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteWarning(warning.id)}
                  sx={{ color: colors.redAccent[500] }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <WarningIcon sx={{ color: getSeverityColor(warning.severity), mr: 1 }} />
                  <Typography variant="h5" fontWeight="bold">
                    {warning.type}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'inline-block',
                    backgroundColor: getStatusColor(warning.status),
                    color: '#fff',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.5,
                    mb: 2,
                    fontSize: '0.8rem',
                  }}
                >
                  {warning.status}
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationIcon sx={{ color: colors.grey[400], mr: 1, fontSize: '0.9rem' }} />
                  <Typography variant="body2" color={colors.grey[400]}>
                    {warning.location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <AccessTimeIcon sx={{ color: colors.grey[400], mr: 1, fontSize: '0.9rem' }} />
                  <Typography variant="body2" color={colors.grey[400]}>
                    {warning.startDate} to {warning.endDate}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {warning.description}
                </Typography>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<NotificationsIcon />}
                    sx={{
                      borderColor: colors.blueAccent[500],
                      color: colors.blueAccent[500],
                      '&:hover': {
                        backgroundColor: colors.blueAccent[900],
                        borderColor: colors.blueAccent[500],
                      },
                    }}
                  >
                    Send Alert
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Warning Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editWarning ? 'Edit Warning' : 'Add New Warning'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Warning Type"
                  fullWidth
                  value={newWarning.type}
                  onChange={(e) => setNewWarning({ ...newWarning, type: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Severity</InputLabel>
                  <Select
                    value={newWarning.severity}
                    label="Severity"
                    onChange={(e) => setNewWarning({ ...newWarning, severity: e.target.value as 'Low' | 'Medium' | 'High' })}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  fullWidth
                  value={newWarning.location}
                  onChange={(e) => setNewWarning({ ...newWarning, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={newWarning.startDate}
                  onChange={(e) => setNewWarning({ ...newWarning, startDate: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={newWarning.endDate}
                  onChange={(e) => setNewWarning({ ...newWarning, endDate: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newWarning.status}
                    label="Status"
                    onChange={(e) => setNewWarning({ ...newWarning, status: e.target.value as 'Active' | 'Scheduled' | 'Expired' })}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Expired">Expired</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  value={newWarning.description}
                  onChange={(e) => setNewWarning({ ...newWarning, description: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveWarning}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              '&:hover': {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DisasterForecast;