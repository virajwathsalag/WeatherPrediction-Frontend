import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';

type StatBoxProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  progress?: number;
  increase?: string;
  color?: string;
};

const StatBox = ({
  title,
  subtitle,
  icon,
  progress = 0.75,
  increase = '+14%',
  color = '#4cceac',
}: StatBoxProps) => {
  const theme = useTheme();
  const colors = tokens[theme.palette.mode === 'dark' ? 'dark' : 'light'];

  return (
    <Box
      gridColumn="span 3"
      backgroundColor={theme.palette.background.paper}
      borderRadius="0.55rem"
      p={2}
      sx={{
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography variant="h5" sx={{ color: color }}>
            {subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: color,
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box mt="2px">
        <Typography variant="h5" sx={{ color: color }}>
          {increase}
        </Typography>
      </Box>
      <Box mt={1} position="relative" height="8px" borderRadius="4px" backgroundColor={colors.grey[800]}>
        <Box
          position="absolute"
          height="100%"
          borderRadius="4px"
          backgroundColor={color}
          sx={{ width: `${progress * 100}%` }}
        />
      </Box>
    </Box>
  );
};

export default StatBox;