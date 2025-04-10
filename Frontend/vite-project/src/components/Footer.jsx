import { Box, Typography } from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
    <Box sx={{
        mt: 'auto',
        // bgcolor: 'background.default',
        py: 2,
        textAlign: 'center',
        // borderTop: '1px solid',
        borderColor: 'divider',
      }}>
        <Typography sx={{
          fontSize: '0.75rem',
          color: 'text.secondary'
        }}>
          &copy; 2025 Video Downloader. All rights reserved.
        </Typography>
      </Box>
  )
}
