const React = require("react")
const DefaultLayout = require('../Default')

class Index extends React.Component {
    render() {
        const { movies } = this.props // destructuring movies from this.props
        return (
            <DefaultLayout>
                <div>
                    <a href="/movies/new">Create a Movie</a>
                    {
                        movies.map((movie, i) => {
                            return (
                                <article key={i}>
                                    <img src={movie.poster} alt="" width="250px" />
                                    <a href={`/movies/${movie._id}`}><h2>{movie.title}</h2></a>
                                </article>
                            )
                        })
                    }
                </div>
            </DefaultLayout>
        )
    }
}

module.exports = Index