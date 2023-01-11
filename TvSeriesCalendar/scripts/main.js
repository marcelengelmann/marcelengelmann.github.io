//Global variables
let currentSubpageScript; //saves the last used subpage-script object. Those are defined in the single js files inside the scripts folder

//Wait for Page to be fully loaded before running any script functions
window.addEventListener('DOMContentLoaded', (event) => {
    hideMainContent();
    languageScript.changeLanguage();
    setEventListeners();
    changeMainDiv();
});
//Listen to events of elements on the page
function setEventListeners() {
    //eventlistener: when User clicks on the Header Container redirect to home site
    document.getElementById("HeaderInnerContainer").addEventListener("click", () => {
        if (window.location.hash !== "" && window.location.hash !== "#NavHome") window.location.hash = "#NavHome";
    });
    //listen to hash-change events to modify content div
    window.addEventListener("hashchange", changeMainDiv);
    //listen to click events on the language button
    document.getElementById("langButton").addEventListener("click", _ => {
        let langButton = document.getElementById("langButton");
        langButton.style.backgroundImage = (langButton.style.backgroundImage == "" || langButton.style.backgroundImage == 'url("images/en_Flag.png")') ? "url('images/de_Flag.png')" : "url('images/en_Flag.png')";
        languageScript.changeLanguage();
        showNavigationDropdownMenu();
    });
    document.getElementById("collapseNav").addEventListener("click", showNavigationDropdownMenu);
}

//Hide all divs inside the Main div to simulate dynamic loading

function hideMainContent() {
    [...document.getElementById("Main").children].forEach(e => {
        e.style.display = "none";
    });
}

//check the current hash and determ which content to show next
function changeMainDiv(source) {
    if (source != null && source.newURL === source.oldURL) return;
    showNavigationDropdownMenu();
    let newHash = window.location.hash.substring(1);
    let nextContent;
    resetcurrentSubpageScript();
    switch (newHash) {
        case 'NavDownloads':
            nextContent = "downloads.html";
            currentSubpageScript = downloadsScript;
            changeActiveNav(1);
            break;
            case 'NavInstallation':
            nextContent = "installation.html";
            currentSubpageScript = installationScript;
            changeActiveNav(2);
            break;
        case 'NavFeatures':
            nextContent = "features.html";
            currentSubpageScript = plannedFeaturesScript;
            changeActiveNav(3);
            break;
        case 'NavFAQ':
            nextContent = "faq.html";
            changeActiveNav(4);
            break;
        case 'NavImpressum':
            nextContent = "impressum.html";
            changeActiveNav(-1);
            break;
        case 'NavKontakt':
            nextContent = "kontakt.html";
            currentSubpageScript = contactFormScript;
            changeActiveNav(-1);
            break;
        case 'NavDatenschutz':
            nextContent = "datenschutz.html";
            changeActiveNav(-1);
            break;
        default:
            nextContent = "home.html";
            currentSubpageScript = homeScript;
            changeActiveNav(0);
            break;
    }
    changeContent(nextContent);
}

//change the active navigation element by the given index
function changeActiveNav(index) {
    try {
        document.getElementById("NavBar").getElementsByClassName("active")[0].classList.remove('active');
    } catch (_) {} finally {
        if (index != -1) document.getElementById("NavBar").getElementsByTagName("a")[index].classList.add("active");
    }
}

// hide the current shown div inside the Main div and show the target element instead
// used to simulate dynamic loading
function changeContent(target) {
    let request = new XMLHttpRequest();

    request.open('GET', `/contentpages/${target}`, true);

    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            let response = request.responseText;
            document.getElementById("Main").innerHTML = response;
            languageScript.reloadLanguage();
            if(currentSubpageScript != null)
                currentSubpageScript.startUp();
        }
    };

    request.send();
}

//close the current subpage script and reset the variable
function resetcurrentSubpageScript() {
    if (currentSubpageScript != null) {
        currentSubpageScript.close();
        currentSubpageScript = null;
    }
}

//Switch the display of the navigation during mobile layout
function showNavigationDropdownMenu() {
    var x = document.getElementById("NavBar");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}