import React, { useState } from 'react';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { useContentStore } from '../../store/content';
import Navbar from '../../components/Navbar';
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from '../../utils/constants';
import { Link } from 'react-router-dom';
import { Info, Play } from 'lucide-react';
import MovieSlider from '../../components/MovieSlider';

const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const [imgLoading, setImgLoading] = useState(true);

  if (!trendingContent) {
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[85vh] text-white">
        <Navbar />
        {imgLoading && (
          <div className="absolute top-0 left-0 h-[120vh] bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          alt="trending content"
          className="absolute top-0 left-0 min-h-screen min-w-screen object-cover -z-50"
          onLoad={() => {
            setImgLoading(false);
          }}
        />

        {/* Gradient Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-black/40 to-[#141414] -z-40 pointer-events-none"></div>

        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-20">
          {/* Enhanced Gradient for Smooth Blending */}
          <div className="absolute w-full h-full top-0 left-0 -z-10 bg-gradient-to-b from-transparent via-black/20 to-[#141414b7]"></div>

          <div className="max-w-3xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingContent?.title}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent?.release_date?.split('-')[0] ||
                trendingContent?.first_air_date.split('-')[0]}{' '}
              | {trendingContent?.adult ? '18+' : 'PG-13'}
            </p>
            <p className="mt-4 text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + '...'
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black font-semibold py-2 px-8 text-2xl rounded mr-4 flex items-center"
            >
              <Play className="size-8 mr-2 fill-black" />
              <div>Play</div>
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white font-semibold py-2 px-4 text-2xl rounded flex items-center"
            >
              <Info className="size-6 mr-2 " />
              <div>More Info</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Movie Slider Section */}
      <div className="flex flex-col relative z-10">
        {contentType === 'movie'
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};

export default HomeScreen;
