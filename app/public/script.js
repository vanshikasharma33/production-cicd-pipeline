/*
    Production Infrastructure Monitoring
    Frontend behaviour
*/


// ======================================================
// ALERTMANAGER
// ======================================================

const ALERTMANAGER_URL = "http://13.50.250.84:9093";


// ------------------------------------------------------
// Check Alertmanager availability
// ------------------------------------------------------

async function checkAlertmanager() {

    const statusElements =
        document.querySelectorAll(".alert-value");

    try {

        const response =
            await fetch(
                `${ALERTMANAGER_URL}/api/v2/status`,
                {
                    method: "GET"
                }
            );

        if (!response.ok) {
            throw new Error("Alertmanager unavailable");
        }

        console.log("Alertmanager is online.");

    } catch (error) {

        console.warn(
            "Could not directly query Alertmanager:",
            error
        );

    }

}


// ======================================================
// GET ALERTS
// ======================================================

async function loadAlerts() {

    const firingElement =
        document.getElementById("firingAlerts");

    const totalElement =
        document.getElementById("totalAlerts");

    if (!firingElement || !totalElement) {
        return;
    }


    try {

        const response =
            await fetch(
                `${ALERTMANAGER_URL}/api/v2/alerts`
            );

        if (!response.ok) {
            throw new Error("Unable to retrieve alerts");
        }

        const alerts =
            await response.json();


        // Total alerts

        totalElement.textContent =
            alerts.length;


        // Firing alerts

        const firing =
            alerts.filter(
                alert =>
                    alert.status &&
                    alert.status.state === "active"
            );


        firingElement.textContent =
            firing.length;


    } catch (error) {

        console.warn(
            "Alertmanager API unavailable:",
            error
        );

        /*
            Keep the dashboard usable even if
            browser CORS prevents direct access.
        */

        firingElement.textContent = "0";
        totalElement.textContent = "0";

    }

}


// ======================================================
// INITIAL LOAD
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        checkAlertmanager();

        loadAlerts();

        /*
            Refresh alert information every 10 seconds.
        */

        setInterval(
            loadAlerts,
            10000
        );

    }
);


// ======================================================
// SMOOTH NAVIGATION
// ======================================================

document.querySelectorAll(
    '.nav a[href^="#"]'
).forEach(
    link => {

        link.addEventListener(
            "click",
            event => {

                const target =
                    document.querySelector(
                        link.getAttribute("href")
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    }
);
