import { useState } from 'react';
import axios from 'axios';

export const useDownloadVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');
  const [platform, setPlatform] = useState('');
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // New state for download redirection

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
      const { data } = await axios.post('https://video-downloader-server-production.up.railway.app/download/info', {
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

  const handleGetInfo = async () => {
    setIsFetchingInfo(true);
    setMessage("");
    setOpenModal(false);
    await fetchVideoInfo();
    setIsFetchingInfo(false);
    setOpenModal(true);
  };

  const handleDownload = () => {
    setIsDownloading(true); // Set downloading state to true
    setMessage('You are redirecting...'); // Show redirecting message

    const encodedUrl = encodeURIComponent(videoUrl);
    const downloadUrl = `https://video-downloader-server-production.up.railway.app/download?url=${encodedUrl}`;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = `${info.title.replace(/[^\w\s]/gi, '')}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Reset the downloading state and message after a short delay
    // setIsDownloading(false);
    setTimeout(() => {
      setMessage('Download started!');
    }, 2000); // Adjust the delay as needed (e.g., 2 seconds)
  };

  return {
    videoUrl,
    setVideoUrl,
    message,
    setMessage,
    platform,
    handleDownload,
    info,
    fetchVideoInfo,
    loading,
    error,
    isFetchingInfo,
    setIsFetchingInfo,
    handleGetInfo,
    openModal,
    setOpenModal,
    isDownloading, // Return the new state
  };
};