const fs = require('fs');
const jsonPosts = fs.readFileSync('./server/data/posts.json');
const photoPosts = JSON.parse(jsonPosts);
photoPosts.forEach(function(item){
    item.createdAt = new Date(item.createdAt);
});
const workingWithPhotoposts = {
    getPhotoPosts: function(skip = 0, top = 10, filterConfig) {
        const array = [];

        photoPosts.sort((a, b) => {return b.createdAt - a.createdAt;});
        if (Object.keys(filterConfig).length === 0) {
            return photoPosts.slice(+skip, +skip + +top);
        }
        if(filterConfig.author) {
            for (let i = 0; i < photoPosts.length; i++) {
                if(photoPosts[i].author === filterConfig.author) {
                    array.push(photoPosts[i]);
                }
            }
        }
        if(filterConfig.createdAt) {
            filterConfig.createdAt = new Date(filterConfig.createdAt);
            for (let i = 0; i < photoPosts.length; i++) {
                if (datesEqual(photoPosts[i], filterConfig)) {
                    array.push(photoPosts[i]);
                }
            }
        }

        if(filterConfig.hashTags) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (containsHashTag(photoPosts[i], filterConfig.hashTags)) {
                    array.push(photoPosts[i]);
                }
            }
        }
        for (let i = 0; i < array.length; i++) {
            if((filterConfig.author && array[i].author !== filterConfig.author) ||
                (filterConfig.createdAt &&!datesEqual(array[i], filterConfig)) ||
                (filterConfig.hashTags && !containsHashTag(array[i], filterConfig.hashTags))){
                array.splice(i, 1);
                i--;
            }
        }
        for(let i = 0; i < array.length; i++){
            for(let j = i; j < array.length; j++){
                if (i === j) continue;
                if(array[i].id === array[j].id){
                    array.splice(j, 1);
                    j--;
                }
            }
        }
        if(Object.keys(array).length === 0){
            return false;
        }

        return array.slice(skip, skip + top);
    },

    getPhotoPost: function(idParam) {
        for(let i = 0; i < photoPosts.length; i++){
            if (!photoPosts[i].id.localeCompare(idParam)){
                return photoPosts[i];
            }
        }
        return false;
    },

    addPhotoPost: function(newPost) {
        newPost.createdAt = new Date(newPost.createdAt);
        if (!validatePhotoPost(newPost)){
            return false;
        }
        photoPosts.push(newPost);
        saveToJSON();
        return true;
    },

    editPhotoPost: function(idParam, changes) {
        if(idExists(idParam) &&
            !changes.id &&
            !changes.createdAt &&
            !changes.author
        ) {
            if(changes.description){
                if(changes.description.length < 200){
                    getPost(idParam).description = changes.description;
                }
                else{
                    return false;
                }
            }
            if(changes.photoLink){
                if(notString(changes.photoLink)) {
                    return false;
                }
                getPost(idParam).photoLink = changes.photoLink;
            }
            if(changes.hashTags){
                if(changes.hashTags.some(notString)){
                    return false;
                }
                getPost(idParam).hashTags = changes.hashTags;
                saveToJSON();
                return true;
            }
            saveToJSON();
            return true;
        }
        return false;
    },

    removePhotoPost: function(idParam) {
        if (idExists(idParam)){
            const remIndex =  photoPosts.indexOf(getPost(idParam));
            photoPosts.splice(remIndex, 1);
            saveToJSON();
            return true;
        }
        return false;
    }
};
function getPost (idParam) {
    for(let i = 0; i < photoPosts.length; i++){
        if (!photoPosts[i].id.localeCompare(idParam)){
            return photoPosts[i];
        }
    }
    return false;
}
function validatePhotoPost (postItself){
    for(let i=0; i<photoPosts.length; i++){
        if (!photoPosts[i].id.localeCompare(postItself.id)){
            return false;
        }
    }
    if (postItself.description.length > 200 || !postItself.description || notString(postItself.description)){
        return false;
    }
    if (!postItself.author || notString(postItself.author)){
        return false;
    }
    if (!postItself.createdAt || !(postItself.createdAt instanceof Date)){
        return false;
    }
    if (!postItself.photoLink || notString(postItself.photoLink)){
        return false;
    }
    if(postItself.hashTags.some(notString)){
        return false;
    }
    return true;
}

function saveToJSON(){
    const newData = JSON.stringify(photoPosts, null, 2);
    fs.writeFile('./server/data/posts.json', newData, (err) => {
        if (err) throw err;
    });
}
function notString(s){
    if(typeof s === "string"){
        return false;
    }
    return true;
}

function idExists(someId){
    for(let i = 0; i < photoPosts.length; i++){
        if(!photoPosts[i].id.localeCompare(someId)){
            return true;
        }
    }
    return false;
}

function containsHashTag(obj, hashTag) {
    for(let i = 0; i < obj.hashTags.length; i++){
        if (obj.hashTags[i] === hashTag){
            return true;
        }
    }
    return false;
}

function datesEqual(obj1, obj2) {
    if(obj1.createdAt.getFullYear() === obj2.createdAt.getFullYear() &&
        obj1.createdAt.getMonth() === obj2.createdAt.getMonth() &&
        obj1.createdAt.getDate() === obj2.createdAt.getDate()){
        return true;
    }
    return false;
}
module.exports = workingWithPhotoposts;