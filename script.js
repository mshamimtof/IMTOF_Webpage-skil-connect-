(function () {
  const schoolSection = document.getElementById("schoolSection");
  const educationSection = document.getElementById("educationSection");
  const collegeSection = document.getElementById("collegeSection");

  const levelRadios = document.querySelectorAll('input[name="education_level"]');

  function hideAll() {
    schoolSection.hidden = true;
    educationSection.hidden = true;
    collegeSection.hidden = true;

    // Optional: clear "required" states when hidden (keeps HTML simpler)
    setSectionRequired(schoolSection, false);
    setSectionRequired(educationSection, false);
    setSectionRequired(collegeSection, false);
  }

  function setSectionRequired(sectionEl, isRequired) {
    const inputs = sectionEl.querySelectorAll("input, select, textarea");
    inputs.forEach(el => {
      // Only make text/date/number/tel/email required if they were meant to be mandatory
      // We'll mark required via data-req="1" to keep it controlled.
      if (el.dataset.req === "1") el.required = isRequired;
      if (!isRequired) el.required = false;
    });
  }

  // Mark required fields inside the conditional sections (controlled, no extra classes)
  function initDataReq() {
    // School required
    document.querySelector('input[name="school_name"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="school_city"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="board_of_education"]')?.setAttribute("data-req", "1");
    // school_type radios
    document.querySelectorAll('input[name="school_type"]').forEach(r => r.setAttribute("data-req", "1"));

    // Education required
    document.querySelector('input[name="edu_institution"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="edu_course"]')?.setAttribute("data-req", "1");

    // College required
    document.querySelector('input[name="college_name"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="college_course_specialization"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="college_university"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="college_department"]')?.setAttribute("data-req", "1");
    document.querySelector('input[name="preferred_industry"]')?.setAttribute("data-req", "1");
  }

  function showByLevel(value) {
    hideAll();

    if (value === "school") {
      schoolSection.hidden = false;
      setSectionRequired(schoolSection, true);
    }

    if (value === "diploma" || value === "others") {
      educationSection.hidden = false;
      setSectionRequired(educationSection, true);
    }

    if (value === "bachelors" || value === "masters" || value === "phd") {
      collegeSection.hidden = false;
      setSectionRequired(collegeSection, true);
    }
  }

  // "Other:" checkbox enable text inputs (Education + College)
  const jobOtherChk = document.getElementById("jobOtherChk");
  const jobOtherInput = document.getElementById("jobOtherInput");

  if (jobOtherChk && jobOtherInput) {
    jobOtherChk.addEventListener("change", () => {
      jobOtherInput.disabled = !jobOtherChk.checked;
      if (!jobOtherChk.checked) jobOtherInput.value = "";
      if (jobOtherChk.checked) jobOtherInput.focus();
    });
  }

  const collegeJobOtherChk = document.getElementById("collegeJobOtherChk");
  const collegeJobOtherInput = document.getElementById("collegeJobOtherInput");

  if (collegeJobOtherChk && collegeJobOtherInput) {
    collegeJobOtherChk.addEventListener("change", () => {
      collegeJobOtherInput.disabled = !collegeJobOtherChk.checked;
      if (!collegeJobOtherChk.checked) collegeJobOtherInput.value = "";
      if (collegeJobOtherChk.checked) collegeJobOtherInput.focus();
    });
  }

  // Init
  initDataReq();
  hideAll();

  levelRadios.forEach(r => {
    r.addEventListener("change", () => showByLevel(r.value));
  });
})();