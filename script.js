const apiKey = '1kXsLvahSvgQLDXlz0mcfYVnJlYwC9wwQV6gaAN5NmmjgxYXoaT5tHdI'; // Your Pexels API key
const videoContainer = document.getElementById('video-container');

// Fetch videos from Pexels API
async function fetchVideos() {
  try {
    const response = await fetch(`https://api.pexels.com/videos/search?query=girly&per_page=30`, {
      headers: {
        Authorization: apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.videos || data.videos.length === 0) {
      videoContainer.innerHTML = '<p>No videos found! 💔</p>';
      return;
    }

    displayVideos(data.videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    videoContainer.innerHTML = '<p>Oops! Something went wrong. 😢</p>';
  }
}

// Display videos on the website
function displayVideos(videos) {
  videoContainer.innerHTML = ''; // Clear previous content

  videos.forEach(video => {
    const videoElement = document.createElement('video');
    videoElement.controls = true;
    videoElement.src = getBestVideoFile(video.video_files); // Pick the best video file
    videoElement.poster = video.image; // Set thumbnail
    videoElement.style.borderRadius = "15px"; // Make it cuter
    videoElement.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"; // Add soft shadow
    videoElement.style.width = "100%"; // Ensure it fits nicely
    videoElement.style.marginBottom = "10px";
    
    videoContainer.appendChild(videoElement);
  });
}

// Function to pick the best video file format
function getBestVideoFile(videoFiles) {
  const mp4Video = videoFiles.find(file => file.file_type === "video/mp4");
  return mp4Video ? mp4Video.link : videoFiles[0].link;
}

// Fetch videos when the page loads
fetchVideos();
