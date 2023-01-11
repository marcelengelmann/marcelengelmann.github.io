const downloadsScript = {
    startUp() {
        downloadsScript.getReleases();
    },
    close() {
        downloadsScript.clearTable();
    },
    //get the Released Version of the TvSeriesCalendar App from github
    getReleases() {
        const baseURL = "https://api.github.com";
        const owner = "Death-Truction";
        const repo = "TvSeriesCalendar";
        const requestURL = encodeURI(baseURL + `/repos/${owner}/${repo}/releases`);
        var xhr = new XMLHttpRequest();
        xhr.open("GET", requestURL, true); // false for synchronous request
        xhr.onload = downloadsScript.gitHubDownloadsResponse;
        xhr.onerror = () => console.error(xhr.statusText);
        xhr.send(null);
    },
    //check the response from github
    gitHubDownloadsResponse() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let data = JSON.parse(this.responseText);
                data.forEach(e => {
                    downloadsScript.addElementToTable(e);
                });
            } else {
                console.error(this.statusText);
            }
        }
    },
    //add the element from the githubresponse into the DownloadsTable
    addElementToTable(element) {
        const tableBody = document.getElementById("DownloadsTable").getElementsByTagName("tbody")[0];
        let assets = "";
        element.assets.forEach(asset => {
            assets += `<a href="${asset.browser_download_url}">${asset.browser_download_url.split("/").pop()}</a><br>`;
        });
        const newRow = `
                        <tr>
                            <td>${element.name}</td>
                            <td>${element.tag_name}</td>
                            <td>${assets}</td>
                        </tr>
                        `;
        tableBody.innerHTML += newRow;
    },
    //empty the DownloadsTable
    clearTable() {
        document.getElementById("DownloadsTable").getElementsByTagName("tbody")[0].innerHTML = "";
    },
};