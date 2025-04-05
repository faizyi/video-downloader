import { useState } from 'react';

export const DownloadVideoHook = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectPlatform = (url) => {
    if (!url) return 'Unknown';
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube';
    if (url.includes('tiktok.com')) return 'TikTok';
    if (url.includes('instagram.com')) return 'Instagram';
    if (url.includes('facebook.com')) return 'Facebook';
    if (url.includes('linkedin.com')) return 'LinkedIn';
    if (url.includes('pin.it') || url.includes('pinterest.com')) return 'Pinterest';
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
      setMessage('Unsupported platform. Supported: YouTube, TikTok, Instagram, Facebook, LinkedIn, Pinterest.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setMessage(`Fetching ${detectedPlatform} video info...`);

      const response = await fetch('http://localhost:7001/download/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video info');
      }

      const data = await response.json();
      setInfo(data);
      setMessage(`${detectedPlatform} video info loaded`);
    } catch (err) {
      setError(err.message);
      setMessage(`Error: ${err.message}`);
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

      const response = await fetch('http://localhost:7001/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to download video');
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${info.title.replace(/[^\w\s]/gi, '')}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage('Download started!');
    } catch (err) {
      setError(err.message);
      setMessage(`Error: ${err.message}`);
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
