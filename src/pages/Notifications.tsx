import { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Send as SendIcon,
  Schedule as ScheduleIcon,
  History as HistoryIcon,
  NotificationsActive as NotificationsActiveIcon,
  Public as PublicIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { tokens } from '../theme';
import Header from '../components/Header';

// Mock data for notifications
const initialNotifications = [
  {
    id: 1,
    title: 'Severe Weather Alert',
    message: 'Heavy rainfall expected in the next 24 hours. Potential for flooding in low-lying areas.',
    type: 'Alert',
    audience: 'Public',
    status: 'Sent',
    sentAt: '2023-05-10 08:30:00',
    scheduledFor: null,
  },
  {
    id: 2,
    title: 'System Maintenance',
    message: 'The weather monitoring system will be undergoing maintenance from 2 AM to 4 AM tomorrow.',
    type: 'Information',
    audience: 'Internal',
    status: 'Scheduled',
    sentAt: null,
    scheduledFor: '2023-05-15 20:00:00',
  },
  {
    id: 3,
    title: 'Heat Wave Warning',
    message: 'Extreme temperatures expected over the next week. Please take necessary precautions.',
    type: 'Warning',
    audience: 'Public',
    status: 'Draft',
    sentAt: null,
    scheduledFor: null,
  },
  {
    id: 4,
    title: 'Sensor Network Update',
    message: 'New sensors have been deployed in the northern region to improve weather monitoring capabilities.',
    type: 'Information',
    audience: 'Internal',
    status: 'Sent',
    sentAt: '2023-05-08 14:15:00',
    scheduledFor: null,
  },
  {
    id: 5,
    title: 'Thunderstorm Alert',
    message: 'Thunderstorms with lightning expected in the eastern regions tonight. Stay indoors if possible.',
    type: 'Alert',
    audience: 'Public',
    status: 'Sent',
    sentAt: '2023-05-09 16:45:00',
    scheduledFor: null,
  },
  {
    id: 6,
    title: 'Monthly Report Available',
    message: 'The monthly weather report for April is now available in the reports section.',
    type: 'Information',
    audience: 'Subscribers',
    status: 'Scheduled',
    sentAt: null,
    scheduledFor: '2023-05-12 09:00:00',
  },
];

type Notification = {
  id: number;
  title: string;
  message: string;
  type: 'Alert' | 'Warning' | 'Information';
  audience: 'Public' | 'Internal' | 'Subscribers';
  status: 'Draft' | 'Scheduled' | 'Sent';
  sentAt: string | null;
  scheduledFor: string | null;
};

const Notifications = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [editNotification, setEditNotification] = useState<Notification | null>(null);
  const [newNotification, setNewNotification] = useState<Partial<Notification>>({
    title: '',
    message: '',
    type: 'Information',
    audience: 'Public',
    status: 'Draft',
    sentAt: null,
    scheduledFor: null,
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredNotifications = () => {
    switch (tabValue) {
      case 0: // All
        return notifications;
      case 1: // Drafts
        return notifications.filter((notification) => notification.status === 'Draft');
      case 2: // Scheduled
        return notifications.filter((notification) => notification.status === 'Scheduled');
      case 3: // Sent
        return notifications.filter((notification) => notification.status === 'Sent');
      default:
        return notifications;
    }
  };

  const handleAddNotification = () => {
    setEditNotification(null);
    setNewNotification({
      title: '',
      message: '',
      type: 'Information',
      audience: 'Public',
      status: 'Draft',
      sentAt: null,
      scheduledFor: null,
    });
    setOpenDialog(true);
  };

  const handleEditNotification = (notification: Notification) => {
    setEditNotification(notification);
    setNewNotification({ ...notification });
    setOpenDialog(true);
  };

  const handleDeleteNotification = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveNotification = () => {
    if (editNotification) {
      // Update existing notification
      setNotifications(
        notifications.map((notification) =>
          notification.id === editNotification.id
            ? { ...notification, ...newNotification, id: editNotification.id } as Notification
            : notification
        )
      );
    } else {
      // Add new notification
      const id = Math.max(...notifications.map((notification) => notification.id)) + 1;
      setNotifications([
        ...notifications,
        { ...newNotification, id } as Notification,
      ]);
    }
    setOpenDialog(false);
  };

  const handleSendNow = (notification: Notification) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setNotifications(
      notifications.map((n) =>
        n.id === notification.id
          ? { ...n, status: 'Sent', sentAt: now, scheduledFor: null } as Notification
          : n
      )
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Alert':
        return colors.redAccent[500];
      case 'Warning':
        return colors.orangeAccent[500];
      case 'Information':
        return colors.blueAccent[500];
      default:
        return colors.grey[500];
    }
  };

  const getAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'Public':
        return <PublicIcon fontSize="small" />;
      case 'Internal':
        return <GroupIcon fontSize="small" />;
      case 'Subscribers':
        return <PersonIcon fontSize="small" />;
      default:
        return <PublicIcon fontSize="small" />;
    }
  };

  return (
    <Box>
      <Header title="NOTIFICATIONS" subtitle="Create and manage notifications" />

      <Box display="flex" justifyContent="space-between" mb={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: colors.blueAccent[500],
            },
          }}
        >
          <Tab label="All" icon={<NotificationsActiveIcon />} iconPosition="start" />
          <Tab label="Drafts" icon={<EditIcon />} iconPosition="start" />
          <Tab label="Scheduled" icon={<ScheduleIcon />} iconPosition="start" />
          <Tab label="Sent" icon={<HistoryIcon />} iconPosition="start" />
        </Tabs>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNotification}
          sx={{
            backgroundColor: colors.greenAccent[600],
            '&:hover': {
              backgroundColor: colors.greenAccent[700],
            },
          }}
        >
          Create Notification
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredNotifications().map((notification) => (
          <Grid item xs={12} md={6} key={notification.id}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                borderLeft: `5px solid ${getTypeColor(notification.type)}`,
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
                {notification.status !== 'Sent' && (
                  <IconButton
                    size="small"
                    onClick={() => handleSendNow(notification)}
                    sx={{ color: colors.greenAccent[500] }}
                  >
                    <SendIcon fontSize="small" />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  onClick={() => handleEditNotification(notification)}
                  sx={{ color: colors.blueAccent[500] }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteNotification(notification.id)}
                  sx={{ color: colors.redAccent[500] }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mb={1}>
                <Chip
                  label={notification.type}
                  size="small"
                  sx={{
                    backgroundColor: getTypeColor(notification.type),
                    color: '#fff',
                    mr: 1,
                  }}
                />
                <Chip
                  icon={getAudienceIcon(notification.audience)}
                  label={notification.audience}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: colors.grey[500],
                    color: colors.grey[100],
                  }}
                />
                <Box flexGrow={1} />
                <Chip
                  label={notification.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      notification.status === 'Sent'
                        ? colors.greenAccent[700]
                        : notification.status === 'Scheduled'
                        ? colors.blueAccent[700]
                        : colors.grey[700],
                    color: '#fff',
                  }}
                />
              </Box>

              <Typography variant="h5" fontWeight="bold" mb={1}>
                {notification.title}
              </Typography>

              <Typography variant="body1" paragraph>
                {notification.message}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                {notification.status === 'Sent' ? (
                  <Typography variant="body2" color={colors.grey[400]}>
                    Sent: {notification.sentAt}
                  </Typography>
                ) : notification.status === 'Scheduled' ? (
                  <Typography variant="body2" color={colors.grey[400]}>
                    Scheduled for: {notification.scheduledFor}
                  </Typography>
                ) : (
                  <Typography variant="body2" color={colors.grey[400]}>
                    Draft
                  </Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Notification Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editNotification ? 'Edit Notification' : 'Create New Notification'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Title"
              fullWidth
              value={newNotification.title}
              onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              fullWidth
              value={newNotification.message}
              onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={newNotification.type}
                    label="Type"
                    onChange={(e: SelectChangeEvent) =>
                      setNewNotification({
                        ...newNotification,
                        type: e.target.value as 'Alert' | 'Warning' | 'Information',
                      })
                    }
                  >
                    <MenuItem value="Alert">Alert</MenuItem>
                    <MenuItem value="Warning">Warning</MenuItem>
                    <MenuItem value="Information">Information</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Audience</InputLabel>
                  <Select
                    value={newNotification.audience}
                    label="Audience"
                    onChange={(e: SelectChangeEvent) =>
                      setNewNotification({
                        ...newNotification,
                        audience: e.target.value as 'Public' | 'Internal' | 'Subscribers',
                      })
                    }
                  >
                    <MenuItem value="Public">Public</MenuItem>
                    <MenuItem value="Internal">Internal</MenuItem>
                    <MenuItem value="Subscribers">Subscribers</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newNotification.status}
                    label="Status"
                    onChange={(e: SelectChangeEvent) => {
                      const status = e.target.value as 'Draft' | 'Scheduled' | 'Sent';
                      let updatedNotification = { ...newNotification, status };
                      
                      // Reset scheduling if status is not 'Scheduled'
                      if (status !== 'Scheduled') {
                        updatedNotification.scheduledFor = null;
                      }
                      
                      // Set sent time if status is 'Sent'
                      if (status === 'Sent') {
                        updatedNotification.sentAt = new Date().toISOString().replace('T', ' ').substring(0, 19);
                      }
                      
                      setNewNotification(updatedNotification);
                    }}
                  >
                    <MenuItem value="Draft">Draft</MenuItem>
                    <MenuItem value="Scheduled">Scheduled</MenuItem>
                    <MenuItem value="Sent">Sent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            {newNotification.status === 'Scheduled' && (
              <TextField
                label="Schedule For"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newNotification.scheduledFor ? newNotification.scheduledFor.replace(' ', 'T') : ''}
                onChange={(e) =>
                  setNewNotification({
                    ...newNotification,
                    scheduledFor: e.target.value.replace('T', ' '),
                  })
                }
              />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveNotification}
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

export default Notifications;