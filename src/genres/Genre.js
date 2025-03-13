export class Genre{
    #id;
    #name;

    static #getByNameStmt = null;
    static #getbyIdStmt = null;
    static #insertStmt = null;
    static initStatements(db) {
        if (this.#getByNameStmt !== null || this.#getbyIdStmt) return;

        this.#getByNameStmt = db.prepare('SELECT * FROM genre WHERE name = @name');
        this.#getbyIdStmt = db.prepare('SELECT * FROM genre WHERE id = @id');
        this.#getbyIdStmt = db.prepare('INSERT INTO genre(id,name) VALUES (id = @id, name = @name)')
    }
    static getGenreById(id){
        const Genre = this.#getbyIdStmt.get({id});
        if (Game === undefined) throw new GenreNotFound(id)
    }
    static #insert(genre) {

        let result = null;
        try {

            result = this.#insertStmt.run(genre.#name);
            genre.#id = result.lastInsertRowid
        } catch(e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new genreAlreadyExists(genre.#name);
            }
            throw genreAlreadyExists();
        }
        return user;
    }
    constructor(id,name){
        this.#id = id;
        this.#name = name;
    }

    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    set id(id){
        this.#id = id;
    }
    set name(name){
        this.#name = name;
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
    constructor(username, options) {
        super(`genre is already present in DB ${name}`, options);
        this.name = 'genreAlreadyExists';
    }
}


