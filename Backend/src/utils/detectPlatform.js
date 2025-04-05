export const detectPlatform = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('facebook.com')) return 'facebook';
    if (url.includes('pin.it') || url.includes('pinterest.com')) return 'pinterest';
    if (url.includes('linkedin.com')) return 'linkedin';
    return 'unknown';
  };
  