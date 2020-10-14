import React from "react";
import PropTypes from "prop-types";
import { FaRegPlayCircle } from "react-icons/fa";

import { Pill } from "components";

import "styles/components/track.styl";

const Track = ({ artist, updateFilter, name, genres }) => {
  return (
    <article className="track-wrapper">
      <div className="cover">
        <FaRegPlayCircle className="icon-play" />
        <h3 className="track-title">{name} kk</h3>
      </div>

      <div className="track-info">
        <p className="artist">{artist}</p>
        <div className="genres">
          {genres.map((genre, index) => (
            <Pill
              key={index.toString()}
              className="genre"
              handleOnClick={updateFilter}
              id={genre.music_genre.music_genre_id}
              genre={genre.music_genre}
            />
          ))}
        </div>
      </div>
    </article>
  );
};

Track.propTypes = {
  artist: PropTypes.string,
  name: PropTypes.string,
  genres: PropTypes.array,
  filter: PropTypes.func,
  updateFilter: PropTypes.func,
};

export default Track;
