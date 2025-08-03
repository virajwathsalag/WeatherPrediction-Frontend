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
  Download as DownloadIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarTodayIcon,
  LocationOn as LocationOnIcon,
  AccessTime as AccessTimeIcon,
  BarChart as BarChartIcon,
  PictureAsPdf as PictureAsPdfIcon,
  InsertDriveFile as InsertDriveFileIcon,
  TableChart as TableChartIcon,
} from '@mui/icons-material';
import { tokens } from '../theme';
import Header from '../components/Header';

// Mock data for reports
const initialReports = [
  {
    id: 1,
    title: 'Monthly Weather Summary - April 2023',
    description: 'Comprehensive analysis of weather patterns and anomalies for April 2023.',
    type: 'Monthly Summary',
    format: 'PDF',
    createdAt: '2023-05-01 09:30:00',
    createdBy: 'John Doe',
    location: 'United Kingdom',
    period: 'April 2023',
    size: '2.4 MB',
    status: 'Published',
  },
  {
    id: 2,
    title: 'Severe Weather Events - Q1 2023',
    description: 'Analysis of severe weather events and their impacts during Q1 2023.',
    type: 'Quarterly Analysis',
    format: 'PDF',
    createdAt: '2023-04-15 14:45:00',
    createdBy: 'Jane Smith',
    location: 'United Kingdom',
    period: 'Q1 2023',
    size: '3.8 MB',
    status: 'Published',
  },
  {
    id: 3,
    title: 'Temperature Anomalies - March 2023',
    description: 'Detailed analysis of temperature deviations from historical averages for March 2023.',
    type: 'Specialized Report',
    format: 'Excel',
    createdAt: '2023-04-10 11:20:00',
    createdBy: 'Robert Johnson',
    location: 'England',
    period: 'March 2023',
    size: '1.7 MB',
    status: 'Published',
  },
  {
    id: 4,
    title: 'Rainfall Distribution - April 2023',
    description: 'Spatial and temporal analysis of rainfall patterns across the region for April 2023.',
    type: 'Monthly Analysis',
    format: 'PDF',
    createdAt: '2023-05-05 10:15:00',
    createdBy: 'Emily Davis',
    location: 'Scotland',
    period: 'April 2023',
    size: '2.1 MB',
    status: 'Published',
  },
  {
    id: 5,
    title: 'Weather Forecast Accuracy - Q1 2023',
    description: 'Evaluation of forecast accuracy and performance metrics for Q1 2023.',
    type: 'Performance Report',
    format: 'Excel',
    createdAt: '2023-04-20 16:30:00',
    createdBy: 'Michael Wilson',
    location: 'United Kingdom',
    period: 'Q1 2023',
    size: '1.9 MB',
    status: 'Draft',
  },
  {
    id: 6,
    title: 'Climate Change Indicators - 2023',
    description: 'Analysis of key climate change indicators and trends observed in 2023.',
    type: 'Annual Report',
    format: 'PDF',
    createdAt: '2023-05-08 13:45:00',
    createdBy: 'Sarah Brown',
    location: 'Global',
    period: '2023',
    size: '4.2 MB',
    status: 'Draft',
  },
];

type Report = {
  id: number;
  title: string;
  description: string;
  type: string;
  format: 'PDF' | 'Excel' | 'CSV';
  createdAt: string;
  createdBy: string;
  location: string;
  period: string;
  size: string;
  status: 'Published' | 'Draft';
};

const reportTemplates = [
  { id: 1, name: 'Monthly Weather Summary', description: 'Comprehensive monthly weather analysis' },
  { id: 2, name: 'Severe Weather Events', description: 'Analysis of extreme weather events' },
  { id: 3, name: 'Temperature Analysis', description: 'Detailed temperature pattern analysis' },
  { id: 4, name: 'Rainfall Distribution', description: 'Spatial and temporal rainfall analysis' },
  { id: 5, name: 'Forecast Accuracy', description: 'Evaluation of forecast performance' },
  { id: 6, name: 'Climate Indicators', description: 'Analysis of climate change indicators' },
];

const Reports = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [reports, setReports] = useState<Report[]>(initialReports);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [editReport, setEditReport] = useState<Report | null>(null);
  const [newReport, setNewReport] = useState<Partial<Report>>({
    title: '',
    description: '',
    type: '',
    format: 'PDF',
    location: '',
    period: '',
    status: 'Draft',
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const filteredReports = () => {
    switch (tabValue) {
      case 0: // All
        return reports;
      case 1: // Published
        return reports.filter((report) => report.status === 'Published');
      case 2: // Drafts
        return reports.filter((report) => report.status === 'Draft');
      default:
        return reports;
    }
  };

  const handleAddReport = () => {
    setOpenTemplateDialog(true);
  };

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId);
    const template = reportTemplates.find((t) => t.id === templateId);
    if (template) {
      setNewReport({
        title: template.name,
        description: template.description,
        type: template.name.includes('Monthly') ? 'Monthly Summary' : 
              template.name.includes('Severe') ? 'Specialized Report' : 
              template.name.includes('Temperature') ? 'Specialized Report' : 
              template.name.includes('Rainfall') ? 'Monthly Analysis' : 
              template.name.includes('Forecast') ? 'Performance Report' : 
              'Annual Report',
        format: 'PDF',
        location: 'United Kingdom',
        period: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }),
        status: 'Draft',
      });
    }
  };

  const handleTemplateDialogClose = () => {
    setOpenTemplateDialog(false);
    if (selectedTemplate) {
      setOpenDialog(true);
    }
    setSelectedTemplate(null);
  };

  const handleEditReport = (report: Report) => {
    setEditReport(report);
    setNewReport({ ...report });
    setOpenDialog(true);
  };

  const handleDeleteReport = (id: number) => {
    setReports(reports.filter((report) => report.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditReport(null);
  };

  const handleSaveReport = () => {
    if (editReport) {
      // Update existing report
      setReports(
        reports.map((report) =>
          report.id === editReport.id
            ? { ...report, ...newReport, id: editReport.id } as Report
            : report
        )
      );
    } else {
      // Add new report
      const id = Math.max(...reports.map((report) => report.id)) + 1;
      const now = new Date().toISOString().replace('T', ' ').substring(0, 19);
      setReports([
        ...reports,
        {
          ...newReport,
          id,
          createdAt: now,
          createdBy: 'Current User',
          size: '0.0 MB',
        } as Report,
      ]);
    }
    setOpenDialog(false);
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'PDF':
        return <PictureAsPdfIcon sx={{ color: colors.redAccent[500] }} />;
      case 'Excel':
        return <TableChartIcon sx={{ color: colors.greenAccent[500] }} />;
      case 'CSV':
        return <InsertDriveFileIcon sx={{ color: colors.blueAccent[500] }} />;
      default:
        return <DescriptionIcon sx={{ color: colors.grey[500] }} />;
    }
  };

  return (
    <Box>
      <Header title="REPORTS" subtitle="Generate and manage weather reports" />

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
          <Tab label="All Reports" />
          <Tab label="Published" />
          <Tab label="Drafts" />
        </Tabs>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddReport}
          sx={{
            backgroundColor: colors.greenAccent[600],
            '&:hover': {
              backgroundColor: colors.greenAccent[700],
            },
          }}
        >
          Generate Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredReports().map((report) => (
          <Grid item xs={12} md={6} key={report.id}>
            <Paper
              sx={{
                p: 3,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                borderLeft: `5px solid ${
                  report.format === 'PDF'
                    ? colors.redAccent[500]
                    : report.format === 'Excel'
                    ? colors.greenAccent[500]
                    : colors.blueAccent[500]
                }`,
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
                  sx={{ color: colors.greenAccent[500] }}
                >
                  <DownloadIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleEditReport(report)}
                  sx={{ color: colors.blueAccent[500] }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => handleDeleteReport(report.id)}
                  sx={{ color: colors.redAccent[500] }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>

              <Box display="flex" alignItems="center" mb={2}>
                {getFormatIcon(report.format)}
                <Typography variant="h5" fontWeight="bold" ml={1}>
                  {report.title}
                </Typography>
              </Box>

              <Typography variant="body1" paragraph>
                {report.description}
              </Typography>

              <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
                <Chip
                  label={report.type}
                  size="small"
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: '#fff',
                  }}
                />
                <Chip
                  label={report.format}
                  size="small"
                  sx={{
                    backgroundColor:
                      report.format === 'PDF'
                        ? colors.redAccent[700]
                        : report.format === 'Excel'
                        ? colors.greenAccent[700]
                        : colors.blueAccent[700],
                    color: '#fff',
                  }}
                />
                <Chip
                  label={report.status}
                  size="small"
                  sx={{
                    backgroundColor:
                      report.status === 'Published' ? colors.greenAccent[700] : colors.grey[700],
                    color: '#fff',
                  }}
                />
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <CalendarTodayIcon
                      fontSize="small"
                      sx={{ color: colors.grey[400], mr: 1 }}
                    />
                    <Typography variant="body2" color={colors.grey[400]}>
                      Period: {report.period}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <LocationOnIcon
                      fontSize="small"
                      sx={{ color: colors.grey[400], mr: 1 }}
                    />
                    <Typography variant="body2" color={colors.grey[400]}>
                      Location: {report.location}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <AccessTimeIcon
                      fontSize="small"
                      sx={{ color: colors.grey[400], mr: 1 }}
                    />
                    <Typography variant="body2" color={colors.grey[400]}>
                      Created: {report.createdAt}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" alignItems="center">
                    <BarChartIcon
                      fontSize="small"
                      sx={{ color: colors.grey[400], mr: 1 }}
                    />
                    <Typography variant="body2" color={colors.grey[400]}>
                      Size: {report.size}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PrintIcon />}
                  sx={{
                    borderColor: colors.grey[500],
                    color: colors.grey[100],
                    mr: 1,
                    '&:hover': {
                      borderColor: colors.grey[400],
                      backgroundColor: colors.grey[900],
                    },
                  }}
                >
                  Print
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<ShareIcon />}
                  sx={{
                    borderColor: colors.blueAccent[500],
                    color: colors.blueAccent[500],
                    '&:hover': {
                      borderColor: colors.blueAccent[400],
                      backgroundColor: colors.blueAccent[900],
                    },
                  }}
                >
                  Share
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Template Selection Dialog */}
      <Dialog open={openTemplateDialog} onClose={handleTemplateDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Select Report Template</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {reportTemplates.map((template) => (
              <Grid item xs={12} sm={6} key={template.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedTemplate === template.id ? `2px solid ${colors.greenAccent[500]}` : 'none',
                    '&:hover': {
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                    },
                  }}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={1}>
                      <DescriptionIcon sx={{ color: colors.blueAccent[500], mr: 1 }} />
                      <Typography variant="h6">{template.name}</Typography>
                    </Box>
                    <Typography variant="body2" color={colors.grey[400]}>
                      {template.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleTemplateDialogClose}
            color="primary"
            variant="contained"
            disabled={!selectedTemplate}
            sx={{
              backgroundColor: colors.greenAccent[600],
              '&:hover': {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add/Edit Report Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editReport ? 'Edit Report' : 'Generate New Report'}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Report Title"
              fullWidth
              value={newReport.title}
              onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              value={newReport.description}
              onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Report Type"
                  fullWidth
                  value={newReport.type}
                  onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Format</InputLabel>
                  <Select
                    value={newReport.format}
                    label="Format"
                    onChange={(e: SelectChangeEvent) =>
                      setNewReport({
                        ...newReport,
                        format: e.target.value as 'PDF' | 'Excel' | 'CSV',
                      })
                    }
                  >
                    <MenuItem value="PDF">PDF</MenuItem>
                    <MenuItem value="Excel">Excel</MenuItem>
                    <MenuItem value="CSV">CSV</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Location"
                  fullWidth
                  value={newReport.location}
                  onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Period"
                  fullWidth
                  value={newReport.period}
                  onChange={(e) => setNewReport({ ...newReport, period: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={newReport.status}
                    label="Status"
                    onChange={(e: SelectChangeEvent) =>
                      setNewReport({
                        ...newReport,
                        status: e.target.value as 'Published' | 'Draft',
                      })
                    }
                  >
                    <MenuItem value="Published">Published</MenuItem>
                    <MenuItem value="Draft">Draft</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveReport}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: colors.greenAccent[600],
              '&:hover': {
                backgroundColor: colors.greenAccent[700],
              },
            }}
          >
            {editReport ? 'Save Changes' : 'Generate Report'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Reports;