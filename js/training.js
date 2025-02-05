document.addEventListener("DOMContentLoaded", function () {
    //------------ Anläggnings- och passfilter ------------
    const facilitySelect = document.getElementById("facility-select");
    const passSelect = document.getElementById("pass-select");
    const schedules = document.querySelectorAll(".facility-schedule");

    const facilityPasses = {
        utopia: ["Yoga", "Spinning", "Bodypump", "Crossfit"],
        ostra: ["Pilates", "Boxning", "HIIT", "Zumba", "Cirkelträning"],
        mariehem: ["Yoga", "Pilates", "Crossfit", "HIIT", "Bodypump"],
        navet: ["AquaFit", "Simträning", "Zumba", "Yoga", "Spinning"]
    };

    function updatePassMenu() {
        passSelect.innerHTML = '<option value="all" selected>Välj pass</option>';
        let allPasses = new Set(Object.values(facilityPasses).flat());
        allPasses.forEach(pass => {
            let option = document.createElement("option");
            option.value = pass.toLowerCase();
            option.textContent = pass;
            passSelect.appendChild(option);
        });
    }

    function updateSchedule() {
        const selectedFacility = facilitySelect.value;
        const selectedPass = passSelect.value.toLowerCase();

        schedules.forEach(schedule => {
            const facility = schedule.id.replace("schedule-", "");
            const hasFacility = selectedFacility === "all" || facility === selectedFacility;
            const hasPass = selectedPass === "all" || facilityPasses[facility].some(p => p.toLowerCase() === selectedPass);

            schedule.classList.toggle("active", hasFacility && hasPass);
        });
    }

    facilitySelect.addEventListener("change", updateSchedule);
    passSelect.addEventListener("change", updateSchedule);

    updatePassMenu();
    updateSchedule();

    //------------ Datumscroll och val ------------
    const dateList = document.getElementById("date-list");
    const datePicker = document.getElementById("date-picker");
    let currentCenterDate = new Date();

    function createDateItem(date) {
        let dateItem = document.createElement("div");
        dateItem.classList.add("date-item");
        dateItem.dataset.date = date.toISOString().split("T")[0];
        dateItem.textContent = date.toLocaleDateString("sv-SE", {weekday: "short", day: "numeric", month: "short"});
        dateItem.addEventListener("click", function () {
            updateSelectedDate(new Date(this.dataset.date));
        });
        return dateItem;
    }

    function generateDateList(selectedDate) {
        dateList.innerHTML = "";
        let startDate = new Date(selectedDate);
        startDate.setDate(startDate.getDate() - 3);

        for (let i = 0; i < 7; i++) {
            let dateItem = createDateItem(startDate);
            if (i === 3) dateItem.classList.add("selected");
            dateList.appendChild(dateItem);
            startDate.setDate(startDate.getDate() + 1);
        }

        centerSelectedDate();
    }

    function updateSelectedDate(date) {
        currentCenterDate = date;
        generateDateList(date);
        datePicker.value = date.toISOString().split("T")[0];
    }

    function centerSelectedDate() {
        const selected = document.querySelector(".date-item.selected");
        if (selected) {
            dateList.scrollLeft = selected.offsetLeft - (dateList.offsetWidth / 2) + (selected.offsetWidth / 2);
        }
    }

    function scrollDates(direction) {
        let newDate = new Date(currentCenterDate);
        newDate.setDate(newDate.getDate() + direction * 7);
        updateSelectedDate(newDate);
    }

    datePicker.addEventListener("change", function () {
        updateSelectedDate(new Date(this.value));
    });

    updateSelectedDate(new Date());
    window.scrollDates = scrollDates;
});
