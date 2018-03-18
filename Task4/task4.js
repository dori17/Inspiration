"use strict";
const workingWithPhotoposts = (function() {
    const photoPosts = [

        {
            id: "1",
            description: "On this site. Again. Someone, please, save me. I wanna go home, I am very tired... Can someone replace me? I beg you...",
            createdAt: new Date("2018-03-04T19:22:17"),
            author: "Vasiliu Pupkin",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["bored", "wanna", "go", "home"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "2",
            description: "My parents are very creative and extraordinary people. Mom, dad, I love you.",
            createdAt: new Date("2018-02-17T06:45:34"),
            author: "Ivan Ivanov",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["very", "combination", "name", "surname", "creativity", "test"],
            likes: ["Ivan", "I1", "Vanyok", "Vanich2004"]
        },
        {
            id: "3",
            description: "Hey, gyus. I've uploaded my new talking video on friendship, check it out on my YouTube channel!",
            createdAt: new Date("2018-03-19T11:45:00"),
            author: "Snailkick",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["video", "youtube", "not", "a", "blogger"],
            likes: ["User", "Watcher", "Subscriber", "Videomaker", "Postcrosser"]
        },
        {
            id: "4",
            description: "Focus on studying. I know it's hard, but believe me, it's going to be worth it.",
            createdAt: new Date("2018-02-17T19:36:34"),
            author: "Your Mother",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["wisdom", "care"],
            likes: ["Kate", "Petya", "Helen", "Zayn", "Rita"]
        },
        {
            id: "5",
            description: "No one can ruin your day without your permission. Remember that.",
            createdAt: new Date("2018-02-13T09:12:34"),
            author: "Kira Bondareva",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["motivation", "self-confidence", "wisdom"],
            likes: ["Vasya", "Artyom", "Petr"]
        },
        {
            id: "6",
            description: "You have been assigned this mountain to show it can be moved.",
            createdAt: new Date("2018-03-03T06:45:34"),
            author: "Kate Zhukova",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["motivation", "yes", "you", "can", "wisdom"],
            likes: ["Vasya"]
        },
        {
            id: "7",
            description: "Don't wait for everything to be perfect before you start to enjoy your life.",
            createdAt: new Date("2018-02-27T20:23:56"),
            author: "Kira Bondareva",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["wisdom", "enjoy", "life"],
            likes: ["Vasya", "Petya", "Kolya", "Victor", "Eugene", "Alessia"]
        },
        {
            id: "8",
            description: "Every day may not be good, but there is something good in every day.",
            createdAt: new Date("2018-02-17T06:45:34"),
            author: "Natalie Paholenko",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["wisdom", "creativity"],
            likes: ["Wonder", "Zayn", "Lauv", "Sia", "Alt-J"]
        },
        {
            id: "9",
            description: "Anyone who keeps the ability to see beauty never grows old.",
            createdAt: new Date("2018-03-03T19:12:34"),
            author: "Kate Zhukova",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["beauty", "creativity", "models", "wisdom"],
            likes: ["Viktor"]
        },
        {
            id: "10",
            description: "Grow positive thoughts.",
            createdAt: new Date("2018-01-23T12:27:34"),
            author: "Helen",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["wisdom", "psychology", "mental", "health"],
            likes: ["Tatsiana", "Aleksei"]
        },
        {
            id: "11",
            description: "You are not getting older, you are increasing in value.",
            createdAt: new Date("2018-02-09T11:10:34"),
            author: "Vladimir Bulatov",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["cute", "haha", "creativity", "wisdom"],
            likes: ["Hampton", "Hilary", "Hilton", "Josh"]
        },
        {
            id: "12",
            description: "Be with those who help your being.",
            createdAt: new Date("2018-02-03T13:27:19"),
            author: "Kate Zhukova",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["psychology", "wisdom", "neighbourhood"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "13",
            description: "The ones that love us never really live us.",
            createdAt: new Date("2018-02-14T14:02:18"),
            author: "Your Ex",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["love", "relationship", "distance"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "14",
            description: "What we have once enjoyed we can never lose. All that we love deeply becomes a part of us.",
            createdAt: new Date("2018-02-17T16:45:34"),
            author: "Helen",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["cute", "psychology"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "15",
            description: "Hope those people who decided that the amount of posts for " +
            "this tasks will be 20 will do a lot of various work at their job...",
            createdAt: new Date("2018-03-04T09:12:34"),
            author: "dori_17",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["very", "interesting", "filling", "all", "this", "fields"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "16",
            description: "A beautiful soul is never forgotten.",
            createdAt: new Date("2018-02-03T17:05:35"),
            author: "Vladichek",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["cute", "life", "relationship"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "17",
            description: "Don't be impressed by money, followers, degrees and titles. " +
            "Be impressed by kindness, integrity, humility and generosity",
            createdAt: new Date("2018-02-17T06:45:34"),
            author: "Artyom Shishow",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["wisdom", "qualities", "creativity"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "18",
            description: "A smile is the pretties thing you can wear :)",
            createdAt: new Date("2018-02-17T06:45:34"),
            author: "Kate Nepravskaya",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["cute", "smile", "joy", "creativity"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "19",
            description: "Don't apologize for feeling something or a lot.",
            createdAt: new Date("2018-01-23T15:13:34"),
            author: "Wise user",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["wisdom", "relationship"],
            likes: ["Vasya", "Petya", "Kolya"]
        },
        {
            id: "20",
            description: "Listen to your own voice, your own soul. Too many people " +
            "listen to the noise of the world instead of themselves.",
            createdAt: new Date("2018-02-13T09:12:34"),
            author: "Kira Bondareva",
            photoLink: "http://kot-pes.com/wp-content/uploads/2016/08/image10-2-650x520.jpeg",
            hashTags: ["psychology", "wisdom"],
            likes: ["Vasya", "Petya", "Kolya"]
        }
    ];

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

    function addPhotoPost(newPost) {
        if (!validatePhotoPost(newPost)){
            return false;
        }
        photoPosts.push(newPost);
        return true;
    }

    function editPhotoPost(idParam, changes) {
        if(idExists(idParam) &&
           !changes.id &&
           !changes.createdAt &&
           !changes.author
           ) {
            if(changes.description){
                if(changes.description.length < 200){
                    getPhotoPost(idParam).description = changes.description;
                }
                else{
                    return false;
                }
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
            return true;
        }
        return false;
    }

    function removePhotoPost(idParam) {
        if (idExists(idParam)){
           const remIndex =  photoPosts.indexOf(getPhotoPost(idParam));
           photoPosts.splice(remIndex, 1);
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
        return a.createdAt.getTime() - b.createdAt.getTime();
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