export class Genre{
    #id;
    name;

    static #getByNameStmt = null;
    static #getbyIdStmt = null;
    static #insertGenre = null;
    static #insertGameGenre = null;
    static #deleteGenre = null;
    static #deleteGameGenre = null;
    static #getGameWithGenre = null;
    static #getGenreWithGame = null;
    static initStatements(db) {
        if (this.#getByNameStmt !== null) return;
        this.#getByNameStmt = db.prepare('SELECT * FROM genre WHERE name = @genre_name');
        this.#getbyIdStmt = db.prepare('SELECT * FROM genre WHERE id = @genre_id');
        this.#deleteGenre = db.prepare('DELETE FROM genre WHERE id = @genre_id');
        this.#deleteGameGenre = db.prepare('DELETE FROM game_genre WHERE genre_id = @genre_id');
        this.#insertGenre = db.prepare('INSERT INTO genre(name) VALUES (name = @genre_name)');
        this.#insertGameGenre = db.prepare('INSERT INTO game_genre (game_id, genre_id) SELECT g.id, ge.id FROM game g, genre ge WHERE g.title = @game_title AND ge.name = @genre_name');
        this.#getGenreWithGame = db.prepare('SELECT DISTINCT genre.* FROM game JOIN game_genre ON game_genre.game_id = @game_id JOIN genre ON game_genre.genre_id = genre.id');
        this.#getGameWithGenre = db.prepare('SELECT DISTINCT game.* FROM genre JOIN game_genre ON game_genre.genre_id = @genre_id JOIN game ON game.id = game_genre.game_id');
    }   
    static getGameGenres(game){
        let result = null;
        const game_id = game.#id;
        const data = {game_id};
        result = this.#getGenreWithGame(data).all();
        return result;
    }
    static addGenreToGame(game,genre){
        let result = null;
        const genre_name = genre.name;
        const game_title = game.title;
        const data = {genre_name, game_title};
        try{
            result = getGenreByName(data);
            if(result === undefined){ //No existe en la bbdd
                this.insert(genre);
            }
            result = this.#insertGameGenre.run(data);
        }catch(e){
            throw new genreGameAlreadyExists(genreId,gameId);
        }
    }
    static getGenreByName(name){
        const genre_name = name;
        const data = {genre_name};
        let result = this.#getByNameStmt.get(data);
        if(result === undefined) throw new GenreNotFound(name);
        return result;
    }
    static getGenreById(id){
        const genre_id = id;
        const data = {genre_id};
        let result = this.#getbyIdStmt.get(data);
        if (result === undefined) throw new GenreNotFound(id)
        return result;
    }
    static insert(genre) {
        let result = null;
        const genre_name = genre.name;
        const data = {genre_name};
        try{
            result = this.#insertGenre.run(data);
            genre.#id = result.lastInsertRowid
        }catch(e){
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new genreAlreadyExists(genre_name);
            }
            throw new ErrorDatos("Genre couldn't be inserted", { cause: e });
        }
        return genre;
    }
    static #delete(genre){
        const genre_id = genre.#id;
        const data = {genre_id};
        try{
            this.#deleteGenre.run(data); //Se borra de la base de datos de generos
            this.#deleteGameGenre.run(data); //Se desasignan juegos al genero
        }catch(e){
            throw new ErrorDatos("Genre couldn't be delete", { cause: e });
        }
    }
    constructor(id,name){
        this.#id = id;
        this.name = name;
    }

    get id(){
        return this.#id;
    }
    get name(){
        return this.name;
    }
    set id(id){
        this.#id = id;
    }
    set name(name){
        this.name = name;
    }

    }

export class GenreNotFound extends Error {
    /**
     * 
     * @param {string} id 
     * @param {ErrorOptions} [options]
     */
    constructor(title, options) {
        super(`Genre not found: ${id}`, options);
        this.name = 'GenreNotFound';
    
    }
}
export class genreAlreadyExists extends Error {
    /**
     * 
     * @param {string} name
     * @param {ErrorOptions} [options]
         */
    constructor(name, options) {
        super(`genre is already present in DB ${name}`, options);
        this.name = 'genreAlreadyExists';
    }
}

export class genreGameAlreadyExists extends Error {
    /**
     * 
     * @param {string} genreId;
     * @param {string} gameId;
     * @param {ErrorOptions} [options]
         */
    constructor(genreId,gameId, options) {
        super(`genre ${genreId} is already present in game ${gameId}`, options);
        this.name = 'genreGameAlreadyExists';
    }
}


