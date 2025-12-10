//Reference https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker
//Reference https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events
//Reference https://pepa.holla.cz/wp-content/uploads/2016/08/JavaScript-The-Definitive-Guide-6th-Edition.pdf
//Reference https://eloquentjs-es.thedojo.mx
//Reference to IA's for organizative the code, and details.

function clearHighlights() {
    document.querySelectorAll(".highlight").forEach(span => {
        span.replaceWith(span.textContent);
    });
}

function highlightFirst(container, regex) {
    const WALKER = document.createTreeWalker(
        container,
        NodeFilter.SHOW_TEXT
    );

    let node;
    while (node = WALKER.nextNode()) {
        const TEXT = node.textContent;
        const MATCH = TEXT.match(regex);

        if (!MATCH) continue;

        const INDEX = MATCH.index;
        const FOUND = MATCH[0];

        const BEFORE = TEXT.slice(0, INDEX);
        const AFTER = TEXT.slice(INDEX + FOUND.length);

        const SPAN = document.createElement("span");
        SPAN.className = "highlight";
        SPAN.textContent = FOUND;

        const FRAGMENT = document.createDocumentFragment();
        if (BEFORE) FRAGMENT.appendChild(document.createTextNode(BEFORE));
        FRAGMENT.appendChild(SPAN);
        if (AFTER) FRAGMENT.appendChild(document.createTextNode(AFTER));

        node.parentNode.replaceChild(FRAGMENT, node);

        // Scroll 
        SPAN.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return true;
    }

    return false;
}

document.querySelector(".search-page-submit").addEventListener("click", () => {
    clearHighlights();

    const INPUT = document.querySelector(".search-page");
    const WORD = INPUT.value.trim();
    if (!WORD) return;

    const REGEX = new RegExp(WORD, "i");

    const CONTAINER = document.body;

    const FOUND = highlightFirst(CONTAINER, REGEX);

    if (!FOUND) {
        alert("No se encontró esa palabra en la página.");
    }
});

//ENTER SEARCH
document.querySelector(".search-page").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
        document.querySelector(".search-page-submit").click();
    }
});

