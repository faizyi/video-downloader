import { LinearProgress, Typography } from '@mui/material';

const ProgressBar = ({ progress }) => (
  <div className="w-full my-4">
    <Typography variant="body2" color="textSecondary">
      Download Progress: {progress}%
    </Typography>
    <LinearProgress variant="determinate" value={progress} />
  </div>
);

export default ProgressBar;
