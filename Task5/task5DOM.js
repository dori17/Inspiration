"use strict";
const workingWithDOM = (function() {

    let posts = document.querySelector(".container-inner");
    let user = "Kira Bondareva";

    function showUser(){
        let userField = document.getElementsByClassName("icons-container");
        userField[0].innerHTML = "<i class=\"fa fa-camera-retro\"></i>" +
            "\t<i class=\"fa fa-sign-out\"><span> " + user.toString() + " </span></i>";
    }

    function createPost(post){
        let postWithIcons = document.createElement("div");
        postWithIcons.className = "post-with-icons";
        let postItself = document.createElement("div");
        postItself.className = "post";
        let postPhoto = document.createElement("img");
        postPhoto.className = "post-with-icons post post-photo";
        postPhoto.src = post.photoLink;
        postPhoto.setAttribute("height", "50%");
        postPhoto.setAttribute("width", "50%");
        postPhoto.setAttribute("alt", "user photo");
        postItself.appendChild(postPhoto);
        let postText = document.createElement("div");
        postText.className = "post-text";
        let postDescription = document.createElement("p");
        postDescription.textContent = post.description;
        postText.appendChild(postDescription);
        let postHashtags = document.createElement("p");
        for(let i = 0; i < post.hashTags.length; i++){
            postHashtags.textContent += " #" + post.hashTags[i];
        }
        postText.appendChild(postHashtags);
        postItself.appendChild(postText);
        postWithIcons.appendChild(postItself);
        let icons = document.createElement("div");
        icons.className = "icons";
        let userInfo = document.createElement("span");
        userInfo.textContent = post.author + " " + post.createdAt.toLocaleString();
        icons.appendChild(userInfo);
        let likeButton = document.createElement("button");
        likeButton.setAttribute("type", "submit");
        likeButton.textContent = "Like it!";
        for(let i = 0; i < post.likes.length; i++){
            if(post.likes[i] === user){
                likeButton.textContent = "You like it!";
            }
        }
        icons.appendChild(likeButton);
        if(user === post.author){
            let editIcon = document.createElement("i");
            editIcon.className = "fa fa-edit";
            editIcon.textContent = "Edit";
            icons.appendChild(editIcon);
            let deleteIcon = document.createElement("i");
            deleteIcon.className = "fa fa-times-circle";
            deleteIcon.textContent = "Delete";
            icons.appendChild(deleteIcon);
        }
        postWithIcons.appendChild(icons);
        postWithIcons.id = post.id;
        return postWithIcons;
    }

    function showAll (photoPosts) {
        for(let i = 0; i<photoPosts.length; i++) {
            posts.appendChild(createPost(photoPosts[i]));
        }
    }

    function addPhotoPost(newPost) {
        posts.insertBefore(createPost(newPost), posts.firstChild);
    }

    function editPhotoPost(id, changes){
        if(document.getElementById(id)){
            let currentDom = document.getElementById(id);
            let current = workingWithPhotoposts.getPhotoPost(id);
            let photoWithDescription = currentDom.childNodes[0];
            let postPhoto = photoWithDescription.childNodes[0];
            if(changes.photoLink !== undefined){
                postPhoto.setAttribute("src", changes.photoLink);
            }
            let postDescription = photoWithDescription.childNodes[1];
            let description = postDescription.childNodes[0];
            if(changes.description !== undefined) {
                description.textContent = changes.description;
            }
            let hashtags = postDescription.childNodes[1];
            if(changes.hashTags !== undefined) {
                hashtags.textContent = "";
                for(let i = 0; i < changes.hashTags.length; i++)
                    hashtags.textContent += "#" + changes.hashTags[i];
            }
        }
    }

    function deletePhotoPost(id){
        if(document.getElementById(id)){
            posts.removeChild(document.getElementById(id));
        }
    }



    return{
        showUser,
        createPost,
        showAll,
        addPhotoPost,
        editPhotoPost,
        deletePhotoPost
    }
})();

function showPhotoPosts(skip, top, filterConfig){
    let photoPosts = workingWithPhotoposts.getPhotoPosts(skip, top, filterConfig);
    workingWithDOM.showAll(photoPosts);
}

function addPhotoPost(newPost) {
    if(workingWithPhotoposts.addPhotoPost(newPost)){
        workingWithDOM.addPhotoPost(newPost);
    }
}

function editPhotoPost(id, changes) {
    if(workingWithPhotoposts.editPhotoPost(id, changes)){
        workingWithDOM.editPhotoPost(id, changes);
    }
}

function removePhotoPost(id){
    if(workingWithPhotoposts.removePhotoPost(id)){
        workingWithDOM.deletePhotoPost(id);
    }
}

