import {name} from "ejs";
import * as console from "node:console";
import e from "express";
import * as bcrypt from "bcryptjs";

export const RolesEnum = Object.freeze({
    USER: 'U',
    ADMIN: 'A',
    PERIODISTA: 'P'
});


export class User {

    static #getByUsernameStmt = null;
    static #insertStmt = null;
    static #updateStmt = null;
    static #getByIdStmt = null;
    static #countofUserSmt = null;
    static #getAllUsersStmt = null;
    static #getSearchedListGamesAscStmt = null;
    static #getSearchedListGamesDescStmt = null;
    static #deleteUser = null;
    #id;
    #username;
    bio;
    #password;
    profile_picture;
    user_type;

    constructor(username, bio, password, profile_picture, user_type, id) {
        this.#username = username;
        this.bio = bio;
        this.#password = password;
        this.profile_picture = profile_picture;
        this.#id = id;
        this._username = username;
        this._user_type = user_type;
        this._id = id;
    }

    set password(newPassword) {

        // XXX: En el ej3 / P3 lo cambiaremos para usar async / await o Promises
        this.#password = bcrypt.hashSync(newPassword);
    }

    get bio() {
        return this.bio;
    }

    get profile_picture() {
        return this.profile_picture;
    }

    static initStatements(db) {
        if (this.#getByUsernameStmt !== null) return;

        this.#deleteUser = db.prepare('DELETE FROM user WHERE id=@id');
        this.#countofUserSmt = db.prepare('SELECT COUNT(*) AS count FROM user WHERE username = @username');
        this.#getByUsernameStmt = db.prepare('SELECT * FROM user WHERE username = @username');
        this.#getByIdStmt = db.prepare('SELECT * FROM user WHERE id = @id');
        this.#insertStmt = db.prepare('INSERT INTO user(username, bio, password,  profile_picture, user_type) VALUES (@username, @bio, @password, @profile_picture, @user_type)');
        this.#updateStmt = db.prepare('UPDATE user SET username = @username, bio=@bio, password = @password,  profile_picture=@profile_picture, user_type=@user_type WHERE id = @id');
        this.#getAllUsersStmt = db.prepare('SELECT * FROM user');
        this.#getSearchedListGamesAscStmt = db.prepare(`SELECT * FROM user WHERE username LIKE @username ORDER BY 
                                                            CASE 
                                                                WHEN @orderBy = 'title' THEN username
                                                                WHEN @orderBy = 'Type' THEN user_type
                                                                ELSE id
                                                             END 
                                                             ASC
                                                         LIMIT @number OFFSET @offset`);
        this.#getSearchedListGamesDescStmt = db.prepare(`SELECT * FROM user WHERE username LIKE @username ORDER BY 
                                                            CASE 
                                                                WHEN @orderBy = 'title' THEN username
                                                                WHEN @orderBy = 'Type' THEN user_type
                                                                ELSE id
                                                             END 
                                                             DESC
                                                         LIMIT @number OFFSET @offset`);

    }

    static getUserList() {
        const userList = this.#getAllUsersStmt.all();
        if (userList === undefined) throw new userNotFound(userList);

        return userList;
    }

    static getSearchedUserList(name, order, order_dir, number, offset) {
        if (number === undefined) number = 20;
        if (offset === undefined) offset = 0;

        const searchedTitle = `%${name}%`;
        let userList;
        if (order_dir === 'ASC')
            userList = this.#getSearchedListGamesAscStmt.all({username: searchedTitle, orderBy: order, number, offset});
        else
            userList = this.#getSearchedListGamesDescStmt.all({
                username: searchedTitle,
                orderBy: order,
                number,
                offset
            });

        if (userList === undefined) throw new userNotFound(userList);

        return userList;
    }

    static getUserByUsername(username) {

        const user = this.#getByUsernameStmt.get({username});
        if (user === undefined) throw new userNotFound(username);
        const {bio, password, profile_picture, user_type, id} = user;

        return new User(username, bio, password, profile_picture, user_type, id);
    }

    static getUserByID(id) {
        const user = this.#getByIdStmt.get({id});
        if (user == undefined) throw new userNotFound(id);
        const {username, bio, password, profile_picture, user_type} = user;
        return new User(username, bio, password, profile_picture, user_type);
    }

    static ExistingUsers(username) {
        const numberOfUser = this.#countofUserSmt.get({username});
        return numberOfUser;
    }

    static #insert(user) {

        let result = null;
        try {

            const username = user.#username;
            const password = user.#password;
            const bio = user.bio;
            const user_type = user.user_type;
            const profile_picture = user.profile_picture;
            const datos = {username, bio, password, profile_picture, user_type};


            const counterUser = this.ExistingUsers(username);
            if (counterUser && counterUser.count > 0) {
                throw new userAlreadyExists
            }

            result = this.#insertStmt.run(datos);
            user.#id = result.lastInsertRowid
        } catch (e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
            throw new userAlreadyExists(username);
        }
        return user;
    }

    static #update(user) {
        const username = user.#username;

        const bio = user.bio;
        const password = user.#password;
        const profile_picture = user.profile_picture;
        const user_type = user.user_type;
        const datos = {username, bio, password, profile_picture, user_type};

        return user;
    }

    static register(username, password, userValue) {
        const cryptPass = bcrypt.hashSync(password);
        let user = new User(username, null, cryptPass, null, userValue, 0);

        user = this.#insert(user);
        return user;
    }

    static login(username, password) {
        let user = null;
        try {
            user = this.getUserByUsername(username);

        } catch (e) {
            throw new userOPasswordNoValido(username, {cause: e});
        }
        // XXX: En el ej3 / P3 lo cambiaremos para usar async / await o Promises
        if (!bcrypt.compareSync(password, user.#password)) throw new userOPasswordNoValido(password);

        return user;
    }

    static delete(username) {
        let user = null;
        try {
            user = this.getUserByUsername(username);

        } catch (e) {
            throw new userOPasswordNoValido(username, {cause: e});
        }
        const id = user.#id;
        console.log(user);
        this.#deleteUser.run({id});


    }

    static initStatements(db) {
        if (this.#getByUsernameStmt !== null) return;

        this.#getByUsernameStmt = db.prepare('SELECT * FROM user WHERE username = @username');
        this.#getByIdStmt = db.prepare('SELECT * FROM user WHERE id = @id');
        this.#insertStmt = db.prepare('INSERT INTO user(username, bio, password,  profile_picture, user_type) VALUES (@username, @bio, @password, @profile_picture, @user_type)');
        this.#updateStmt = db.prepare('UPDATE user SET username = @username, bio=@bio, password = @password,  profile_picture=@profile_picture, user_type=@user_type WHERE id = @id');
    }

    static getUserByUsername(username) {

        const user = this.#getByUsernameStmt.get({username});
        if (user === undefined) throw new userNotFound(username);
        const {bio, password, profile_picture, user_type} = user;

        return new User(username, bio, password, profile_picture, user_type);
    }

    static register(username, password) {
        let user = null;
        user = new User(username, null, password, null, RolesEnum.USER, 0);
        user = this.#insert(user);
        return user;
    }

    static login(username, password) {
        let user = null;
        try {
            user = this.getUserByUsername(username);
        } catch (e) {
            throw new userOPasswordNoValido(username, {cause: e});
        }

        // XXX: En el ej3 / P3 lo cambiaremos para usar async / await o Promises
        if ( ! bcrypt.compareSync(password, user.#password) ) throw new userOPasswordNoValido(password);

        return user;
    }

    persist() {
        if (this.#id === null) return user.#insert(this);
        return user.#update(this);
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get user_type() {
        return this._user_type;
    }

    set user_type(value) {
        this._user_type = value;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }
}

export class userNotFound extends Error {
    /**
     *
     * @param {string} username
     * @param {ErrorOptions} [options]
     */
    constructor(username, options) {
        super(`user no encontrado: ${username}`, options);
        this.name = 'userNotFou';
    }
}

export class userOPasswordNoValido extends Error {
    /**
     *
     * @param {string} username
     * @param {ErrorOptions} [options]
     */
    constructor(username, options) {
        super(`user o password no válido: ${username}`, options);
        this.name = 'userOPasswordNoValido';
    }
}


export class userAlreadyExists extends Error {
    /**
     *
     * @param {string} username
     * @param {ErrorOptions} [options]
     */
    constructor(username, options) {
        super(`user ya existe: ${username}`, options);
        this.name = 'userAlreadyExists';
    }
}

export class userNotRegistered extends Error {
    /**
     *
     * @param {string} username
     * @param {ErrorOptions} [options]
     */
    constructor(username, options) {
        super(`Something happened, try again later`, options);
        this.name = 'userNotRegistered';
    }
}
