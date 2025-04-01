export class Forum {
    static #getByIdStmt = null;
    static #getByGameStmt = null;
    static #getRepliesStmt = null;
    static #insertThreadStmt = null;
    static #insertReplyStmt = null;
    static #updateReplyCountStmt = null;
    static #getThreadByIdStmt = null;
    static #getNextPostByIdStmt = null;

    static initStatements(db) {
        if (this.#getByIdStmt !== null) return;

        this.#getByIdStmt = db.prepare('SELECT * FROM forum_post WHERE id = @id');
        this.#getThreadByIdStmt = db.prepare(`
            SELECT forum_post.*, user.username as user_name
            FROM forum_post
            JOIN user ON forum_post.user_id = user.id
            WHERE forum_post.game_id = @game_id 
            AND forum_post.original_post_id = @last_id 
            LIMIT @cant OFFSET @offset
        `);
        this.#getNextPostByIdStmt = db.prepare('SELECT * FROM forum_post WHERE game_id = @game_id AND original_post_id = @last_id LIMIT 1 OFFSET @offset');
        this.#getByGameStmt = db.prepare('SELECT * FROM forum_post WHERE game_id = @game_id ');
        this.#getRepliesStmt = db.prepare('SELECT * FROM forum_post WHERE original_post_id = @post_id');
        this.#insertThreadStmt = db.prepare('INSERT INTO forum_post (game_id, original_post_id, title, description, user_id) VALUES (@game_id, -1, @title, @description, @user_id)');
        this.#insertReplyStmt = db.prepare('INSERT INTO forum_post (game_id, original_post_id, description, user_id) VALUES (@game_id, @original_post_id, @description, @user_id)');
        this.#updateReplyCountStmt = db.prepare('UPDATE forum_post SET replies = replies + 1 WHERE id = @post_id');
    }

    static getPostById(id) {
        const thread = this.#getByIdStmt.get({ id });
        if (!thread) throw new ForumNotFound(id);
        return thread;
    }

    static getThreadById(game_id, last_id, cant, offset) {
        const thread = this.#getThreadByIdStmt.all({ game_id, last_id, cant, offset });
        const nextPost = this.#getNextPostByIdStmt.get({ game_id, last_id, offset: (+offset) + (+cant) });
        const showMore = nextPost ? true : false;
        if (showMore) {
            thread.showMore = true;
        } else {
            thread.showMore = false;
        }
        thread.last_id = last_id;
        return thread;
    }

    static getThreadsByGame(game_id) {
        return this.#getByGameStmt.all({ game_id });
    }

    static getReplies(post_id) {
        return this.#getRepliesStmt.all({ post_id });
    }

    static createThread(game_id, title, description, user_id) {
        const result = this.#insertThreadStmt.run({ game_id, title, description, user_id });
        return result.lastInsertRowid;
    }

    static createReply(game_id, original_post_id, description, user_id) {
        const result = this.#insertReplyStmt.run({ game_id, original_post_id, description, user_id });
        this.#updateReplyCountStmt.run({ post_id: original_post_id }); // Actualiza el número de respuestas
        return result.lastInsertRowid;
    }
    constructor(id, game_id, original_post_id, title, description, user_id, replies = 0) {
        this.id = id;
        this.game_id = game_id;
        this.original_post_id = original_post_id;
        this.title = title;
        this.description = description;
        this.user_id = user_id;
        this.replies = replies;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get game_id() {
        return this._game_id;
    }

    set game_id(value) {
        this._game_id = value;
    }

    get original_post_id() {
        return this._original_post_id;
    }

    set original_post_id(value) {
        this._original_post_id = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get user_id() {
        return this._user_id;
    }

    set user_id(value) {
        this._user_id = value;
    }

    get replies() {
        return this._replies;
    }

    set replies(value) {
        this._replies = value;
    }
}

export class ForumNotFound extends Error {
    constructor(id, options) {
        super(`Forum post not found: ${id}`, options);
        this.name = 'ForumNotFound';
    }
}
