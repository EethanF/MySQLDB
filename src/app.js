const yargs = require("yargs")

const { sequelize } = require("./db/connection")
const { addMovie, listMovies, updateMovie, deleteMovie } = require("./movie/functions")

const app = async (yargsObj) => {
    try {
        await sequelize.sync();
        if(yargsObj.add) {
            await addMovie( { title: yargsObj.title, actor: yargsObj.actor});
            console.log(JSON.stringify(await listMovies( { [yargsObj.key]: yargsObj.value } ), null, 2));
        } else if (yargsObj.list) {
            console.log(JSON.stringify(await listMovies( { [yargsObj.key]: yargsObj.value } ), null, 2));
        } else if (yargsObj.update) {
            console.log(JSON.stringify(await updateMovie(yargsObj), null, 2));
        } else if (yargsObj.delete) {
            console.log(JSON.stringify(await deleteMovie({ title: yargsObj.title })));
        }
        await sequelize.close();
    } catch (error) {
        console.log(error);
        await sequelize.close();
    }
}

app(yargs.argv)
