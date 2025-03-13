export class Review{

    static #getByTextStmt = null;
    static #getAllReviewsByUserStmt = null;
    static #insertStmt = null;
    static #updateStmt = null;
    static #getAllReviewsStmt = null;
    static #getAllReviewsByGameIdStmt = null;
    static #getByIdStmt = null;


    static initStatements(db){
        this.#getByTextStmt = db.prepare('SELECT * FROM review WHERE text = @text');
        this.#getAllReviewsByUserStmt = db.prepare('SELECT * FROM review WHERE user_id = @user_id');
        this.#getAllReviewsByGameIdStmt = db.prepare('SELECT * FROM review WHERE game_id = @game_id');
        this.#insertStmt = db.prepare('INSERT INTO review(user_id, game_id, description, rating, date) VALUES (@user_id, @game_id, @description, @rating, @date');
        this.#updateStmt = db.prepare('UPDATE review SET user_id = @user_id, game_id = @game_id, description = @description, rating = @rating, date = @date');
        this.#getAllReviewsStmt = db.prepare('SELECT * FROM review');
        this.#getByIdStmt = db.prepare('SELECT * FROM review WHERE id = @id');
    }
    getReviewById(id){}

    getReviewList(){}

    static #insert(review){

    }

    static #update(review){

    }

    #id;
    rating;
    description; // review text
    date;

    constructor(){}

}