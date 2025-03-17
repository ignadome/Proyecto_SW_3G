export class Post {
    static #getByIdStmt = null;
    static #insertStmt = null;
    static #getGameForum = null;
    static initStatements(db) {
        if (this.#getByIdStmt !== null) return;
        this.#getByIdStmt = db.prepare('SELECT * FROM post WHERE post_id = @post_id');
        this.#insertStmt = db.prepare('INSERT INTO post(title,description,numReplies,image) VALUES ( @title, @description, @numReplies,@image)');
        this.#getGameForum = db.prepare('SELECT * FROM game_forum WHERE game_id = @game_id');
    }
 
    static getForumPosts(game){
        let posts = [];
        let result = this.#getGameForum.get(game.id);
        result.forEach(row => posts.push(row.post_id)); //Ni idea si esta linea funciona, quiero solo extraer las ids de los Posts
        return posts;
    }//Devuelve una lista de ids de posts relacionados con el juego
    static insert(post) {
        let result = null;
        try{
            const title = post.title;
            const description = post.description;
            const date = post.date;
            const image = post.image;
            const author = post.author;
            const numReplies = post.numReplies;
            
            const data = {title,description,date,image,author,numReplies};
            result = this.#insertStmt.run(data);

            post.#id = result.lastInsertRowid;
        } catch(e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
                if (e.code === 'SQLITE_CONSTRAINT') {
                    throw new GameExists(game.title);
                }
                throw new ErrorDatos('No se ha insertado el Post', { cause: e });
            }
        return game;
    }

    static update(){

    }



    #id;
    title;
    description;
    date;
    image;
    author;
    numReplies;

    constructor(title, description,date, image,author,numReplies,id) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.image=image;
        this.author = author;
        this.numReplies = numReplies;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }
    set id(id){
        this.#id = id;
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

    get numReplies() {
        return this.numReplies;
    }

    set numReplies(numReplies){
        this.numReplies = numReplies;
    }

    get image()
    {
        return this.image;
    }

    set image(image)
    {
        this.image=image//TODO No se como funciona esto
    }

    get author()
    {
        return this.author;
    }

    set author(author)
    {
        this.genre=genre;
    }

    get date(){
        return this.date;
    }

    set date(date){
        this.date = date;
    }
}

export class PostNotFound extends Error {
    /**
     * 
     * @param {string} title 
     * @param {ErrorOptions} [options]
     */
    constructor(title, options) {
        super(`Post not found: ${title}`, options);
        this.name = 'PostNotFound';
    }
}
