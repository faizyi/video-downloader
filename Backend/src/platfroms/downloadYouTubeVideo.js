// src/platfroms/downloadYouTubeVideo.js
import ytdl from 'ytdl-core';

export const downloadYouTubeVideo = async (url, res) => {
    try {
        const videoInfo = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(videoInfo.formats, { quality: 'highestaudio' }); // Or choose a specific video format
        if (format) {
            res.setHeader('Content-Disposition', `attachment; filename="<span class="math-inline">\{videoInfo\.videoDetails\.title\.replace\(/\[^\\w\\s\]/gi, ''\)\}\.</span>{format.container}"`);
            ytdl(url, { format }).pipe(res);
        } else {
            res.status(400).json({ error: 'No suitable format found for download.' });
        }
    } catch (error) {
        console.error('YouTube Download Error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getYouTubeVideoInfo = async (url) => {
    try {
        const info = await ytdl.getInfo(url);
        return {
            title: info.videoDetails.title,
            thumbnail: info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url,
            duration: parseInt(info.videoDetails.lengthSeconds),
            formats: info.formats.map(f => ({ qualityLabel: f.qualityLabel, format: f.mimeType })) // Include available formats if needed
        };
    } catch (error) {
        console.error('YouTube Info Error:', error);
        throw new Error('Failed to fetch YouTube video info');
    }
};