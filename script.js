// Load bugs from LocalStorage
document.addEventListener("DOMContentLoaded", loadBugs);

function loadBugs() {
  const bugList = document.getElementById("bug-list");
  bugList.innerHTML = "";
  const bugs = JSON.parse(localStorage.getItem("bugs")) || [];

  bugs.forEach((bug, index) => {
    const bugCard = document.createElement("div");
    bugCard.className = "bug-card";
    bugCard.innerHTML = `
      <h3>${bug.title}</h3>
      <p>${bug.desc}</p>
      <p class="status">Priority: ${bug.priority} | Status: ${bug.status}</p>
      <button class="action close-btn" onclick="toggleStatus(${index})">
        ${bug.status === "Open" ? "Close" : "Reopen"}
      </button>
      <button class="action" onclick="deleteBug(${index})">Delete</button>
    `;
    bugList.appendChild(bugCard);
  });
}

// Add a new bug
function addBug() {
  const title = document.getElementById("bug-title").value;
  const desc = document.getElementById("bug-desc").value;
  const priority = document.getElementById("bug-priority").value;

  if (!title || !desc) {
    alert("Please fill in all fields");
    return;
  }

  const bug = {
    title,
    desc,
    priority,
    status: "Open"
  };

  const bugs = JSON.parse(localStorage.getItem("bugs")) || [];
  bugs.push(bug);
  localStorage.setItem("bugs", JSON.stringify(bugs));

  document.getElementById("bug-title").value = "";
  document.getElementById("bug-desc").value = "";
  loadBugs();
}

// Toggle bug status
function toggleStatus(index) {
  const bugs = JSON.parse(localStorage.getItem("bugs")) || [];
  bugs[index].status = bugs[index].status === "Open" ? "Closed" : "Open";
  localStorage.setItem("bugs", JSON.stringify(bugs));
  loadBugs();
}

// Delete bug
function deleteBug(index) {
  const bugs = JSON.parse(localStorage.getItem("bugs")) || [];
  bugs.splice(index, 1);
  localStorage.setItem("bugs", JSON.stringify(bugs));
  loadBugs();
}
