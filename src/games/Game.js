//import bcrypt from "bcryptjs";


export class Game {
    static #getByTitleStmt = null;
    static #getbyCompanyStmt=null;
    static #getbyGenreStmt=null;
    static #insertStmt = null;
    static #updateStmt = null;
    static #getAllGamesStmt = null;
    static #getByIdStmt = null;
    

    static initStatements(db) {
        if (this.#getByTitleStmt !== null) return;
        if(this.#getbyCompanyStmt!==null)return;
        if(this.#getbyGenreStmt!==null )return;

        this.#getByTitleStmt = db.prepare('SELECT * FROM game WHERE title = @title');
        this.#getbyCompanyStmt=db.prepare('SELECT * FROM game WHERE company_id=@company');
        this.#getbyGenreStmt=db.prepare('SELECT * FROM game_genre WHERE genre_id=@genre');
        this.#insertStmt = db.prepare('INSERT INTO game( title, description, rating, favNumber,image) VALUES ( @title, @description, @rating, @favNumber,@image)');//TODO Hacer la inclusion para los genres de los game
        this.#updateStmt = db.prepare('UPDATE game SET title = @title, description = @description, rating = @rating, favNumber = @favNumber,image=@image WHERE id = @id');//TODO Hacer la inclusion para los genros de Game
        this.#getAllGamesStmt = db.prepare('SELECT * FROM game');
        this.#getByIdStmt = db.prepare('SELECT * FROM game WHERE id = @id');

    }
    
    static getGameByTitle(title) {
        const Game = this.#getByTitleStmt.get({ title });
        if (Game === undefined) throw new GameNotFound(title);

        const {  description, rating, favNumber, id } = game;

        return new Game(title, description, rating, favNumber, id);
    }

    static getGameById(id) {
        const juego = this.#getByIdStmt.get({ id })
        if (juego === undefined) throw new GameNotFound(id);

        //const {  descripcion, valoracion, numFavoritos, titulo } = juego;

        const {title, description, rating, favNumber, image, company, genre} = juego;
        

        return new Game(title, description,rating, favNumber, image,company,genre);
    }

    static getGameList(){
        const gameList = this.#getAllGamesStmt.all();
        if(gameList === undefined) throw new GameNotFound(gameList);

        return gameList;
    }

    static #insert(game) {
        let result = null;
        try {
            const title = game.title;
            const description = game.description;
            const rating = game.rating;
            const favNumber = game.favNumber;
            const image=game.image;

          
            const data = {title: title, description:description, rating: rating, favNumber: favNumber,image: image};

            result = this.#insertStmt.run(data);

            game.#id = result.lastInsertRowid;
        } catch(e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new GameExists(game.title);
            }
            throw new ErrorDatos('No se ha insertado el Game', { cause: e });
        }
        return game;
    }

    static #update(game) {
        const title = game.title;
        const description = game.description;
        const rating = game.rating;
        const favNumber = game.favNumber;
        const image=game.image;

        const datos = {title, description, rating, favNumber,image};

        const result = this.#updateStmt.run(datos);
        if (result.changes === 0) throw new GameNotFound(title);

        return game;
    }

    #id;
    title;
    description;
    rating;
    favNumber;
    image;
    genre;
    company;

    constructor(title, description,rating, favNumber, image,company,genre, id = null) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.favNumber = favNumber;
        this.image=image;
        this.company=company;
        this.genre=genre;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    get title() {
        return this.title;
    }

    set title(title){
        this.title = title;
    }

    get description() {
        return this.description;
    }

    set description(description){
        this.description = description;
    }

    get rating() {
        return this.rating;
    }

    set rating(rating){
        this.ti = rating;
    }

    get favNumber() {
        return this.favNumber;
    }

    set favNumber(favNumber){
        this.favNumber = favNumber;
    }

    get image()
    {
        return this.image;
    }

    set image(image)
    {
        this.image=image//TODO No se como funciona esto
    }

    get genre()
    {
        return this.genre;
    }

    set genre(genre)
    {
        this.genre=genre;
    }

    get company()
    {
        return this.company;
    }

    set company(company)
    {
        this.company=company;
    }

    persist() {
        if (this.#id === null) return Game.#insert(this);
        return Game.#update(this);
    }
}

export class GameNotFound extends Error {
    /**
     * 
     * @param {string} title 
     * @param {ErrorOptions} [options]
     */
    constructor(title, options) {
        super(`Game no encontrado: ${title}`, options);
        this.name = 'GameNoEncontrado';
    }
}


export class GameExists extends Error {
    /**
     * 
     * @param {string} title 
     * @param {ErrorOptions} [options]
     */
    constructor(title, options) {
        super(`Game already exists: ${title}`, options);
        this.name = 'GameExists';
    }
}
