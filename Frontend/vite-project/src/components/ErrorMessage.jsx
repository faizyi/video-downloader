import { Alert } from '@mui/material';

const ErrorMessage = ({ message }) => (
  <Alert severity="error" className="mt-4">
    {message}
  </Alert>
);

export default ErrorMessage;
