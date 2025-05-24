import React from 'react';
import './TripOverview.css';

export default function TripOverview({ itinerary }) {
  const {
    destination,
    destinationOverview,
    weatherSummary,
    vibeTags = [],
    mustTryFoods = [],
    spotifyPlaylist,
    emergencyContacts = {},
    photos = []
  } = itinerary;

  return (
    <div className="trip-overview">
      {photos.length > 0 && (
        <div
          className="trip-banner"
          style={{ backgroundImage: `url(\${photos[0]})` }}
        >
          <div className="trip-banner-overlay">
            <h1>🌍 {destination}</h1>
            <p>{destinationOverview}</p>
          </div>
        </div>
      )}

      <div className="overview-details">
        <div className="vibe-tags">
          {vibeTags.map((tag, i) => (
            <span key={i} className="tag">
              #{tag}
            </span>
          ))}
        </div>

        <p className="weather-summary">☀️ {weatherSummary}</p>

        <div className="section">
          <h3>🍽️ Must-Try Foods</h3>
          <ul>
            {mustTryFoods.map((food, i) => (
              <li key={i}>{food}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>🆘 Emergency Contacts</h3>
          <ul>
            {Object.entries(emergencyContacts).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>

        {spotifyPlaylist && spotifyPlaylist.includes("open.spotify.com") && (
          <div className="section">
            <h3>🎧 Trip Vibe Playlist</h3>
            <a
              href={spotifyPlaylist}
              target="_blank"
              rel="noreferrer"
              className="playlist-link"
            >
              ▶️ Listen on Spotify
            </a>
          </div>
        )}
      </div>
    </div>
  );
}