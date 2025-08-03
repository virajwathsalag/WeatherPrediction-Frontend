import { Typography, Box, useTheme } from '@mui/material';
import { tokens } from '../theme';

type HeaderProps = {
  title: string;
  subtitle: string;
};

const Header = ({ title, subtitle }: HeaderProps) => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  return (
    <Box mb={4}>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={colors.greenAccent[400]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;