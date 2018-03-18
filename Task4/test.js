console.log("all photoposts: ");
console.log(workingWithPhotoposts.getPhotoPosts(0, 20));

console.log("Filter: Kate Zhukova");
let filterObject = {
    author: "Kate Zhukova"
};
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, filterObject));
console.log("Filter: Kate Zhukova, yes, Date(\"2018-03-03T06:45:34\"), ");
filterObject.hashTags = "yes";
filterObject.createdAt = new Date("2018-03-03T06:45:34");
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, filterObject));
console.log("Filter: hashtag wisdom, first from 1st 5 posts");
let filterHashtag = {
    hashTags: "wisdom"
};
console.log(workingWithPhotoposts.getPhotoPosts(1, 5, filterHashtag));
console.log("Filter:  wisdom, skip first 10, show 5 posts: (we have only 12 posts fitting this criteria)");
console.log(workingWithPhotoposts.getPhotoPosts(10, 5, filterHashtag));

console.log("Get 13th photopost: ");
console.log(workingWithPhotoposts.getPhotoPost(13));
console.log("Get 23th photopost:    (doesn't exist)");
console.log(workingWithPhotoposts.getPhotoPost(23));

console.log("Validation. Valid post: ");
const valid = {
    id: "33",
    description: "Be with those who help your being.",
    createdAt: new Date("2018-02-14T13:27:19"),
    author: "Kate Zhukova",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["psychology", "wisdom", "neighbourhood"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingWithPhotoposts.validatePhotoPost(valid));
console.log("Validation. Non-valid post (id already exists) : ");
let nonValid = {
    id: "17",
    description: "Be with those who help your being.",
    createdAt: new Date("2018-02-14T13:27:19"),
    author: "Kate Zhukova",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["psychology", "wisdom", "neighbourhood"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingWithPhotoposts.validatePhotoPost(nonValid));
console.log("Validation. Non-valid post (incorrect hashtags) : ");
nonValid.hashTags = [88, "wisdom", "neighbourhood"];
console.log(workingWithPhotoposts.validatePhotoPost(nonValid));
console.log("Validation. Non-valid post (too large description) : ");
nonValid.description = "Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols." +
    "Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.Here we have 24 symbols.";
console.log(workingWithPhotoposts.validatePhotoPost(nonValid));

console.log("Add correct photopost: ");
const niceToAdd = {
    id: "35",
    description: "Every day may not be good, but there is something good in every day.",
    createdAt: new Date("2018-02-19T22:18:38"),
    author: "Natalie Paholenko",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["wisdom"],
    likes: ["Wonder", "Zayn", "Lauv", "Sia", "Alt-J"]
};
console.log(workingWithPhotoposts.addPhotoPost(niceToAdd));
console.log("Add invalid photopost: (link is not a string) ");
const postInvalid = {
    id: "36",
    description: "Don't be impressed by money, followers, degrees and titles. " +
                            "Be impressed by kindness, integrity, humility and generosity",
    createdAt: new Date("2018-01-13T14:11:27"),
    author: "Artyom Shishow",
    photoLink: 3456678,
    hashTags: ["wisdom", "qualities"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingWithPhotoposts.addPhotoPost(postInvalid));
console.log("Add invalid photopost: (createAt is not Date) ");
const anotherInvalid = {
    id: "579",
    description: "Don't apologize for feeling something or a lot.",
    createdAt: "Today",
    author: "Wise user",
    photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
    hashTags: ["wisdom", "relationship"],
    likes: ["Vasya", "Petya", "Kolya"]
};
console.log(workingWithPhotoposts.addPhotoPost(anotherInvalid));

console.log("Change description and photolink of the 1st photopost correctly: ");
console.log("Before: ");
console.log(workingWithPhotoposts.getPhotoPost(1));
const permittedChanges = {
        description: "Don't apologize for feeling something or a lot.",
        photoLink: "Let this be some link"
};
console.log("Result of edit: ");
console.log(workingWithPhotoposts.editPhotoPost(1, permittedChanges));
console.log(workingWithPhotoposts.getPhotoPost(1));
console.log("Change id of the 3rd photo ");
console.log("Before: ");
console.log(workingWithPhotoposts.getPhotoPost(3));
const forbiddenChanges = {
    id: 567
};
console.log("Result of edit: ");
console.log(workingWithPhotoposts.editPhotoPost(3, forbiddenChanges));
console.log(workingWithPhotoposts.getPhotoPost(3));

console.log("Remove photopost with id 8: ");
console.log("Here getPhotoPost(8) will work: ");
console.log(workingWithPhotoposts.getPhotoPost(8));
console.log("Here we remove the post: ");
console.log(workingWithPhotoposts.removePhotoPost(8));
console.log("And now look at getPhotoPost(8) call: ");
console.log(workingWithPhotoposts.getPhotoPost(8));

console.log("And now we'll try to remove photopost with id 100500: ");
console.log(workingWithPhotoposts.removePhotoPost(100500));
console.log("That's it :) ");




