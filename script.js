let interviewList = [];
let rejectedList = [];
let currentStatus = "filter-all-btn";

let total = document.getElementById("total-count");
let interviewCount = document.getElementById("interview-count");
let rejectedCount = document.getElementById("rejected-count");
let jobCountText = document.getElementById("job-count-text");

const allFilterBtn = document.getElementById("filter-all-btn");
const interviewFilterBtn = document.getElementById("interview-btn");
const rejectedFilterBtn = document.getElementById("rejected-btn");

const allCardSection = document.getElementById("job-post");
const mainContainer = document.querySelector("main");

function calculateCount() {
  const totalJobs = allCardSection.querySelectorAll(".job-card").length;
  total.innerText = totalJobs;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  if (currentStatus === "filter-all-btn") {
    jobCountText.innerText = totalJobs + " jobs";
  } else if (currentStatus === "interview-btn") {
    jobCountText.innerText =
      interviewList.length + " of " + totalJobs + " jobs";
  } else if (currentStatus === "rejected-btn") {
    jobCountText.innerText = rejectedList.length + " of " + totalJobs + " jobs";
  }
}

calculateCount();

function showEmptyState() {
  let empty = document.getElementById("empty-state");
  if (!empty) {
    empty = document.createElement("div");
    empty.id = "empty-state";
    empty.className = "text-center py-20";
    empty.innerHTML = `
                            <img src="jobs.png" alt="" class = "w-[150px] h-[150px] mx-auto">
                            <p class = "text-[#64748B] text-lg mt-4">no jobs available</p>
        `;
    allCardSection.insertAdjacentElement("afterend", empty);
  }
}

function hideEmptyState() {
  const empty = document.getElementById("empty-state");
  if (empty) empty.remove();
}

function toogleStyle(id) {
  currentStatus = id;

  allFilterBtn.classList.add("bg-white", "text-[#64748B]");
  allFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  interviewFilterBtn.classList.add("bg-white", "text-[#64748B]");
  interviewFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  rejectedFilterBtn.classList.add("bg-white", "text-[#64748B]");
  rejectedFilterBtn.classList.remove("bg-[#3B82F6]", "text-white");

  const selected = document.getElementById(id);

  selected.classList.remove("bg-white", "text-[#64748B]");
  selected.classList.add("bg-[#3B82F6]", "text-white");

  const cards = document.querySelectorAll(".job-card");

  if (id === "filter-all-btn") {
    cards.forEach((card) => card.classList.remove("hidden"));
    hideEmptyState();
  } else if (id === "interview-btn") {
    cards.forEach((card) => {
      const statusBtn = card.querySelector(".status-btn");
      if (statusBtn && statusBtn.innerText === "INTERVIEW") {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    if (interviewList.length === 0) {
      showEmptyState();
    } else {
      hideEmptyState();
    }
  } else if (id === "rejected-btn") {
    cards.forEach((card) => {
      const statusBtn = card.querySelector(".status-btn");
      if (statusBtn && statusBtn.innerText === "REJECTED") {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
    if (rejectedList.length === 0) {
      showEmptyState();
    } else {
      hideEmptyState();
    }
  }
  calculateCount();
}

allFilterBtn.addEventListener("click", () => toogleStyle("filter-all-btn"));
interviewFilterBtn.addEventListener("click", () =>
  toogleStyle("interview-btn"),
);
rejectedFilterBtn.addEventListener("click", () => toogleStyle("rejected-btn"));

mainContainer.addEventListener("click", function (event) {
  const card = event.target.closest(".job-card");
  if (!card) return;

  const companyName = card.querySelector(".company-name").innerText;
  const statusBtn = card.querySelector(".status-btn");

  if (event.target.classList.contains("interview-action-btn")) {
    statusBtn.innerText = "INTERVIEW";
    statusBtn.className =
      "status-btn px-[12px] py-[8px] bg-green-100 text-green-600 font-semibold mb-[8px] text-[14px]";

    const exist = interviewList.find((item) => item === companyName);
    if (!exist) {
      interviewList.push(companyName);
    }

    rejectedList = rejectedList.filter((item) => item !== companyName);

    if (currentStatus === "rejected-btn") {
      card.classList.add("hidden");
      if (rejectedList.length === 0) showEmptyState();
    }
    calculateCount();
  } else if (event.target.classList.contains("rejected-action-btn")) {
    statusBtn.innerText = "REJECTED";
    statusBtn.className =
      "status-btn px-[12px] py-[8px] bg-red-100 text-red-600 font-semibold mb-[8px] text-[14px]";

    const exist = rejectedList.find((item) => item === companyName);

    if (!exist) {
      rejectedList.push(companyName);
    }

    interviewList = interviewList.filter((item) => item !== companyName);

    if (currentStatus === "interview-btn") {
      card.classList.add("hidden");
      if (interviewList.length === 0) showEmptyState();
    }
    calculateCount();
  } else if (event.target.classList.contains("delete-btn")) {
    interviewList = interviewList.filter((item) => item !== companyName);
    rejectedList = rejectedList.filter((item) => item !== companyName);
    card.remove();

    if (currentStatus === "interview-btn" && interviewList.length === 0) {
      showEmptyState();
    } else if (currentStatus === "rejected-btn" && rejectedList.length === 0) {
      showEmptyState();
    }
    calculateCount();
  }
});
