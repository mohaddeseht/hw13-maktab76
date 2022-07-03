const table = document.querySelector('table tbody');
const thead = document.querySelector('thead');
const heading = document.createElement('tr');
thead.append(heading);
heading.innerHTML = `<th></th>`;
let sameProjectId = []
let projectId = [];
readApi();
function readApi() {
    fetch('https://62ab6beda62365888bdc2f11.mockapi.io/Hw13')
        .then((res) => res.json())
        .then((data) => {
            createTable(data)
        })
}
function createTable(data) {
    let projectId = data.map((site) => site.ProjectId);
    projectId = [...new Set(projectId)];
    for (let i = 0; i < projectId.length; i++) {
        sameProjectId = data.filter(site => site.ProjectId == projectId[i])
        sameProjectId.sort((a, b) => {
            return a.SiteId - b.SiteId;
        })
        const row = document.createElement('tr');

        const id = document.createElement('td');
        id.innerHTML = projectId[i];

        row.appendChild(id);
        sameProjectId.forEach(site => {
            const target = document.createElement('td');
            target.innerHTML = site.Target;
            row.appendChild(target);
        })
        table.appendChild(row);
    }
    sameProjectId.forEach((site) => {
        const siteId = document.createElement('th');
        siteId.innerHTML = site.SiteId;
        heading.append(siteId);
    });
}
