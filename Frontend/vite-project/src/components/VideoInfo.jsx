import {
  Box,
  Button,
  Card,
  Dialog,
  DialogContent,
  Typography,
} from '@mui/material';

export const VideoInfoDialog = ({
  open,
  onClose,
  loading,
  info,
  onDownload,
  isDownloading, // Already passed from useDownloadVideo
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent
        sx={{
          p: 0,
          bgcolor: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Card
          elevation={0}
          sx={{
            p: 2, // Reduced padding
            bgcolor: 'background.paper',
            borderRadius: 0,
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          }}
        >
          <Typography
            variant="h6"
            fontWeight={500} // Reduced boldness
            gutterBottom
            sx={{ fontSize: '1.25rem', textAlign: 'center' }} // Smaller title font size
          >
            {info?.title} Video
          </Typography>

          {info ? (
            <>
              {info.thumbnail && (
                <Box
                  component="img"
                  src={info.thumbnail}
                  alt="Video Thumbnail"
                  sx={{
                    width: '100%',
                    height: 200, // Reduced height for the thumbnail
                    objectFit: 'cover',
                    borderRadius: 3,
                    mb: 2,
                  }}
                />
              )}

              <Button
                variant="contained"
                fullWidth
                onClick={onDownload}
                disabled={loading || isDownloading}
                sx={{
                  mt: 1,
                  borderRadius: 2, // Slightly smaller radius
                  py: 1.25,
                  fontWeight: 500, // Reduced font weight
                  fontSize: '0.875rem', // Smaller font size for button text
                  background: 'linear-gradient(135deg, #4B82F1, #6C63FF)',
                  boxShadow: '0 4px 14px rgba(76, 85, 196, 0.4)',
                  transition: '0.3s',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3b70e2, #5a53e6)',
                    boxShadow: '0 6px 18px rgba(76, 85, 196, 0.5)',
                  },
                }}
              >
                {isDownloading ? 'Redirecting...' : 'Download'}
              </Button>
            </>
          ) : (
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', my: 2, fontSize: '0.875rem' }} // Smaller font size
            >
              No info available.
            </Typography>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};
