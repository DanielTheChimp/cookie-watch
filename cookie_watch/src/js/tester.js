import { CROSS_SITE, TIMEOUT } from "./const.js";
import { all_tests } from "./all_tests.js";

window.onload = () => {
    generate_buttons();
};

const generate_buttons = () => {
    // Connect "Run All Tests" Button
    let btn = document.getElementById("run_all");
    btn.onclick = function() { run_all_tests(); };

    // Generate "Single-Test" Buttons
    let GRID_SIZE = 4;

    div = document.getElementById("tests");
    let current = 0;
    let current_grid = null;

    // Alphabetic sort
    // all_tests.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    
    for(let test of all_tests) {
        if(current == 0) {
            current_grid = document.createElement("div");
            current_grid.className = "grid";
            div.append(current_grid);
            current = GRID_SIZE;
        }

        btn = document.createElement("button");
        btn.className = "secondary";
        btn.onclick = function() { run_single_test(test.name); };
        btn.textContent = test.name;

        current_grid.append(btn);
        current -= 1;
    }

    // Fill last grid for equally sized buttons
    while(current) {
        spn = document.createElement("span");
        current_grid.append(spn);
        current -= 1;
    }
};

const openPopup = () => {
    let popup = window.open(
        'about:blank',
        'targetWindow',
        `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,left=${screen.width-250},width=250,height=250`
    );
    return popup
};

const run_single_test = async (test_name) => {
    status_busy();
    all_buttons_disabled();
    let popup = null;

    for(let test of all_tests) {
        if(test.name == test_name) {
            if(test.popup) {
                popup = openPopup();
            }
            
            await run_test(test);
            await new Promise(r => setTimeout(r, TIMEOUT));

            if(test.popup) {
                popup.close();
            }
            
            status_result(true, test_name + " completed.");
            all_buttons_disabled(false);
            return;
        }
    }
};

const run_all_tests = async () => {
    all_buttons_disabled();
    number_of_tests = all_tests.length;
    let popup = openPopup();

    for (let i = 0; i < number_of_tests; i++) {
        status_busy("Running Test " + (i+1) + " / " + number_of_tests);
        await run_test(all_tests[i]);
        await new Promise(r => setTimeout(r, TIMEOUT));
    }

    popup.close();
    status_result(true, "All tests completed.");
    all_buttons_disabled(false);
};

const run_test = async (test) => {
    let {name, browser, path, run} = test;

    return run(CROSS_SITE + path);
};