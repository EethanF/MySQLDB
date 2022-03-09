const yargs = require("yargs")

const { sequelize } = require("./db/connection")
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movie/movieFunctions")

const app = async (yargsObj) => {
    try {
        await sequelize.sync()
        if(yargsObj.add) {
            await addMovie({title: yargsObj.title, actor: yargsObj.actor});
            console.log(JSON.stringify(await listMovies(), null, 2));
        } else if (yargsObj.list) {
            console.log(JSON.stringify(await listMovies({[yargsObj.key]: yargsObj.value}), null, 2))
        } else if (yargsObj.update) {
            console.log(await updateMovie(yargsObj.param, yargsObj.filterObj, yargsObj.update))
        } else if (yargsObj.delete) {
            await deleteMovie({[yargsObj.key]: yargsObj.value})
            console.log(JSON.stringify(await listMovies(), null, 2));
        }
    } catch (error) {
        console.log(error)
    }
}

app(yargs.argv)