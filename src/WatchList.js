import { useState, useEffect } from "react";
const WATCHLIST_KEY = "WATCHLIST_KEY";
const imageBaseURL = "https://image.tmdb.org/t/p/w500";
const getWatchListFromLocalStorage = () => {
    const WatchList = localStorage.getItem(WATCHLIST_KEY);

    let value;
    if (WatchList)
        value = JSON.parse(WatchList);
    else
        value = [];
    return value;
}
function WatchList() {
    const [WatchList, setWatchList] = useState(getWatchListFromLocalStorage());
    const [genreId, setGenreId] = useState({});

    const genreURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=16b076ecc98cacec1b45493a1f605ffa`;
    const options = { method: "GET", headers: { accept: 'application/json' } };

    const getGenre = () => {
        fetch(genreURL, options)
            .then((res) => res.json())
            .then((response) => {
                const genreArr = response.genres;
                const computedGenreId = genreArr.reduce((acc, genreObj) => {
                    const { id, name } = genreObj;
                    return { ...acc, [id]: name };
                }, {});
                setGenreId(computedGenreId);
            })
            .catch((err) => console.error(err))
    };
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
    useEffect(() => {
        getGenre();
    }, []);

    const handleFilter = (event) => {
        const selctedGenre = event.target.value;
        if (selctedGenre === "all") {
            setWatchList(getWatchListFromLocalStorage());
        } else {
            const filteredWatchList = getWatchListFromLocalStorage().filter(({ genreIDs }) => genreIDs.includes(parseInt(selctedGenre)));
            setWatchList(filteredWatchList);
        }
    }

    const sortByRating = () => {
        const temp = [...WatchList];
        const updatedWatchList = temp.sort((a, b) => b.Rating - a.Rating);
        setWatchList(updatedWatchList);
    }
    return (
        <div className="relative overflow-x-auto">
            <div className="flex justify-between p-3">
                <button disabled={WatchList.length === 0} onClick={sortByRating} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Sort By Ratings
                    </span>
                </button>
                <select onChange={handleFilter}
                    type="button" class="text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <option value="all">Select Genre(s)</option>
                    {getWatchListFromLocalStorage().map(({ genreIDs = [] }) => {
                        return (
                            genreIDs.map(genreName => <option value={genreName}>{genreId[genreName]}</option>)
                        )
                    })}
                </select>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            TITLE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            RELEASE DATE
                        </th>
                        <th scope="col" className="px-6 py-3">
                            RATINGS
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Genre(s)
                        </th>
                        <th scope="col" className="px-6 py-3">
                            POSTER
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Remove
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {WatchList.map(({
                        id,
                        title = "",
                        releaseDate = "N/A",
                        Rating, genreIDs = [],
                        posterPath
                    }) => (
                        <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-500">
                            <td className="px-6 py-4">
                                {title}
                            </td>
                            <td className="px-6 py-4">
                                {releaseDate}
                            </td>
                            <td className="px-6 py-4">
                                {Rating}
                            </td>
                            <td className="px-6 py-4">
                                {genreIDs.map((genreIdd) => genreId[genreIdd] || "").join(", ")}
                            </td>
                            <td className="px-6 py-4 w-[120px] h - [70px]">
                                <img src={`${imageBaseURL}/${posterPath}`} />
                            </td>
                            <td className="px-6 py-4">
                                <p className="text-red-200 hover:text-red-600 cursor-pointer" onClick={() => (removeFromWatchList(id))}>Delete 🗑️</p>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default WatchList;


//https://image.tmdb.org/t/p/w500//voHUmluYmKyleFkTu3lOXQG702u.jpg

// const APIkey = 16b076ecc98cacec1b45493a1f605ffa;