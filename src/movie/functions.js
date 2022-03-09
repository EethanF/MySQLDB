const Movie = require("./table");


exports.addMovie = async (movieObj) => {
    try {
        await Movie.create(movieObj);
    } catch (error) {
        console.log(error);
    }
};

exports.listMovies = async (filterObj) => {
    console.log("filterObj: ", filterObj);
    try {
        if (filterObj.title || filterObj.actor) {
            return await Movie.findOne({ where: filterObj });
        } else {
            return await Movie.findAll();
        }
    } catch (error) {
        console.log(error);
    }
};

exports.updateMovie = async (filterObj) => {
    try {
        if (filterObj.newTitle ) {
        return await Movie.update({ title: filterObj.newTitle },{ where: { title: filterObj.oldTitle } });
        } else if (filterObj.newActor) {
        return await Movie.update( { actor: filterObj.newActor },{ where: { actor: filterObj.oldActor } });
        } else {
            console.log("incorrect input");
        };
    } catch (error) {
        console.log(error);
    }
};

exports.deleteMovie = async (title) => {
    try {
        return await Movie.destroy({ where: title });
    } catch (error) {
        console.log(error);
    }
};
