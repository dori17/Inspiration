"use strict";
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
today = yyyy+'-'+mm+'-'+dd;
document.getElementById("input-date").setAttribute("max", today);

const view = (function() {
    function signInForm(){
        const content = document.getElementsByClassName("content");
        const signIn = document.createElement("div");
        signIn.className = "sign-in-form";
        const signInTitle = document.createElement("p");
        signInTitle.textContent = "Hey, wanna sign in?";
        const inputField = document.createElement("div");
        inputField.className = "sign-in-inputs";
        const signInLabelLogin = document.createElement("label");
        signInLabelLogin.textContent = "Login:";
        signInLabelLogin.setAttribute("for", "login-input");
        const signInInputLogin = document.createElement("input");
        signInInputLogin.id = "login-input";
        signInInputLogin.setAttribute("type", "text");
        signInInputLogin.setAttribute("placeholder", "Login");
        const signInLabelPassword = document.createElement("password");
        signInLabelPassword.textContent = "Password:";
        signInLabelPassword.setAttribute("for", "password-input");
        const signInInputPassword = document.createElement("input");
        signInInputPassword.id = "password-input";
        signInInputPassword.setAttribute("type", "password");
        signInInputPassword.setAttribute("placeholder", "Password");
        const signInBtns = document.createElement("div");
        signInBtns.className = "sign-in-buttons";
        const submitSignInBtn = document.createElement("button");
        submitSignInBtn.textContent = "Submit";
        const cancelSignInBtn = document.createElement("button");
        cancelSignInBtn.textContent = "Cancel";
        signIn.appendChild(signInTitle);
        inputField.appendChild(signInLabelLogin);
        inputField.appendChild(signInInputLogin);
        inputField.appendChild(signInLabelPassword);
        inputField.appendChild(signInInputPassword);
        signIn.appendChild(inputField);
        signInBtns.appendChild(submitSignInBtn);
        signInBtns.appendChild(cancelSignInBtn);
        signIn.appendChild(signInBtns);
        content[0].appendChild(signIn);
    }

    function signOutForm(){
        const content = document.getElementsByClassName("content");
        const signOut = document.createElement("div");
        signOut.className = "sign-out-window";
        const signOutTitle = document.createElement("p");
        signOutTitle.textContent = "Do you really want to sign out?";
        const signOutBtns = document.createElement("div");
        signOutBtns.className = "sign-out-buttons";
        const yes = document.createElement("button");
        yes.textContent = "yes";
        const cancel = document.createElement("button");
        cancel.textContent = "cancel";
        signOut.appendChild(signOutTitle);
        signOutBtns.appendChild(yes);
        signOutBtns.appendChild(cancel);
        signOut.appendChild(signOutBtns);
        content[0].appendChild(signOut);
    }

    function wrongUserForm(){
        const content = document.getElementsByClassName("content");
        const wrongUser = document.createElement("div");
        wrongUser.className = "wrong-user-form";
        const wrongUserMessage = document.createElement("p");
        wrongUserMessage.textContent = "Incorrect login or password";
        const wrUserBtns = document.createElement("div");
        wrUserBtns.className = "wrong-user-buttons";
        const tryAgainBtn = document.createElement("button");
        tryAgainBtn.textContent = "Try again";
        const goToMainBtn = document.createElement("button");
        goToMainBtn.textContent = "Go to Main";
        wrongUser.appendChild(wrongUserMessage);
        wrUserBtns.appendChild(tryAgainBtn)
        wrUserBtns.appendChild(goToMainBtn);
        wrongUser.appendChild(wrUserBtns);
        content[0].appendChild(wrongUser);
    }

    function deletePostForm(){
        const content = document.getElementsByClassName("content");
        const deletePost = document.createElement("div");
        deletePost.className = "delete-post-window";
        const deletePostTitle = document.createElement("p");
        deletePostTitle.textContent = "Do you really want to delete this post?";
        const btns = document.createElement("div");
        btns.className = "delete-post-buttons";
        const yes = document.createElement("button");
        yes.textContent = "yes";
        const cancel = document.createElement("button");
        cancel.textContent = "cancel";
        deletePost.appendChild(deletePostTitle);
        btns.appendChild(yes);
        btns.appendChild(cancel);
        deletePost.appendChild(btns);
        content[0].appendChild(deletePost);
    }

    function likeDeniedForm(){
        const content = document.getElementsByClassName("content");
        const likeDenied = document.createElement("div");
        likeDenied.className = "like-denied-form";
        const likeDeniedTitle = document.createElement("p");
        likeDeniedTitle.textContent = "Sorry, but non authorized users can't like posts";
        const likeDeniedBtns = document.createElement("div");
        likeDeniedBtns.className = "like-denied-buttons";
        const signInBtn = document.createElement("button");
        signInBtn.textContent = "I want to authorize";
        const goToMainBtn = document.createElement("button");
        goToMainBtn.textContent = "Go to main page";
        likeDenied.appendChild(likeDeniedTitle);
        likeDeniedBtns.appendChild(signInBtn);
        likeDeniedBtns.appendChild(goToMainBtn);
        likeDenied.appendChild(likeDeniedBtns);
        content[0].appendChild(likeDenied);
    }

    function createPostForm(){
        const content = document.getElementsByClassName("content");
        const createPost = document.createElement("div");
        createPost.className = "create-post";
        const createPostTitle = document.createElement("p");
        createPostTitle.textContent = "Create new post!";
        let photoArea = document.createElement("div");
        photoArea.className = "photo-area";
        photoArea.innerHTML = `
    <label class='create-post-text'> Choose photo file</label>
    <input class="load-file" type="file" title=" " accept="image/x-png,image/gif,image/jpeg" >
`
        const createPostForm = document.createElement("form");
        createPostForm.className = "create-post-form";
        createPostForm.setAttribute("name", "create");
        descr = document.createElement("div");
        const descriptionLabel = document.createElement("label");
        descriptionLabel.textContent = "Description: ";
        descriptionLabel.className = "create-post-text";
        const description = document.createElement("textarea");
        description.setAttribute("placeholder", "not more than 200 symbols");
        descr.appendChild(descriptionLabel);
        descr.appendChild(description);
        hasht = document.createElement("div");
        const hashtagsLabel = document.createElement("label");
        hashtagsLabel.textContent = "HashTags: ";
        hashtagsLabel.className = "create-post-text";
        const hashtags = document.createElement("input");
        hashtags.setAttribute("type", "text");
        hashtags.setAttribute("placeholder", "#input#hashtags#here");
        hasht.appendChild(hashtagsLabel);
        hasht.appendChild(hashtags);
        const btns = document.createElement("div");
        btns.className = "create-post-buttons";
        const save = document.createElement("button");
        save.textContent = "save";
        const cancel = document.createElement("button");
        cancel.textContent = "cancel";
        createPost.appendChild(createPostTitle);
        createPostForm.appendChild(photoArea);
        createPostForm.appendChild(descr);
        createPostForm.appendChild(hasht);
        createPost.appendChild(createPostForm);
        btns.appendChild(save);
        btns.appendChild(cancel);
        createPost.appendChild(btns);
        content[0].appendChild(createPost);
    }

    function noPostsFound(){
        const content = document.getElementsByClassName("content");
        const noPostsDiv = document.createElement("div");
        noPostsDiv.className = "no-posts-div";
        const noPostsText = document.createElement("p");
        noPostsText.textContent = "Sorry but there are no posts fitting your filter parameters";
        const ok = document.createElement("button");
        ok.textContent = "ok";
        ok.setAttribute("type", "submit");
        noPostsDiv.appendChild(noPostsText);
        noPostsDiv.appendChild(ok);
        content[0].appendChild(noPostsDiv);
    }

    return{
        signInForm,
        wrongUserForm,
        deletePostForm,
        likeDeniedForm,
        signOutForm,
        createPostForm,
        noPostsFound
    }
})();


