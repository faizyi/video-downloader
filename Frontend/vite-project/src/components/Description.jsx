import { Paper, Typography, Box } from '@mui/material';

export const Description = () => {
  return (
      <Box sx={{
        mb: 3,
        padding: 2,
        bgcolor: 'background.default',
        borderRadius: 2,
        boxShadow: 1,
      }}>
        <Typography variant="subtitle2" sx={{
          textAlign: 'center',
          mb: 1,
          fontWeight: 500, // Less bold
        }}>
          Supported Platforms:
        </Typography>
        <Typography sx={{
          textAlign: 'center',
          fontSize: '0.875rem', // Smaller font size
          color: 'text.primary',
        }}>
          - Facebook
        </Typography>
        <Typography sx={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'text.primary',
        }}>
          - Instagram
        </Typography>
        {/* <Typography sx={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'text.primary',
        }}>
          - LinkedIn
        </Typography> */}
        {/* <Typography sx={{
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'text.primary',
        }}>
          - TikTok
        </Typography> */}
      </Box>
  )
}
