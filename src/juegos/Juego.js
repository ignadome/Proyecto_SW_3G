import bcrypt from "bcryptjs";


export class Juego {
    static #getByTitleStmt = null;
    static #getbyCompanyStmt=null;
    static #getbyGenreStmt=null;
    static #insertStmt = null;
    static #updateStmt = null;
    

    static initStatements(db) {
        if (this.#getByTitleStmt !== null) return;
        if(this.#getbyCompanyStmt!==null)return;
        if(this.#getbyGenreStmt!==null )return;

        this.#getByTitleStmt = db.prepare('SELECT * FROM Juegos WHERE titulo = @titulo');
        this.#getbyCompanyStmt=db.prepare('SELECT * FROM Juegos WHERE empresa=@empresa');
        this.#getbyGenreStmt=db.prepare('SELECT * FROM juego_genero WHERE genero=@genero');
        this.#insertStmt = db.prepare('INSERT INTO Juegos( titulo, descripcion, valoracion, numFavoritos,imagenes) VALUES ( @titulo, @descripcion, @valoracion, @numFavoritos,@imagenes)');//TODO Hacer la inclusion para los generos de los juegos
        this.#updateStmt = db.prepare('UPDATE Juegos SET titulo = @titulo, descripcion = @descripcion, valoracion = @valoracion, numFavoritos = @numFavoritos,imagenes=@imagenes WHERE id = @id');//TODO Hacer la inclusion para los genros de juego

    }
    
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
    genero;
    empresa;

    constructor(titulo, descripcion, id = null) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.valoracion = NULL;
        this.numFavoritos = 0;
        this.imagenes=NULL;
        this.empresa=NULL;
        this.genero=NULL;
        this.#id = id;
    }

    constructor(titulo, descripcion, valoracion, numFavoritos, imagenes,empresa,genero,id = null) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.valoracion = valoracion;
        this.numFavoritos = numFavoritos;
        this.imagenes=imagenes;
        this.empresa=empresa;
        this.genero=genero;
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
        this.imagenes=imagenes//TODO No se como funciona esto
    }

    get genero()
    {
        return this.genero;
    }

    set genero(genero)
    {
        this.genero=genero;
    }

    get empresa()
    {
        return this.empresa;
    }

    set empresa(empresa)
    {
        this.empresa=empresa;
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
