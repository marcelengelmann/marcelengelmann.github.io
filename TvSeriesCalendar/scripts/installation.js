const installationScript = {
    jumpLinks: [],
    startUp() {
        //set eventlisteners for the contactForm content
        this.jumpLinks = [...document.querySelectorAll("#installationHeader a")];
        this.jumpLinks[0].destination = "installationPreCompiled";
        this.jumpLinks[1].destination = "installationSelfCompiled";
        this.jumpLinks.forEach(link => link.addEventListener("click", this.scrollIntoElement));
        
    },
    close() {
        //remove the setted eventlisteners
        this.jumpLinks.forEach(link => {
            link.removeEventListener("click", this.scrollIntoElement);
        });
    },
    //scroll to the given element
    scrollIntoElement(event){
        document.getElementById(event.srcElement.destination).scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
};