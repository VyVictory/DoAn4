// This file exports data models used in the application, defining the structure of the data and any associated methods.

export class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

export class Post {
    constructor(id, title, content, authorId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }
}

// Additional models can be defined here as needed.