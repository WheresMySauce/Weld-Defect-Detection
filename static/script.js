const container = document.getElementById('container');
const cameraBtn = document.getElementById('switchCmr');
const imageBtn = document.getElementById('switchImg');
cameraBtn.addEventListener('click', () => {
    container.classList.add("active");
});
imageBtn.addEventListener('click', () => {
    container.classList.remove("active");
});
$('#upload-form').hide();
$('#upload_button').click(function () {
    $("#fileinput").trigger('click');
});

$('#fileinput').change(function () {
    $('#upload-form').submit();
    $('#upload_hint').text('Sending file to server...');
    // $('#upload_hint').text('Sending file ' + $('#fileinput')[0].files[0].name + ' to server...');
});


// Get the modal

var popupButton = document.getElementById("show-result");
var popupWindow = document.getElementById("popup-window");
var closeButton = document.getElementById("close-button");
var resultContent = document.getElementById("result-content");


var class_name = document.getElementById("class-name");
var class_name_s1 = class_name.innerText;
var class_name_s2 = class_name_s1.replace(/'/g, '"');
var class_name_final = JSON.parse(class_name_s2);

var class_name_unique = new Set(class_name_final);

console.log(class_name_final);
// Show the pop-up window when the link is clicked
// popupButton.addEventListener("click", function(event) {
//     event.preventDefault();
//     popupWindow.style.display = "block";
// });
// // Hide the pop-up window when the close button is clicked
// closeButton.addEventListener("click", function() {
//     popupWindow.style.display = "none";
// });

var action_dict = {
    "car": {
        "Preventive Action": [
            "Increase amps/volts.",
            "Decrease travel speed.",
            "Maintain appropriate arc length/wire stickout.",
            "Adjust torch/rod angle.",
            "Ensure previous beads are free of overlap (bead roll-over) and slag prior to welding additional passes."
        ],
        "Corrective Action": [
            "Grind or carbon arc the weld to sound metal.",
            "Weld repair the affected area."
        ]
    },
    "roughness": {
        "Preventive Action": [
            "Adjust amps/volts.",
            "Maintain a consistent travel speed.",
            "Maintain appropriate arc length/wire stickout.",
            "Adjust torch/rod angle.",
            "Sequence weld passes so that the toes of the beads sufficiently cover one another, minimizing valleys.",
            "Consult local Welding Engineering in cases where the base material is magnetized."
        ],
        "Corrective Action": [
            "Grind or carbon arc the weld to sound metal.",
            "Weld repair the affected area, if needed."
        ]
    },
    "slag": {
        "Preventive Action": [
            "Adjust amps/volts.",
            "Maintain a consistent travel speed.",
            "Maintain an appropriate arc length/wire stick- out.",
            "Adjust torch/rod angle.",
            "Sequence weld passes so that the toes of the beads sufficiently overlap one another, minimizing valleys."
        ],
        "Corrective Action": [
            "Completely remove slag from all intermediate weld areas.",
            "Remove all loose slag with a needle gun.",
            "Grind all tightly adhering, unacceptable slag from the surface of the base material or weld."
        ]
    },
    "undercut": {
        "Preventive Action": [
            "Decrease amps/volts.",
            "Decrease travel speed.",
            "Maintain appropriate arc length/wire stickout.",
            "Adjust torch/rod angle.",
            "Feed more wire into the puddle when manual TIG welding.",
            "Increase stop time (dwell time) on weaved beads",
            "Use undercut gauge to verify acceptability."
        ],
        "Corrective Action": [
            "Grind the toe of the weld until the unacceptable undercut blends smoothly into the base material.",
            "Weld repair the affected area, if needed."
        ]
    },
    "spatter": {
        "Preventive Action": [
            "Remove contaminants from the joint (rust, grease, moisture, etc.) prior to welding.",
            "Maintain filler metal control requirements.",
            "Use Refrasil to protect surrounding surfaces from secondary weld spatter.",
            "Adjust amps/volts.",
            "Adjust torch/rod angle.",
            "Maintain appropriate arc length/wire stickout.",
            "Use ceramic tape or approved metal backing strap on areas with root gap.",
            "Consult local Welding Engineering in cases where the base material is magnetized."
        ],
        "Corrective Action": [
            "Completely remove spatter from all intermediate weld areas.",
            "Remove all loose spatter with a needle gun.",
            "Grind all tightly adhering, unacceptable spatter until it blends smoothly into the base material or weld."
        ]
    }
};

// Function to display actions in the modal
function displayActions(item) {
    if (action_dict.hasOwnProperty(item)) {
        var preventiveActions = action_dict[item]["Preventive Action"];
        var correctiveActions = action_dict[item]["Corrective Action"];

        return `
            <p><strong>Preventive Actions for ${item}:</strong></p>
            <ul>${preventiveActions.map(action => `<li>${action}</li>`).join('')}</ul>
            <p><strong>Corrective Actions for ${item}:</strong></p>
            <ul>${correctiveActions.map(action => `<li>${action}</li>`).join('')}</ul>
        `;
    } else {
        return `<p>No actions found for: ${item}</p>`;
    }
}

// Show the pop-up window when the button is clicked
popupButton.addEventListener("click", function(event) {
    event.preventDefault();
    // Get unique items from the inputArray
    var uniqueItems = Array.from(new Set(class_name_final));
    // Display actions for each unique item
    resultContent.innerHTML = "";
    uniqueItems.forEach(function(item) {
        resultContent.innerHTML += displayActions(item);
    });
    popupWindow.style.display = "block";
});

// Hide the pop-up window when the close button is clicked
closeButton.addEventListener("click", function() {
    popupWindow.style.display = "none";
});

// // Show the pop-up window when the link is clicked
// popupButton.addEventListener("click", function(event) {
//     event.preventDefault();

//     // Clear previous content
//     classInfo.innerHTML = "";

//     // Iterate through the detected classes and display information
//     class_name_final.forEach(function(className) {
//         if (action_dict.hasOwnProperty(class_name_final)) {
//             var actions = action_dict[class_name_final];
//             var htmlContent = "<h3>" + class_name_final + "</h3>";
            
//             // Display preventive actions
//             htmlContent += "<h4>Preventive Action:</h4><ul>";
//             actions['Preventive Action'].forEach(function(action) {
//                 htmlContent += "<li>" + action + "</li>";
//             });
//             htmlContent += "</ul>";
            
//             // Display corrective actions
//             htmlContent += "<h4>Corrective Action:</h4><ul>";
//             actions['Corrective Action'].forEach(function(action) {
//                 htmlContent += "<li>" + action + "</li>";
//             });
//             htmlContent += "</ul>";

//             classInfo.innerHTML += htmlContent;
//         }
//     });

//     popupWindow.style.display = "block";
// });

// // Hide the pop-up window when the close button is clicked
// closeButton.addEventListener("click", function() {
//     popupWindow.style.display = "none";
// });
