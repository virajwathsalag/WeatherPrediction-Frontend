import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { tokens } from '../theme';
import Header from '../components/Header';

// Mock data for users
const initialRows = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-10 14:30:45',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Moderator',
    status: 'Active',
    lastLogin: '2023-05-09 09:15:22',
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-04-28 16:45:10',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-05-08 11:20:33',
  },
  {
    id: 5,
    name: 'Michael Wilson',
    email: 'michael.wilson@example.com',
    role: 'Moderator',
    status: 'Active',
    lastLogin: '2023-05-10 08:05:17',
  },
  {
    id: 6,
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2023-05-07 13:40:55',
  },
  {
    id: 7,
    name: 'David Miller',
    email: 'david.miller@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-04-15 10:30:42',
  },
  {
    id: 8,
    name: 'Jennifer Taylor',
    email: 'jennifer.taylor@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-05-09 15:55:21',
  },
];

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
};

const UserManagement = () => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  const [rows, setRows] = useState<User[]>(initialRows);
  const [searchText, setSearchText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    email: '',
    role: 'User',
    status: 'Active',
  });

  const handleSearch = () => {
    if (!searchText) {
      setRows(initialRows);
      return;
    }

    const filteredRows = initialRows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) ||
        row.email.toLowerCase().includes(searchText.toLowerCase()) ||
        row.role.toLowerCase().includes(searchText.toLowerCase())
    );
    setRows(filteredRows);
  };

  const handleAddUser = () => {
    setEditUser(null);
    setNewUser({
      name: '',
      email: '',
      role: 'User',
      status: 'Active',
    });
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setNewUser({ ...user });
    setOpenDialog(true);
  };

  const handleDeleteUser = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveUser = () => {
    if (editUser) {
      // Update existing user
      setRows(
        rows.map((row) =>
          row.id === editUser.id ? { ...row, ...newUser, id: editUser.id } as User : row
        )
      );
    } else {
      // Add new user
      const id = Math.max(...rows.map((row) => row.id)) + 1;
      const currentDate = new Date().toISOString().replace('T', ' ').substring(0, 19);
      setRows([
        ...rows,
        { ...newUser, id, lastLogin: currentDate } as User,
      ]);
    }
    setOpenDialog(false);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box
            width="80%"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              params.value === 'Active'
                ? colors.greenAccent[600]
                : colors.redAccent[600]
            }
            borderRadius="4px"
          >
            {params.value}
          </Box>
        );
      },
    },
    { field: 'lastLogin', headerName: 'Last Login', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Box display="flex" justifyContent="center" gap={1}>
            <IconButton
              onClick={() => handleEditUser(params.row as User)}
              sx={{ color: colors.blueAccent[500] }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDeleteUser(params.row.id)}
              sx={{ color: colors.redAccent[500] }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Header title="USER MANAGEMENT" subtitle="Managing the Admin Panel Users" />

      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box display="flex" width="50%">
          <TextField
            label="Search users"
            variant="outlined"
            size="small"
            fullWidth
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              backgroundColor: colors.blueAccent[700],
              '&:hover': {
                backgroundColor: colors.blueAccent[800],
              },
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddUser}
          sx={{
            backgroundColor: colors.greenAccent[600],
            '&:hover': {
              backgroundColor: colors.greenAccent[700],
            },
          }}
        >
          Add User
        </Button>
      </Box>

      <Box
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${colors.grey[800]}`,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={rows} columns={columns} checkboxSelection />
      </Box>

      {/* Add/Edit User Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editUser ? 'Edit User' : 'Add New User'}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              label="Name"
              fullWidth
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <TextField
              label="Role"
              select
              fullWidth
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
              <option value="User">User</option>
            </TextField>
            <TextField
              label="Status"
              select
              fullWidth
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
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

export default UserManagement;