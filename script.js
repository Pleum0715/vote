
const labels = ["แย่", "พอใช้", "ดี", "ดีมาก", "ใครจะเทียบ"];

let votes = JSON.parse(localStorage.getItem("votes"));
if (!votes || votes.length !== 5) {
  votes = [0, 0, 0, 0, 0];
  localStorage.setItem("votes", JSON.stringify(votes));
}

function vote(index) {
  votes[index]++;
  localStorage.setItem("votes", JSON.stringify(votes));
  renderResults();
}

function renderResults() {
  const total = votes.reduce((a, b) => a + b, 0);
  const container = document.getElementById("results");
  container.innerHTML = "";

  votes.forEach((count, i) => {
    const percent = total ? ((count / total) * 100).toFixed(1) : 0;
    container.innerHTML += `
      <div class="result-bar">
        <span>${labels[i]} — ${count} คน (${percent}%)</span>
        <div class="bar-fill" style="width: ${percent}%;"></div>
      </div>
    `;
  });
}

function exportToCSV() {
  let csv = "ระดับ,จำนวน\n";
  for (let i = 0; i < votes.length; i++) {
    csv += `${labels[i]},${votes[i]}\n`;
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "ผลโหวต.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function resetVotes() {
  const password = prompt("ใส่รหัสแอดมินเพื่อล้างข้อมูล:");
  if (password === "152550") {
    votes = [0, 0, 0, 0, 0];
    localStorage.setItem("votes", JSON.stringify(votes));
    renderResults();
    alert("ล้างผลโหวตเรียบร้อยแล้ว");
  } else {
    alert("รหัสไม่ถูกต้อง ❌");
  }
}

renderResults();

let clickCount = parseInt(localStorage.getItem("clickCount") || "0");
document.getElementById("clickCount").textContent = clickCount;

function incrementClick() {
  clickCount++;
  localStorage.setItem("clickCount", clickCount);
  document.getElementById("clickCount").textContent = clickCount;
}
