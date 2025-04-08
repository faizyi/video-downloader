import { Paper, Typography, Box } from '@mui/material';

export const Description = () => {
  return (
    <Paper elevation={2} className="w-full max-w-4xl p-6 bg-white space-y-4">
      <Typography variant="h4" className="text-center font-bold mb-4">
        Supported Platforms
      </Typography>

      <Box className="flex flex-col gap-4">
        <Box className="flex items-start gap-3">
          {/* <Facebook color="primary" fontSize="large" /> */}
          <div>
            <Typography variant="h6">Facebook</Typography>
            <Typography variant="body2">
              Download videos from Facebook pages, profiles, and public groups with ease.
            </Typography>
          </div>
        </Box>

        <Box className="flex items-start gap-3">
          {/* <Instagram color="secondary" fontSize="large" /> */}
          <div>
            <Typography variant="h6">Instagram</Typography>
            <Typography variant="body2">
              Save Reels, Stories, and feed videos from Instagram in one click.
            </Typography>
          </div>
        </Box>

        <Box className="flex items-start gap-3">
          {/* <LinkedIn color="action" fontSize="large" /> */}
          <div>
            <Typography variant="h6">LinkedIn</Typography>
            <Typography variant="body2">
              Download professional videos from LinkedIn posts or company updates.
            </Typography>
          </div>
        </Box>
      </Box>
    </Paper>
  )
}
