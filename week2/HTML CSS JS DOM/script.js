let editIndex = null;

function addSoldierToLocalStorage(fullName, rank, position, platoon, missionTime, status) {
    const soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];
    soldiers.push({ fullName, rank, position, platoon, missionTime, status });
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
    renderSoldiersFromLocalStorage();
}

function renderSoldiersFromLocalStorage() {
    const soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];
    const soldiersTableBody = document.getElementById("soldiersTableBody");
    
    soldiersTableBody.innerHTML = '';

    soldiers.forEach((soldier, index) => {
        const row = document.createElement('tr');

        const fullNameCell = document.createElement('td');
        fullNameCell.textContent = soldier.fullName;
        row.appendChild(fullNameCell);

        const rankCell = document.createElement('td');
        rankCell.textContent = soldier.rank;
        row.appendChild(rankCell);

        const positionCell = document.createElement('td');
        positionCell.textContent = soldier.position;
        row.appendChild(positionCell);

        const platoonCell = document.createElement('td');
        platoonCell.textContent = soldier.platoon;
        row.appendChild(platoonCell);

        const statusCell = document.createElement('td');
        statusCell.textContent = soldier.status;
        row.appendChild(statusCell);

        const actionsCell = document.createElement('td');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeSoldier(index);
        actionsCell.appendChild(removeButton);

        const missionButton = document.createElement('button');
        missionButton.textContent = 'Mission';
        missionButton.onclick = () => startMission(index);
        actionsCell.appendChild(missionButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editPersonnel(index);
        actionsCell.appendChild(editButton);

        row.appendChild(actionsCell);

        soldiersTableBody.appendChild(row);
    });
}


function removeSoldier(index) {
    let soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];
    soldiers.splice(index, 1);
    localStorage.setItem("soldiers", JSON.stringify(soldiers));
    renderSoldiersFromLocalStorage();
}

function startMission(index) {
    let soldiers = JSON.parse(localStorage.getItem("soldiers")) || [];
    let missionTime = parseInt(soldiers[index].missionTime);
    const missionBtn = document.querySelectorAll("tbody tr")[index].querySelector("button:nth-child(2)");
    missionBtn.disabled = true;
    missionBtn.textContent = `Mission (${missionTime} seconds)`;
    const interval = setInterval(() => {
        if (--missionTime > 0) {
            missionBtn.textContent = `Mission (${missionTime} seconds)`;
        } else {
            clearInterval(interval);
            localStorage.setItem("soldiers", JSON.stringify(soldiers));
            missionBtn.textContent = "Mission Completed";
        }
    }, 1000);
}

function editPersonnel(index) {
    editIndex = index;
    const person = JSON.parse(localStorage.getItem('soldiers'))[index];
    document.querySelector('table').style.display = 'none';
    document.querySelector('h1').textContent = 'EDIT PERSONNEL';
    document.getElementById('fullNameInput').value = person.fullName;
    document.getElementById('rankInput').value = person.rank;
    document.getElementById('positionInput').value = person.position;
    document.getElementById('platoonInput').value = person.platoon;
    document.getElementById('missionTimeInput').value = person.missionTime;
    document.getElementById('statusInput').value = person.status;
    const submitBtn = document.getElementById('formSubmitBtn');
    submitBtn.textContent = 'Save Changes';
    if (!document.querySelector('.cancel-btn')) {
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.style.backgroundColor = 'red';
        cancelBtn.addEventListener('click', cancelEdit);
        soldierForm.appendChild(cancelBtn);
    }
}

function cancelEdit() {
    document.querySelector('h1').textContent = 'BATTALION FORCE MANAGEMENT';
    document.querySelector('table').style.display = '';
    document.querySelector('.cancel-btn').remove();
    const submitBtn = document.getElementById('formSubmitBtn');
    submitBtn.textContent = 'Add Personnel';
    submitBtn.classList.remove('save-btn');
    document.getElementById('soldierForm').reset();
    editIndex = null;
}

function saveChanges() {
    const fullName = document.getElementById('fullNameInput').value;
    const rank = document.getElementById('rankInput').value;
    const position = document.getElementById('positionInput').value;
    const platoon = document.getElementById('platoonInput').value;
    const missionTime = document.getElementById('missionTimeInput').value;
    const status = document.getElementById('statusInput').value;
    let soldiers = JSON.parse(localStorage.getItem('soldiers')) || [];
    soldiers[editIndex] = { fullName, rank, position, platoon, missionTime, status };
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
    renderSoldiersFromLocalStorage();
    cancelEdit();
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("soldierForm").addEventListener("submit", function (event) {
        event.preventDefault();
        editIndex !== null ? saveChanges() : addSoldierToLocalStorage(
            document.getElementById("fullNameInput").value,
            document.getElementById("rankInput").value,
            document.getElementById("positionInput").value,
            document.getElementById("platoonInput").value,
            document.getElementById("missionTimeInput").value,
            document.getElementById("statusInput").value
        );
        this.reset();
        renderSoldiersFromLocalStorage();
    });
    renderSoldiersFromLocalStorage();
})