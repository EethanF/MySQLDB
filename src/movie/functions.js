const Movie = require("./table");


exports.addMovie = async (movieObj) => {
    try {
        await Movie.create(movieObj); //make argument in app.js
    } catch (error) {
        console.log(error);
    }
}

exports.listMovies = async (filterObj) => {
    console.log("filterObj: ", filterObj);
    try {
        if (filterObj.undefined === undefined) {
            return await Movie.findAll();
        } else {
            return await Movie.findOne({where: filterObj});
        }
    } catch (error) {
        console.log(error);
    }
}

exports.deleteMovie = async (deleteObj) => {
    try {
        if (deleteObj.title || deleteObj.actor) {
            return await Movie.destroy({where: deleteObj});
        } else {
            console.log("Input Incorrect");
        }
    } catch (error) {
        console.log(error);
    }
}

exports.updateMovie = async (param, filterObj, update) => {
    try {
        if (param === "title"){
        await Movie.update({title: update}, {where: {title: filterObj}});
        } else if (param === "actor") {
            const test =  await Movie.update({actor: update}, {where: {actor: filterObj}});
            console.log(test)
        }
    } catch (error) {
        console.log(error);
    }
};
