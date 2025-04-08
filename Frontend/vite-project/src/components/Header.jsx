import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export const Header = () => {
  return (
    <AppBar position="static" className="bg-blue-700">
        <Toolbar>
          <Typography variant="h6" className="text-white font-semibold">
            🎥 Video Downloader
          </Typography>
        </Toolbar>
      </AppBar>
  )
}
