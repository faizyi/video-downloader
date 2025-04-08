import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import VideoInfo from './VideoInfo'
import ProgressBar from './ProgressBar'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import { useDownloadVideo } from '../hooks/useDownloadVideo'

export const Downloader = () => {
      const {
        videoUrl,
        setVideoUrl,
        message,
        platform,
        handleDownload,
        info,
        fetchVideoInfo,
        loading,
        error,
        progress
      } = useDownloadVideo();
  return (
    <Box className="w-full mt-39 max-w-2xl p-6 rounded-xl space-y-6">
    <Typography variant="h5" className="text-center font-medium">
      Paste a video URL to get started
    </Typography>

    <div className="flex flex-col sm:flex-row items-center gap-4">
      <TextField
        label="Video URL"
        variant="outlined"
        fullWidth
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={fetchVideoInfo}
        disabled={loading || !videoUrl}
      >
        {loading ? 'Loading...' : 'Get Info'}
      </Button>
    </div>

    {message && (
      <Typography color={error ? 'error' : 'primary'}>{message}</Typography>
    )}

    {error && <ErrorMessage message={error} />}
    {loading && <Loader />}
    {progress > 0 && <ProgressBar progress={progress} />}
    {info && (
      <VideoInfo
        info={info}
        platform={platform}
        handleDownload={handleDownload}
        loading={loading}
      />
    )}
  </Box>
  )
}
