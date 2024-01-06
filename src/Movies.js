import { useState, useEffect } from "react";
const imageBaseURL = "https://image.tmdb.org/t/p/w500";
const WATCHLIST_KEY = "WATCHLIST_KEY";
const Movies = function () {
    // const APIkey = "16b076ecc98cacec1b45493a1f605ffa";
    const getWatchListFromLocalStorage = () => {
        const watchList = localStorage.getItem(WATCHLIST_KEY);

        let value;
        if (watchList)
            value = JSON.parse(watchList);
        else
            value = [];
        return value;
    }
    const [movies, setMovies] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [WatchList, setWatchList] = useState(getWatchListFromLocalStorage());
    const [searchQuery, setSearchQuery] = useState("");

    const trendingMovieUrl = `https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=16b076ecc98cacec1b45493a1f605ffa&page=${pageNumber}`;
    const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&api_key=16b076ecc98cacec1b45493a1f605ffa&page=${pageNumber}`;
    const options = { method: "GET", headers: { accept: 'application/json' } };

    const getMovies = () => {
        setIsLoading(true);
        fetch(trendingMovieUrl, options)
            .then((res) => res.json())
            .then((json) => setMovies(json.results))
            .catch((err) => console.err(err))
            .finally(() => { setIsLoading(false) })
    };
    const seacrhMovies = (search) => {
        setIsLoading(true);
        fetch(searchMovieUrl, options)
            .then((res) => res.json())
            .then((json) => setMovies(json.results))
            .catch((err) => console.err(err))
            .finally(() => { setIsLoading(false) })
    };

    useEffect(() => {
        if (searchQuery)
            seacrhMovies(searchQuery);
        else
            getMovies();
    }, [pageNumber, searchQuery]);

    const handleNextPage = () => {
        if (pageNumber === 500)
            return;
        setPageNumber(pageNumber + 1);
    }
    const handlePrevPage = () => {
        if (pageNumber === 1)
            return;
        setPageNumber(pageNumber - 1);
    }


    const isMovieAlreadyPresentInWatchList = (mediaID, watchListMovies) => {
        return watchListMovies.find((movie) => movie.id === mediaID)
    }

    const saveTolocalStorage = (movieObj) => {
        let currentWatchList = getWatchListFromLocalStorage();

        if (isMovieAlreadyPresentInWatchList(movieObj.id, currentWatchList)) return;

        currentWatchList = [...currentWatchList,
        {
            id: movieObj.id,
            title: movieObj.title,
            name: movieObj.name,
            posterPath: movieObj.poster_path,
            releaseDate: movieObj.release_date,
            Rating: movieObj.vote_average,
            genreIDs: movieObj.genre_ids
        }];

        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(currentWatchList));
        setWatchList(currentWatchList);
    }

    const removeFromWatchList = (mediaID) => {
        if (WatchList.length === 1) {
            localStorage.removeItem(WATCHLIST_KEY);
            setWatchList([]);
            return;
        }

        let updatedWatchList = WatchList.filter((movie) => movie.id !== mediaID);
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify(updatedWatchList));
        setWatchList(updatedWatchList);
    }

    const handleClick = (movieObj = {}) => {
        const { id: mediaID } = movieObj || {};
        if (isMovieAlreadyPresentInWatchList(mediaID, WatchList))
            removeFromWatchList(mediaID);
        else
            saveTolocalStorage(movieObj);
    }

    return (
        <div className="text-center py-1  font-bold text-2xl">
            <p className="underline">Trending Movies</p>
            <div className="flex justify-end">
                <input className="border border-cyan-700" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search" />
            </div>
            <div>
                {isLoading ? (<div>Loading...</div>) :
                    (
                        <div className="px-10 flex flex-wrap">
                            {movies.map((movie, index) => {
                                // console.log("movie =>", { pageNumber });
                                const { title = "", name = "", poster_path: posterPath } = movie;
                                return (
                                    <div onClick={() => (handleClick(movie))} className="my-4 cursor-pointer">
                                        <div
                                            key={index}
                                            className="hover:scale-110 duration-300 w-[200px] h-[30vh] bg-cover rounded-lg mx-10 my-7 relative"
                                            style={{ backgroundImage: `url(${imageBaseURL}/${posterPath})` }}>
                                            <div className="p-1 absolute right-0 bg-slate-500 opacity-90 rounded-b-md">
                                                {isMovieAlreadyPresentInWatchList(movie.id, WatchList) ? "❤️" : "🤍"}
                                            </div>
                                            <div className="text-center text-xl bg-gray-900 bg-opacity-30 absolute bottom-0">{title || name}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

            </div>


            <div className="flex justify-around my-7">
                <button className="hover:scale-110 duration-300" disabled={isLoading || pageNumber === 0} onClick={handlePrevPage}>Previous</button>
                {pageNumber}
                <button className="hover:hover:scale-110 duration-300" disabled={pageNumber === 500} onClick={handleNextPage}>Next</button>
            </div>
        </div>
    )
}

export default Movies;