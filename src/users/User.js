
export const RolesEnum = Object.freeze({
    USER: 'U',
    ADMIN: 'A',
    PERIODISTA:'P'
});

export class User {
    static #getByUsernameStmt = null;
    static #insertStmt = null;
    static #updateStmt = null;

    static initStatements(db) {
        if (this.#getByUsernameStmt !== null) return;

        this.#getByUsernameStmt = db.prepare('SELECT * FROM user WHERE username = @username');
        this.#insertStmt = db.prepare('INSERT INTO user(username, bio, password,  profile_picture, user_type) VALUES (@username, @bio, @password, @profile_picture, @user_type)');
        this.#updateStmt = db.prepare('UPDATE user SET username = @username, bio=@bio, password = @password,  profile_picture=@profile_picture, user_type=@user_type WHERE id = @id');
    }
    static postNewUser(username) {
        const user = this.#getByUsernameStmt.get({ username });
        if (user === undefined) throw new userNotFound(username);
        const { bio, password,  profile_picture, user_type } = user;

        return new User(username, bio, password,  profile_picture, user_type);
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
            const bio= user.bio;
            const password = user.#password;
            const  profile_picture=user.profile_picture;
            const user_type = user.#user_type;
            const datos = {username, bio, password, profile_picture, user_type};

            result = this.#insertStmt.run(datos);

            user.#id = result.lastInsertRowid;
        } catch(e) { // SqliteError: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#class-sqliteerror
            if (e.code === 'SQLITE_CONSTRAINT') {
                throw new userAlreadyExists(user.#username);
            }
            throw new ErrorDatos('No se ha insertado el user', { cause: e });
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

        const result = this.#updateStmt.run(datos);
        if (result.changes === 0) throw new userNotFound(username);

        return user;
    }
    static register(username, password) {
        let user = null;
            user = this.getUserByUsername(username);
            if(user !== null) throw new userAlreadyExists(username); //Si el usuario ya existe, entonces no puedes registrarlo
            else{
                user = new User(username,null,password,null,USER,null); //Queda hacer un sistema de asignacion de ids
                this.#insert(user);
            }
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
    bio;
    #password;
     profile_picture;
    #user_type;
    

    constructor(username, bio, password,  profile_picture, user_type = RolesEnum.user, id = null) {
        this.#username = username;
        this.bio=bio;
        this.#password = password;
        this.profile_picture= profile_picture;
        this.#user_type=user_type;
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