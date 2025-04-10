import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDownloadVideo } from '../hooks/useDownloadVideo';
import { VideoInfoDialog } from './VideoInfo';
import { Description } from './Description';

export const Downloader = () => {
  const {
    videoUrl,
    setVideoUrl,
    message,
    platform,
    handleDownload,
    info,
    handleGetInfo,
    isFetchingInfo,
    openModal,
    setOpenModal,
    loading,
    error,
    isDownloading
  } = useDownloadVideo();

  const handleClose = () => setOpenModal(false);

  return (
    <Box sx={{
      width: '100%',
      maxWidth: '30rem', // Smaller width
      mx: 'auto',
      mt: 5,
      p: 3, // Less padding
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 2, // Softer shadow
    }}>
      <Typography variant="h5" sx={{
        textAlign: 'center',
        mb: 3,
        fontWeight: 500, // Reduced boldness
        fontSize: '1.5rem' // Smaller title font size
      }}>
        Video Downloader
      </Typography>

      <Typography variant="body2" sx={{
        textAlign: 'center',
        mb: 3,
        color: 'text.secondary',
        fontSize: '0.875rem', // Smaller text size
      }}>
        Download videos from popular platforms like Facebook and Instagram.
      </Typography>

      {/* Supported Platforms List */}
      <Description/>

      <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
        <TextField
          label="Enter Video URL"
          variant="outlined"
          fullWidth
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'grey.50'
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.875rem', // Smaller label font size
            },
            '& .MuiInputBase-root': {
              fontSize: '0.875rem', // Smaller input font size
            }
          }}
        />
        <Button
          variant="contained"
          disabled={!videoUrl || loading}
          onClick={handleGetInfo}
          sx={{ borderRadius: 2, px: 2, fontSize: '0.875rem' }} // Smaller button size
        >
          {loading ? 'Loading...' : 'Get'}
        </Button>
      </Box>

      {isFetchingInfo && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <CircularProgress size={20} /> {/* Smaller CircularProgress size */}
        </Box>
      )}

      {message && (
        <Typography sx={{
          color: error ? 'error.main' : 'primary.main',
          textAlign: 'center',
          mb: 2,
          fontSize: '0.875rem' // Smaller message font size
        }}>
          {message}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2, fontSize: '0.875rem' }}>{error}</Alert> 
      )}

      {/* Dialog component */}
      <VideoInfoDialog
        open={openModal}
        onClose={handleClose}
        info={info}
        onDownload={handleDownload}
        isDownloading={isDownloading}
      />
    </Box>
  );
};
