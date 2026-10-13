"use strict";

function formatProjectName(slug) {
    return slug
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

if (typeof document !== "undefined") {
    const heading = document.querySelector("[data-project-title]");

    if (heading) {
        heading.textContent = formatProjectName(
            heading.dataset.projectTitle || "critical-thinking-project"
        );
    }
}

module.exports = { formatProjectName };