"use strict";
const workingWithPhotoposts = (function() {

    const photoPosts = JSON.parse(localStorage.photoPosts);
    photoPosts.forEach(function(item){
        item.createdAt = new Date(item.createdAt);
    });

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        const array = [];
        photoPosts.sort(compareByDate);
        if (!filterConfig) {
            for (let i = skip; i < top + skip; i++) {
                array.push(photoPosts[i]);
            }
            return array;
        }
        if(filterConfig.author) {
            for (let i = 0; i < photoPosts.length; i++) {
                if(photoPosts[i].author === filterConfig.author) {
                    array.push(photoPosts[i]);
                }
            }
        }
        if(filterConfig.createdAt) {
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
        if(skip !== 0) {
            return array.slice(skip, skip + top)
        }
        return array.slice(0, top);
    }

    function getPhotoPost(idParam) {
        for(let i = 0; i < photoPosts.length; i++){
            if (!photoPosts[i].id.localeCompare(idParam)){
                return photoPosts[i];
            }
        }
        return false;
    }

    function validatePhotoPost(postItself){
        for(let i=0; i<photoPosts.length; i++){
            if (photoPosts[i].id === postItself.id){
                console.log("false");
                console.log("id");
                return false;
            }
        }
        if (postItself.description.length > 200 || !postItself.description || notString(postItself.description)){
            console.log("false");
            console.log("descr");
            return false;
        }

        if (!postItself.author || notString(postItself.author)){
            console.log("false");
            console.log("auth");
            return false;
        }

        if (!postItself.createdAt || !(postItself.createdAt instanceof Date))
        {
            console.log("false");
            console.log("createdAt");
            return false;
        }

        if (!postItself.photoLink || notString(postItself.photoLink)){
            console.log("false");
            console.log("photoLink");
            return false;
        }

        if(postItself.hashTags.some(notString)){
            console.log("false");
            console.log("hashtags");
            return false;
        }
        console.log("true");
        return true;
    }

    function addPhotoPost(newPost) {
        if (!validatePhotoPost(newPost))
            return false;
        return true;
    }

    function editPhotoPost(idParam, changes) {
        if(idExists(idParam) &&
           !changes.id &&
           !changes.createdAt &&
           !changes.author) {
            if(changes.description){
                if(changes.description.length < 200){
                    getPhotoPost(idParam).description = changes.description;
                }
                else return false;
            }
            if(changes.photoLink){
                if(notString(changes.photoLink)) {
                    return false;
                }
                getPhotoPost(idParam).photoLink = changes.photoLink;
            }
            if(changes.hashTags){
                if(changes.hashTags.some(notString)){
                    return false;
                }
                getPhotoPost(idParam).hashTags = changes.hashTags;
                return true;
            }
            else return true;
        }
        return false;
    }

    function removePhotoPost(idParam) {
        if (idExists(idParam)){
           const remIndex =  photoPosts.indexOf(getPhotoPost(idParam));
           photoPosts.splice(remIndex, 1);
           localStorage.photoPosts = JSON.stringify(photoPosts);
           return true;
        }
        return false;
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

    function compareByDate(a, b){
        return b.createdAt.getTime() - a.createdAt.getTime();
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

    return {
        getPhotoPosts,
        getPhotoPost,
        validatePhotoPost,
        addPhotoPost,
        editPhotoPost,
        removePhotoPost
    }
})();