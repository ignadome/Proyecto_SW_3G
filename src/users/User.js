
export const RolesEnum = Object.freeze({
    USER: 'U',
    ADMIN: 'A',
    PERIODISTA:'P'
});

export class User {

    static #getByUsernameStmt = null;
    static #insertStmt = null;
    static #updateStmt = null;
    static #getByIdStmt = null;
    static initStatements(db) {
        if (this.#getByUsernameStmt !== null) return;

        this.#getByUsernameStmt = db.prepare('SELECT * FROM user WHERE username = @username');
        this.#getByIdStmt = db.prepare('SELECT * FROM user WHERE id = @id');
        this.#insertStmt = db.prepare('INSERT INTO user(username, bio, password,  profile_picture, user_type) VALUES (@username, @bio, @password, @profile_picture, @user_type)');
        this.#updateStmt = db.prepare('UPDATE user SET username = @username, bio=@bio, password = @password,  profile_picture=@profile_picture, user_type=@user_type WHERE id = @id');
    }
    static getUserByUsername(username) {
       
        const user = this.#getByUsernameStmt.get({ username });
        if (user === undefined) throw new userNotFound(username);
        const { bio, password,  profile_picture, user_type } = user;

        return new User(username, bio, password,  profile_picture, user_type);
    }
     
    static #insert(user) {

        let result = null;
        try {
            const username = user.#username;
            const password = user.#password;
            const bio = user.#bio;
            const user_type = user.#user_type;
            const profile_picture = user.#profile_picture;
            const datos = {username,bio, password,profile_picture, user_type};
            result = this.#insertStmt.run(datos);
            user.#id = result.lastInsertRowid
        } catch(e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new userAlreadyExists(user.#username);
            }
            throw userAlreadyExists();
        }
        return user;
    }

    static #update(user) {
        const username = user.#username;

            const bio= user.bio;
            const password = user.#password;
            const  profile_picture=user.profile_picture;
            const user_type = user.#user_type;
            const datos = {username, bio, password,  profile_picture, user_type};

        return user;
    }
    static register(username, password) {
        let user = null;
            user = new User(username,null,password,null,RolesEnum.USER,0);
            user = this.#insert(user);
        return user;
    }

    static login(username, password) {
        let user = null;
        try {
            user = this.getUserByUsername(username);
        } catch (e) {
            throw new userOPasswordNoValido(username, { cause: e });
        }

        // XXX: En el ej3 / P3 lo cambiaremos para usar async / await o Promises
        if ( password!== user.#password ) throw new userOPasswordNoValido(username);

        return user;
    }

    #id;
    #username;
    #bio;
    #password;
    #profile_picture;
    #user_type;

    constructor(username,bio,password,profile_picture,user_type,id){
        this.#username = username;
        this.#bio = bio;
        this.#password = password;
        this.#profile_picture = profile_picture;
        this.#user_type = user_type;
        this.#id = id;
    }

    get id() {
        return this.#id;
    }


    /*set password(nuevoPassword) {
        // XXX: En el ej3 / P3 lo cambiaremos para usar async / await o Promises
        this.#password = bcrypt.hashSync(nuevoPassword);
    }
*/
    get username() {
        return this.#username;
    }
    set password(newPassword) {
        console.log("hola");
        // XXX: En el ej3 / P3 lo cambiaremos para usar async / await o Promises
        this.#password = bcrypt.hashSync(nuevoPassword);
    }
    get bio()
    {
        return this.bio;
    }

    get  profile_picture()
    {
        return this.profile_picture;
    }

    persist() {
        if (this.#id === null) return user.#insert(this);
        return user.#update(this);
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