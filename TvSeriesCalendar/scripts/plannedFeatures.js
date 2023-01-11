const plannedFeaturesScript = {
    startUp() {
        plannedFeaturesScript.getIssues();
    },
    close() {
        plannedFeaturesScript.removeIssues();
    },
    //load the issue data from github
    getIssues() {
        const baseURL = "https://api.github.com";
        const owner = "Death-Truction";
        const repo = "TvSeriesCalendar";
        const requestURL = encodeURI(baseURL + `/repos/${owner}/${repo}/issues`);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", requestURL, true); // false for synchronous request
        xhr.onload = plannedFeaturesScript.gitHubFeatureResponse;
        xhr.onerror = () => console.error(xhr.statusText);
        xhr.send(null);
    },
    //remove all displayed issues
    removeIssues() {
        document.getElementById("issuesContainer").innerHTML = "";
    },
    //load the comments of a given issue
    async getComments(url) {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    },
    //parse the github issue data
    gitHubFeatureResponse() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let data = JSON.parse(this.responseText);
                data.forEach(e => {
                    if (e.state === "open") plannedFeaturesScript.createIssueElement(e);
                });
            } else {
                console.error(this.statusText);
            }
        }
    },
    async createIssueElement(element) {
        
        // Create new issue element
        let newIssueNode = document.createElement("div");
        newIssueNode.classList.add("issueElement");

        //Create element's header
        let header = document.createElement("h2");
        header.classList.add("issueHeader");
        header.innerHTML = element.title;

        // Create element's description
        let description = document.createElement("h3");
        description.classList.add("issueDescription");
        description.innerHTML = element.body;

        //create comments element
        let comments = document.createElement("div");
        comments.classList.add("commentBox");
        // getComments of Issue
        let commentsList = await plannedFeaturesScript.getComments(element.comments_url);
        if (commentsList != null) {
            commentsList.forEach(comment => {
                let commentWrapper = document.createElement("div");
                commentWrapper.classList.add("commentWrapper");
                let userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userImg = new Image();
                userImg.alt = "Avatar";
                userImg.src = comment.user.avatar_url;

                let userName = document.createElement("span");
                userName.innerHTML = comment.user.login + " commented:";

                let commentText = document.createElement("div");
                commentText.classList.add("comment");
                commentText.innerHTML = comment.body;

                userDiv.appendChild(userImg);
                userDiv.appendChild(userName);

                commentWrapper.appendChild(userDiv);
                commentWrapper.appendChild(commentText);
                comments.appendChild(commentWrapper);
            });
        }
        // Add elements to issue
        newIssueNode.appendChild(header);
        newIssueNode.appendChild(description);
        newIssueNode.appendChild(comments);
        newIssueNode.innerHTML += "\n\r";
        //add issue to Site
        document.getElementById("issuesContainer").appendChild(newIssueNode);
    },
};