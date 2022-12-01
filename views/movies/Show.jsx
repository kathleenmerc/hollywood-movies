const React = require('react')
const DefaultLayout = require('../Default')

class Show extends React.Component {
    render() {
        const { movie } = this.props
        return (
            <DefaultLayout>
                <div>
                    <article>
                        <img src={movie.poster} alt="" width="250px" />
                        <h2>{movie.title}</h2>
                        <p>{movie.genre} | {movie.releaseDate ? movie.releaseDate : "Not available"} </p>
                        <p>{movie.rating ? movie.rating : "Not available"}</p>
                        <p>{movie.watchAgain ? "I would watch again" : "I dislike that movie"}</p>
                        <h4>{movie.director}</h4>
                        Cast:
                        <ul>
                            {movie.cast.map((star, i) => {
                                return (
                                    <li key={i}>{star}</li>
                                )
                            })}
                        </ul>
                        <a href={`/movies/${movie._id}/Edit`}><button>Edit</button></a>
                        <form action={`/movies/${movie._id}?_method=DELETE`} method="POST">
                            <input type="submit" value="Delete" />
                        </form>
                        <a href="/movies/"><button>Back to Main</button></a>
                    </article>
                </div>
            </DefaultLayout>
        )
    }
}

module.exports = Show