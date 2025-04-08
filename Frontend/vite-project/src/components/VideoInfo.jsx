import { Button, Typography } from '@mui/material';

const VideoInfo = ({ info, platform, handleDownload, loading }) => (
  <div className="p-6 rounded-xl space-y-4 text-center">
    <Typography variant="h5">{info.title}</Typography>
    <img src={info.thumbnail} alt="Thumbnail" className="rounded-lg w-full h-[400px]" />
    <Typography>Platform: {platform}</Typography>
    <Typography>
      Duration: {Math.floor(info.duration / 60)}:{('0' + (info.duration % 60)).slice(-2)}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? 'Downloading...' : `Download ${platform} Video`}
    </Button>
  </div>
);

export default VideoInfo;
