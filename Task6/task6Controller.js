if(document.getElementsByClassName("fa-sign-in").length){
    const btnSignIn = document.getElementsByClassName("fa-sign-in");
    btnSignIn[0].addEventListener("click", showSignIn);
}

const logo = document.getElementsByClassName("logo")[0];
logo.addEventListener("click", logoShowMainPage);

if(document.getElementsByClassName("fa-sign-out").length){
    const btnSignOut = document.getElementsByClassName("fa-sign-out");
    btnSignOut[0].addEventListener("click", showSignOut);
}

if(document.getElementsByClassName("fa-camera-retro").length){
    const btnCreatePost = document.getElementsByClassName("fa-camera-retro");
    btnCreatePost[0].addEventListener("click", showCreatePost);
}

let filterConfig = {};
const form = document.forms.filters;
form.elements[0].addEventListener("change", filterConfigAuthor);
form.elements[1].addEventListener("change", filterConfigDate);
form.elements[2].addEventListener("change", filterConfigHashtags)

function filterConfigAuthor(){
    filterConfig.author = form.elements[0].value;
}

function filterConfigDate(){
    filterConfig.createdAt = new Date(form.elements[1].value);
}

function filterConfigHashtags(){
    filterConfig.hashTags = form.elements[2].value;
    filterConfig.hashTags = filterConfig.hashTags.substr(1, filterConfig.hashTags.length - 1)
}

const filters = document.getElementsByClassName("filters")[0];
const applyFiltersBtn = filters.getElementsByTagName("button")[0];
applyFiltersBtn.addEventListener("click", applyFilters);

function applyFilters(){
    removeContent();
    loadedPosts = 10;
    const posts = JSON.parse(localStorage.photoPosts);
    const containerInner = document.getElementsByClassName("container-inner");
    while(containerInner[0].hasChildNodes()){
        containerInner[0].removeChild(containerInner[0].childNodes[0]);
    }
    const loadBtn = document.getElementById("load-more");
    if(workingWithPhotoposts.getPhotoPosts(0, 10, filterConfig).length){
        workingWithDOM.showAll(0, 10, filterConfig);
        if(workingWithPhotoposts.getPhotoPosts(0, posts.length, filterConfig).length > 10){
            loadBtn.style.display = "block";
        }
        else{
            loadBtn.style.display = "none";
        }
    }
    else{
        removeContent();
        loadBtn.style.display = "none";
        view.noPostsFound();
        const noPostsFoundDiv = document.getElementsByClassName("no-posts-div")[0];
        const okBtn = noPostsFoundDiv.getElementsByTagName("button")[0];
        okBtn.addEventListener("click", noPostsFound);
    }
}

function noPostsFound(){
    removeContent();
    showMainPage();
    clearFilter();
    filterConfig = {};
}

function clearFilter(){
    const form = document.forms.filters;
    form.elements[0].value = "";
    form.elements[1].value = "";
    form.elements[2].value = "";

}

const btnLoadMore = document.getElementById("load-more");
btnLoadMore.addEventListener("click", loadMore);
let loadedPosts = 10;

const containerInner = document.getElementsByClassName("container-inner")[0];
containerInner.addEventListener("click", like);
containerInner.addEventListener("click", showEditPost);
containerInner.addEventListener("click", deletePost);

function loadMore(){
    const length = JSON.parse(localStorage.photoPosts).length;
    console.log(workingWithPhotoposts.getPhotoPosts(0, length, filterConfig));
    let posts;
    if(!Object.keys(filterConfig).length){
        posts = JSON.parse(localStorage.photoPosts);
    }
    else{
        posts = workingWithPhotoposts.getPhotoPosts(0, length, filterConfig);
    }
    if(posts.length >= loadedPosts + 10){
        if(!Object.keys(filterConfig).length){
            workingWithDOM.showAll(loadedPosts, 10);
        }
        else{
            workingWithDOM.showAll(loadedPosts, 10, filterConfig);
        }
        loadedPosts+=10;
    }
    else{
        if(!Object.keys(filterConfig).length){
            workingWithDOM.showAll(loadedPosts, posts.length - loadedPosts);
        }
        else{
            workingWithDOM.showAll(loadedPosts, posts.length - loadedPosts, filterConfig);
        }
        loadedPosts += length - loadedPosts;
    }
    if(loadedPosts >= posts.length){
        btnLoadMore.style.display = "none";
    }
    console.log(loadedPosts);
    console.log(posts.length);
}

function showSignIn(){
    removeMainPage();
    removeContent();
    clearFilter();
    filterConfig = {};
    view.signInForm();
    const signInBtnsDiv = document.getElementsByClassName("sign-in-buttons");
    const signInBtns = signInBtnsDiv[0].getElementsByTagName("button");
    signInBtns[0].addEventListener("click", signInSubmit);
    signInBtns[1].addEventListener("click",showMainPage);
}

function showSignOut() {
    removeMainPage();
    removeContent();
    clearFilter();
    filterConfig = {};
    view.signOutForm();
    const signOutBtnsDiv = document.getElementsByClassName("sign-out-buttons");
    const signOutBtns = signOutBtnsDiv[0].getElementsByTagName("button");
    signOutBtns[0].addEventListener("click", signOut);
    signOutBtns[1].addEventListener("click",showMainPage);
}

function showCreatePost(){
    removeMainPage();
    removeContent();
    view.createPostForm();
    const createPostBtnsDiv = document.getElementsByClassName("create-post-buttons");
    const createPostBtns = createPostBtnsDiv[0].getElementsByTagName("button");
    createPostBtns[0].addEventListener("click", addNewPost);
    createPostBtns[1].addEventListener("click",showMainPage);
}

function addNewPost(){
    const form = document.forms.create;
    const photoPosts = JSON.parse(localStorage.photoPosts);
    const newPost = {};
    newPost.id = (++localStorage.lastID).toString();
    newPost.description = form.elements[1].value;
    newPost.photoLink = form.elements[0].files[0] ? "images/" + form.elements[0].files[0].name : undefined;
    newPost.hashTags = form.elements[2].value.split("#");
    newPost.hashTags.splice(0,1);
    newPost.author = JSON.parse(localStorage.user).Username;
    newPost.createdAt = new Date();
    newPost.likes = [];
    if(workingWithPhotoposts.addPhotoPost(newPost)){
        photoPosts.push(newPost);
        workingWithDOM.addPhotoPost(newPost);
        workingWithDOM.showAll();
    }
    else{
        removeContent();
        view.noPostsFound();
        const errorMessage = document.getElementsByClassName("no-posts-div")[0];
        errorMessage.childNodes[0].textContent = "Incorrect photopost. Please, be sure that you " +
                                 "choose a photo and write a description (but not longer than 200 symbols)";
        const ok = errorMessage.getElementsByTagName("button")[0];
        ok.addEventListener("click", showCreatePost);
    }
    localStorage.photoPosts = JSON.stringify(photoPosts);

}

function signOut() {
    localStorage.user = JSON.stringify({ Username: '', Password: '' });
    showMainPage();
    workingWithDOM.showUser(JSON.parse(localStorage.user));
    let userField = document.getElementsByClassName("icons-container");
    userField[0].innerHTML = "<i class=\"fa fa-sign-in\"><span>"+ " " + "Sign in" + "</span></i>";
    const btnSignIn = document.getElementsByClassName("fa-sign-in");
    btnSignIn[0].addEventListener("click", showSignIn);
}

function signInSubmit(){
    let user={};
    user.Username = document.getElementById("login-input").value;
    user.Password = document.getElementById("password-input").value;
    if (userValid(user)){
        localStorage.user = JSON.stringify(user);
        workingWithDOM.showUser(user);
        workingWithDOM.user = user;
        document.getElementsByClassName("sign-in-form")[0].style.display = "none";
        workingWithDOM.showAll();
        document.getElementsByClassName("filters")[0].style.display = "block";
        document.getElementById("load-more").style.display = "block";
        const btnSignOut = document.getElementsByClassName("fa-sign-out");
        btnSignOut[0].addEventListener("click", showSignOut);
        const btnCreatePost = document.getElementsByClassName("fa-camera-retro");
        btnCreatePost[0].addEventListener("click", showCreatePost);
    }
    else
        wrongUser();
}

function userValid(user) {
    return JSON.parse(localStorage.users).find((el) => {
        return el.Username === user.Username && el.Password === user.Password;
    }) ? true : false
}

function wrongUser(){
    removeContent();
    view.wrongUserForm();
    const wrongUserBtns = document.getElementsByClassName("wrong-user-buttons");
    const tryAgainBtn = wrongUserBtns[0].getElementsByTagName("button")[0];
    tryAgainBtn.addEventListener("click", authorizationTryAgain);
    const goToMainBtn = wrongUserBtns[0].getElementsByTagName("button")[1];
    goToMainBtn.addEventListener("click", showMainPage);
}

function authorizationTryAgain(){
    removeContent();
    showSignIn();
}

function like(){
    if(event.target.parentNode.className === "icons" && event.target.tagName === "BUTTON"){
        if(JSON.parse(localStorage.user).Username === ""){
            likeDenied();
            const btnsDiv = document.getElementsByClassName("like-denied-buttons");
            const btns = btnsDiv[0].getElementsByTagName("button");
            btns[0].addEventListener("click", showSignIn);
            btns[1].addEventListener("click",showMainPage);
            return;
        }
        let target = event.target;
        while(target!==document.getElementsByClassName("container-inner")[0]){
            if(target.tagName === "BUTTON"){
                if(target.textContent === "Like it!"){
                    target.textContent = "You like it!";
                    let postElement = target;
                    while(postElement.className !== "post-with-icons"){
                        postElement = postElement.parentNode;
                    }
                    const postId = postElement.id;
                    let count = -1;
                    JSON.parse(localStorage.photoPosts).forEach(function(item){
                        count++;
                        if(JSON.parse(item.id) === Number.parseInt(postId)){
                            item.likes.push(JSON.parse(localStorage.user).Username);
                            const ph = JSON.parse(localStorage.photoPosts);
                            ph.splice(count, 1);
                            ph.push(item);
                            localStorage.photoPosts = JSON.stringify(ph);
                        }
                    });
                }
                else if (target.textContent === "You like it!"){
                    target.textContent = "Like it!"

                    let postElement = target;
                    while(postElement.className !== "post-with-icons"){
                        postElement = postElement.parentNode;
                    }
                    const postId = postElement.id;
                    let count = -1;
                    JSON.parse(localStorage.photoPosts).forEach(function(item){
                        count++;
                        if(JSON.parse(item.id) === Number.parseInt(postId)){
                            item.likes.pop(JSON.parse(localStorage.user).Username);
                            const ph = JSON.parse(localStorage.photoPosts);
                            ph.splice(count, 1);
                            ph.push(item);
                            localStorage.photoPosts = JSON.stringify(ph);
                        }
                    });
                }
            }
            target = target.parentNode;
        }
    }
}

function likeDenied(){
    removeMainPage();
    view.likeDeniedForm();

}

let postForEdit;
function showEditPost() {
    if (event.target.className === "fa fa-edit") {
        removeMainPage();
        removeContent();
        view.createPostForm();
        postForEdit = (event.target.parentNode).parentNode.id;
        const div = document.getElementsByClassName("create-post")[0];
        div.childNodes[0].textContent = "Edit your post!";
        const form = document.forms.create;
        const photoLabel = document.getElementsByClassName("create-post-text")[0];
        photoLabel.textContent = "Change photo";
        form.elements[1].value = workingWithPhotoposts.getPhotoPost(postForEdit).description;
        let hashtags = "";
        workingWithPhotoposts.getPhotoPost(postForEdit).hashTags.forEach(function(item){
            hashtags+= "#" + item;
        })
        form.elements[2].value = hashtags;
        const editBtnsDiv = document.getElementsByClassName("create-post-buttons");
        const editPostBtns = editBtnsDiv[0].getElementsByTagName("button");
        editPostBtns[0].addEventListener("click", editPost);
        editPostBtns[0].addEventListener("click", showMainPage);
        editPostBtns[1].addEventListener("click",showMainPage);
    }
}

function editPost(){
    const form = document.forms.create;
    let post = {};
    if(form.elements[0].files[0]){
        post.photoLink = "images/" + form.elements[0].files[0].name;
    }
    post.description = form.elements[1].value;
    post.hashTags = form.elements[2].value.split("#");
    post.hashTags.splice(0,1);
    workingWithPhotoposts.editPhotoPost(postForEdit, post);
    const photoPosts = JSON.parse(localStorage.photoPosts);
    photoPosts.forEach(function(item){
        if(item.id === postForEdit){
            if(post.photoLink){
                item.photoLink = post.photoLink;
            }
            item.description = post.description;
            item.hashTags = post.hashTags;
        }
    });
    localStorage.photoPosts = JSON.stringify(photoPosts);
}

let postForDelete;
function deletePost(){
    if(event.target.className === "fa fa-times-circle"){
        postForDelete = (event.target.parentNode).parentNode.id;
        removeMainPage();
        removeContent();
        view.deletePostForm();
        const deletePostBtnsDiv = document.getElementsByClassName("delete-post-buttons");
        const deletePostBtns = deletePostBtnsDiv[0].getElementsByTagName("button");
        deletePostBtns[0].addEventListener("click", deletePostInfo);
        deletePostBtns[1].addEventListener("click",showMainPage);
    }
}

function deletePostInfo(){
    workingWithDOM.deletePhotoPost(postForDelete);
    workingWithPhotoposts.removePhotoPost(postForDelete);
    showMainPage();
}
function showMainPage(){
    removeContent();
    document.getElementsByClassName("filters")[0].style.display = "block";
    document.getElementById("load-more").style.display = "block";
    workingWithDOM.showAll();
}

function logoShowMainPage(){
    removeMainPage();
    showMainPage();
    clearFilter();
    filterConfig = {};
}

function removeMainPage(){
    /*const containerOuter = document.getElementsByClassName("container-outer");   это стратегический комментарий
        while(containerOuter[0].hasChildNodes()){                                  для того, чтобы задать вопрос на паре
        alert(containerOuter[0].childNodes[0]);                                    не ругайтесь, пожалуйста, я удалю
        containerOuter[0].removeChild(containerOuter[0].childNodes[0]);
    }*/
    const filter = document.getElementsByClassName("filters");
    filter[0].style.display = "none";
    const containerInner = document.getElementsByClassName("container-inner");
    while(containerInner[0].hasChildNodes()){
        containerInner[0].removeChild(containerInner[0].childNodes[0]);
    }
    const btnLoadMore = document.getElementById("load-more");
    btnLoadMore.style.display = "none";
}

function removeContent(){
    const content = document.getElementsByClassName("content");
    while(content[0].hasChildNodes()){
        content[0].removeChild(content[0].childNodes[0]);
    }
}