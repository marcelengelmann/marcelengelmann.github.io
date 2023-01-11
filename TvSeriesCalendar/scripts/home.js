const homeScript = {
    startUp() {
        //set eventlisteners for the contactForm content
        window.addEventListener('scroll', homeScript.changeFeatureNavActiveOnScroll);
        [...document.getElementById("featureNav").getElementsByTagName("a")].forEach((element, index) => {
            if (index === 0) element.addEventListener("click", homeScript.scrollToTop);
            else element.addEventListener("click", homeScript.changeFeatureNavActiveOnClick);
        });
    },
    close() {
        //remove the setted eventlisteners
        window.removeEventListener('scroll', homeScript.changeFeatureNavActiveOnScroll);
        [...document.getElementById("featureNav").getElementsByTagName("a")].forEach((element, index) => {
            if (index === 0) element.removeEventListener("click", homeScript.scrollToTop);
            else element.removeEventListener("click", homeScript.changeFeatureNavActiveOnClick);
        });
    },
    //change the active element of the featureNavigation
    changeFeatureNavigation(index) {
        let activeElement = document.getElementById("featureNav").getElementsByClassName("active")[0];
        if (activeElement != null) activeElement.classList.remove('active');
        if (index != -1) {
            let element = document.getElementById("featureNav").getElementsByTagName("a")[index];
            element.classList.add("active");
        }
    },
    //check the current scroll position of the window and update the current featureNavigation element based on the scroll position
    changeFeatureNavActiveOnScroll(event) {
        const features = [...document.getElementById("feature-wrapper").getElementsByClassName("feature")].reverse();
        let index = features.findIndex(element => (element.getBoundingClientRect().bottom - window.innerHeight) <= 0);
        let navigationIndex = (index <= -1) ? -1 : features.length - index;
        homeScript.changeFeatureNavigation(navigationIndex);
    },
    //scroll to the element based on the clicked element of the feature-navigation
    changeFeatureNavActiveOnClick(event) {
        let clickedFeatureNavIndex = [...document.getElementById("featureNav").getElementsByTagName("a")].findIndex(element => {
            return element === event.target;
        });
        document.getElementById("feature-wrapper").getElementsByClassName("feature")[clickedFeatureNavIndex - 1].scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    },
    //scroll to the top of the document
    scrollToTop() {
        scroll(0, 0);
    },
};