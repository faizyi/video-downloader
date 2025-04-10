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
      maxWidth: '52rem',
      mx: 'auto',
      mt: 12,
      p: 4,
      bgcolor: 'background.paper',
      borderRadius: 4,
      boxShadow: 3,
    }}>
      <Typography variant="h4" sx={{
        textAlign: 'center',
        mb: 4,
        fontWeight: 600
      }}>
        Video Downloader
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
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
            }
          }}
        />
        <Button
          variant="contained"
          disabled={!videoUrl || loading}
          onClick={handleGetInfo}
          sx={{ borderRadius: 2, px: 3 }}
        >
          {loading ? 'Loading...' : 'Get'}
        </Button>
      </Box>

      {isFetchingInfo && (
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {message && (
        <Typography sx={{
          color: error ? 'error.main' : 'primary.main',
          textAlign: 'center',
          mb: 2
        }}>
          {message}
        </Typography>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
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
