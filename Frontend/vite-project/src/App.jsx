import './App.css';
import { DownloadVideoHook } from './customHooks/DownloadVideo';

function App() {
  const {
    videoUrl,
    setVideoUrl,
    message,
    platform,
    handleDownload,
    info,
    fetchVideoInfo,
    loading,
    error
  } = DownloadVideoHook();

  return (
    <div className="app-container">
      <h1>Multi-Platform Video Downloader</h1>

      <div className="input-group">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter video URL"
          className="url-input"
        />

        <button
          onClick={fetchVideoInfo}
          disabled={loading || !videoUrl}
          className="action-button"
        >
          {loading ? 'Loading...' : 'Get Info'}
        </button>
      </div>

      {message && (
        <p className={`message ${error ? 'error' : ''}`}>
          {message}
        </p>
      )}

      {info && (
        <div className="video-info">
          <h2>{info.title}</h2>
          <img src={info.thumbnail} alt="Thumbnail" className="thumbnail" />
          <p>Platform: {platform}</p>
          <p>Duration: {Math.floor(info.duration / 60)}:{('0' + (info.duration % 60)).slice(-2)}</p>
          <button
            onClick={handleDownload}
            disabled={loading}
            className="download-button"
          >
            {loading ? 'Downloading...' : `Download ${platform} Video`}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
