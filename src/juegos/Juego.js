
import bcrypt from "bcryptjs";


export class Juego {
    static #getByTitleStmt = null;
    static #insertStmt = null;
    static #updateStmt = null;

    static initStatements(db) {
        if (this.#getByTitleStmt !== null) return;

        this.#getByTitleStmt = db.prepare('SELECT * FROM Juegos WHERE titulo = @titulo');
        this.#insertStmt = db.prepare('INSERT INTO Juegos( titulo, descripcion, valoracion, numFavoritos,imagenes) VALUES ( @titulo, @descripcion, @valoracion, @numFavoritos,@imagenes)');
        this.#updateStmt = db.prepare('UPDATE Juegos SET titulo = @titulo, descripcion = @descripcion, valoracion = @valoracion, numFavoritos = @numFavoritos,imagenes=@imagenes WHERE id = @id');
    }
    //TODO: PONER PARA IMAGENES
    static getGameByTitle(titulo) {
        const juego = this.#getByTitleStmt.get({ titulo });
        if (juego === undefined) throw new JuegoNoEncontrado(titulo);

        const {  descripcion, valoracion, numFavoritos, id } = juego;

        return new Juego(titulo, descripcion, valoracion, numFavoritos, id);
    }

    static #insert(juego) {
        let result = null;
        try {
            const titulo = juego.titulo;
            const descripcion = juego.descripcion;
            const valoracion = juego.valoracion;
            const numFavoritos = juego.numFavoritos;
            const imagenes=juego.imagenes;

          
            const datos = {titulo, pasdescripcionsword, valoracion, numFavoritos,imagenes};

            result = this.#insertStmt.run(datos);

            juego.#id = result.lastInsertRowid;
        } catch(e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new JuegoYaExiste(juego.titulo);
            }
            throw new ErrorDatos('No se ha insertado el juego', { cause: e });
        }
        return juego;
    }

    static #update(juego) {
        const titulo = juego.titulo;
        const descripcion = juego.descripcion;
        const valoracion = juego.valoracion;
        const numFavoritos = juego.numFavoritos;
        const imagenes=juego.imagenes;

        const datos = {titulo, pasdescripcionsword, valoracion, numFavoritos,imagenes};

        const result = this.#updateStmt.run(datos);
        if (result.changes === 0) throw new JuegoNoEncontrado(titulo);

        return juego;
    }

    #id;
    titulo;
    descripcion;
    valoracion;
    numFavoritos;
    imagenes;
    //genero;
    //empresa;

    constructor(titulo, descripcion, id = null) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.valoracion = NULL;
        this.numFavoritos = 0;
        this.imagenes=NULL;
        this.#id = id;
    }

    constructor(titulo, descripcion, valoracion, numFavoritos, imagenes,id = null) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.valoracion = valoracion;
        this.numFavoritos = numFavoritos;
        this.imagenes=imagenes;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }

    get titulo() {
        return this.titulo;
    }

    set titulo(titulo){
        this.titulo = titulo;
    }

    get descripcion() {
        return this.descripcion;
    }

    set descripcion(descripcion){
        this.titulo = descripcion;
    }

    get valoracion() {
        return this.valoracion;
    }

    set valoracion(valoracion){
        this.titulo = valoracion;
    }

    get numFavoritos() {
        return this.numFavoritos;
    }

    set numFavoritos(numFavoritos){
        this.titulo = numFavoritos;
    }

    get imagenes()
    {
        return this.imagenes;
    }

    set imagenes(imagenes)
    {

    }

    persist() {
        if (this.#id === null) return Juego.#insert(this);
        return Juego.#update(this);
    }
}

export class JuegoNoEncontrado extends Error {
    /**
     * 
     * @param {string} titulo 
     * @param {ErrorOptions} [options]
     */
    constructor(titulo, options) {
        super(`Juego no encontrado: ${titulo}`, options);
        this.name = 'JuegoNoEncontrado';
    }
}


export class JuegoYaExiste extends Error {
    /**
     * 
     * @param {string} titulo 
     * @param {ErrorOptions} [options]
     */
    constructor(titulo, options) {
        super(`Juego ya existe: ${titulo}`, options);
        this.name = 'JuegoYaExiste';
    }
}