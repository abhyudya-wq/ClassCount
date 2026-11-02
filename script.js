
// Get HTML Elements

const attendanceForm = document.getElementById("attendanceForm");

const totalClassesInput = document.getElementById("totalClasses");

const attendedClassesInput = document.getElementById("attendedClasses");

const requiredPercentageInput = document.getElementById("requiredPercentage");

const errorMessage = document.getElementById("errorMessage");

const results = document.getElementById("results");

const attendanceResult = document.getElementById("attendanceResult");

const statusResult = document.getElementById("statusResult");

const bunkResult = document.getElementById("bunkResult");

const recoveryResult = document.getElementById("recoveryResult");

const messageResult = document.getElementById("messageResult");


// Handle Form Submission

attendanceForm.addEventListener("submit", function(event) {

    // Prevent Page Refresh

    event.preventDefault();

    // Get User Input

    const totalClasses = Number(totalClassesInput.value);

    const attendedClasses = Number(attendedClassesInput.value);

    const requiredPercentage = Number(requiredPercentageInput.value);


    // Input Validation

    if (
        !Number.isInteger(totalClasses) ||
        !Number.isInteger(attendedClasses) ||
        !Number.isInteger(requiredPercentage) ||
        totalClasses <= 0 ||
        attendedClasses < 0 ||
        attendedClasses > totalClasses ||
        requiredPercentage < 1 ||
        requiredPercentage > 100
    ) {

        errorMessage.textContent =
            "Please enter valid whole numbers. Attended classes cannot exceed total classes, and required attendance must be between 1 and 100.";

        results.hidden = true;

        return;
    }


    // Calculate Attendance Percentage

    const attendancePercentage =
        (attendedClasses / totalClasses) * 100;


    // Calculate Maximum Allowable Absences

    let maximumAbsences = 0;

    if (attendancePercentage >= requiredPercentage) {

        maximumAbsences = Math.floor(
            (attendedClasses / (requiredPercentage / 100)) -
            totalClasses +
            0.000000001
        );

    }


    // Calculate Classes Needed for Recovery

    let recoveryClasses = 0;

    if (attendancePercentage < requiredPercentage) {

        if (requiredPercentage === 100) {

            recoveryClasses = "Not possible";

        } else {

            recoveryClasses = Math.ceil(
                (
                    requiredPercentage / 100 * totalClasses -
                    attendedClasses
                ) /
                (1 - requiredPercentage / 100)
            );

        }

    }


    // Determine Attendance Status

    let status = "";

    if (attendancePercentage >= requiredPercentage) {

        status = "Eligible";

    } else {

        status = "Below Requirement";

    }


    // Display Results

    attendanceResult.textContent =
        attendancePercentage.toFixed(2) + "%";

    statusResult.textContent = status;

if (attendancePercentage >= requiredPercentage) {
    statusResult.className = "status-eligible";
} else {
    statusResult.className = "status-below";
}

    bunkResult.textContent = maximumAbsences;

    recoveryResult.textContent = recoveryClasses;

    
    // Display Message

    if (attendancePercentage >= requiredPercentage) {

        messageResult.textContent =
            "Your attendance meets the required percentage. You can miss up to " +
            maximumAbsences +
            " more classes.";

    } else if (requiredPercentage === 100) {

        messageResult.textContent =
            "You must attend every future class. Reaching 100% is not possible after missing a class.";

    } else {

        messageResult.textContent =
            "Your attendance is below the required percentage. Attend the next " +
            recoveryClasses +
            " consecutive classes to reach your target.";

    }


    // Show Results

    errorMessage.textContent = "";

    results.hidden = false;

});


// Handle Reset Button

attendanceForm.addEventListener("reset", function() {

    errorMessage.textContent = "";

    results.hidden = true;

    messageResult.textContent = "";

});
