import React, { useState } from 'react';
import axios from 'axios';
// import './App.css';

function Yt() {
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (e) => {
    e.preventDefault();
    if (!url) {
      setMessage('Please enter a YouTube URL');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios({
        url: `http://localhost:7001/download/yt?url=${encodeURIComponent(url)}`,
        method: 'GET',
        responseType: 'blob',
      });

      const videoUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = videoUrl;
      link.setAttribute('download', 'video.mp4');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setMessage('Download started successfully!');
    } catch (error) {
      setMessage('Error downloading video. Please check the URL and try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleDownload}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Downloading...' : 'Download'}
        </button>
      </form>
      {message && <p className={message.includes('Error') ? 'error' : 'success'}>{message}</p>}
    </div>
  );
}

export default Yt;