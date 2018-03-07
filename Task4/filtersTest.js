console.log("all photoposts: ");
console.log(workingWithPhotoposts.getPhotoPosts(0, 20));
console.log("Filter: author Kate Zhukova");
const filterObject = {
    author: "Kate Zhukova"
};
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, filterObject));
console.log("Filter: Date(\"2018-03-03T06:45:34\"), ");
const dateFilterObject = {
    createdAt: new Date("2018-02-17T06:45:34")
};
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, dateFilterObject));
console.log("Filter: Date(\"2018-03-03T06:45:34\"), skip 2, show 3 ");
console.log(workingWithPhotoposts.getPhotoPosts(2, 3, dateFilterObject));
console.log("Filter: hashtag wisdom ");
const hashtagFilterObject = {
    hashTags: "wisdom"
};
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, hashtagFilterObject));
console.log("Filter: author Kate Zhukova hashtag wisdom ");
filterObject.hashTags = "wisdom";
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, filterObject));
console.log("Filter: author Kate Zhukova date: Mar. 03, 2018 hashtag wisdom ");
filterObject.createdAt = new Date("2018-03-03T19:12:34");
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, filterObject));
console.log("Filter: Date(\"2018-03-03T06:45:34\"), hashtag: creativity ");
dateFilterObject.hashTags = "creativity";
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, dateFilterObject));
console.log("Filter: author Kira Bondareva Date(\"2018-02-13T09:12:34\")");
const authorDateFilter = {
    author: "Kira Bondareva",
    createdAt: new Date("2018-02-13T09:12:34")
};
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, authorDateFilter));
/*
console.log("Filter: Kate Zhukova, yes, Date(\"2018-03-03T06:45:34\"), ");
filterObject.hashTags = "yes";
filterObject.createdAt = new Date("2018-03-03T06:45:34");
console.log(workingWithPhotoposts.getPhotoPosts(0, 20, filterObject));*/
