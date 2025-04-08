import { useState } from 'react';
import axios from 'axios';

export const useDownloadVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const detectPlatform = (url) => {
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    return 'Unknown';
  };

  const fetchVideoInfo = async () => {
    setError(null);
    setMessage('');
    setInfo(null);

    const detectedPlatform = detectPlatform(videoUrl);
    setPlatform(detectedPlatform);

    if (detectedPlatform === 'Unknown') {
      setError('Unsupported platform. Supported: Instagram, Facebook, LinkedIn.');
      return;
    }

    try {
      setLoading(true);
      setMessage(`Fetching ${detectedPlatform} video info...`);

      const { data } = await axios.post('http://localhost:7001/download/info', {
        url: videoUrl,
      });

      setInfo(data);
      setMessage(`${detectedPlatform} video info loaded`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl || !info) return;

    try {
      setLoading(true);
      setProgress(0);
      setError(null);
      setMessage(`Downloading ${platform} video...`);

      const response = await axios.post(
        'http://localhost:7001/download',
        { url: videoUrl },
        {
          responseType: 'blob',
          onDownloadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percent);
          },
        }
      );

      const blob = new Blob([response.data], { type: 'video/mp4' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${info.title.replace(/[^\w\s]/gi, '')}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage('Download started!');
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      setError(errorMsg);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return {
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
  };
};
