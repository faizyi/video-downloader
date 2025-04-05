import puppeteer from "puppeteer";
import https from "https";
import fs from "fs";
import path from "path";

export const getPinterestVideoInfo = async (url) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  const info = await page.evaluate(() => {
    const video = document.querySelector("video");
    const title = document.title;
    const thumbnail = document.querySelector("meta[property='og:image']")?.content || '';
    const duration = Math.floor(video?.duration || 0);
    return { title, thumbnail, duration };
  });

  await browser.close();
  return info;
};

export const downloadPinterestVideo = async (url, res) => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Enable request interception to capture network traffic
    await page.setRequestInterception(true);

    // Variable to store the video URL
    let videoUrl = null;

    // Intercept network responses and look for video URLs
    page.on('response', async (response) => {
      const responseUrl = response.url();
      console.log('Response URL:', responseUrl);  // Log all response URLs for debugging

      // Look for video file URLs
      if (responseUrl.includes('.mp4') || responseUrl.includes('.mov')) {
        videoUrl = responseUrl;
      }
    });

    // Increase navigation timeout and change the waiting behavior
    await page.goto(url, {
      waitUntil: 'domcontentloaded',  // Wait for the DOM to be loaded
      timeout: 60000  // Set timeout to 60 seconds
    });

    // Wait explicitly for the video element to load
    await page.waitForSelector("video", { visible: true, timeout: 60000 });

    // Check if we found a video URL
    if (!videoUrl) {
      console.error("Failed to retrieve valid video URL");
      return res.status(500).json({ error: "Failed to retrieve valid video URL from network" });
    }

    console.log("Found video URL:", videoUrl);

    // Define file path for saving the video
    const filePath = path.resolve("downloads", "pinterest_video.mp4");
    const file = fs.createWriteStream(filePath);

    // Download the video
    https.get(videoUrl, (response) => {
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          res.download(filePath, "pinterest_video.mp4", () => fs.unlinkSync(filePath));
        });
      });
    }).on("error", (err) => {
      console.error("Download error:", err); // Log the error
      fs.unlinkSync(filePath);  // Clean up the file
      res.status(500).json({ error: "Video download failed" });
    });

    await browser.close();
  } catch (err) {
    console.error("Error in downloadPinterestVideo:", err);  // Log the error for debugging
    res.status(500).json({ error: "Internal server error" });
  }
};





