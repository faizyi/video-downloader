import { useState } from 'react';
import axios from 'axios';

export const DownloadVideoHook = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectPlatform = (url) => {
    if (!url) return 'Unknown';
    // if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    // if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    // if (url.includes('pin.it') || url.includes('pinterest.com')) return 'Pinterest';
    return 'Unknown';
  };

  const fetchVideoInfo = async () => {
    if (!videoUrl) {
      setMessage('Please enter a video URL');
      return;
    }

    const detectedPlatform = detectPlatform(videoUrl);
    setPlatform(detectedPlatform);

    if (detectedPlatform === 'Unknown') {
      setMessage('Unsupported platform. Supported: Instagram, Facebook, LinkedIn.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(`Fetching ${detectedPlatform} video info...`);

      const { data } = await axios.post('https://video-downloader-server-production.up.railway.app/download/info', {
        url: videoUrl,
      });

      setInfo(data);
      setMessage(`${detectedPlatform} video info loaded`);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message;
      setError(errorMsg);
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoUrl || !info) return;

    try {
      setLoading(true);
      setError(null);
      setMessage(`Starting ${platform} download...`);

      const response = await axios.post(
        'http://localhost:7001/download',
        { url: videoUrl },
        { responseType: 'blob' }
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
      setMessage(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
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
    error
  };
};
