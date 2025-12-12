# Gotham City Universe Absolute

Welcome to the **Gotham City Universe Absolute** project! This is a web page that explores an alternate universe of Gotham City, showcasing its featured heroes, villains, and comics with a modern, card-centric (Bento Cards) design.

## 🌟 Features

This project is a single-page landing page that highlights the following:

* **Thematic Design:** Inspired by the DC Comics universe, with a focus on Gotham City and Batman, using a dark color palette with red accents.
* **Card Design (Bento Cards):** Attractive presentation of characters (Villains and Supers) and comics in a modular card layout.
* **Gotham City Section:** Information about the city and an illustrative map.
* **Intuitive Navigation:** Header navigation menu for quick access to the main sections.
* **Suggestions Form:** An interactive section with a video background, allowing users to submit suggestions for new characters or comics.
* **Multimedia Resources:** Uses images for characters and comics, a video in the suggestions form, and a video in the footer.
* **Responsiveness:** (Implicitly structured to be responsive, based on CSS structure and mobile menu implementation).

## 🛠️ Technologies Used

The project is built using fundamental web technologies:

* **HTML5:** Semantic page structure.
* **CSS3:** Styling, including CSS variables (`:root`), Flexbox for layout, and visual effects like `backdrop-filter` (for blur).
* **JavaScript:** For interactive functionalities (referenced in `gotham-form.js` and `gotham-menu.js`, although the JS code was not provided).
* **Font Awesome:** Iconography for the menu, login, and social media links.

## 📁 Project Structure
```bash
.
├── css/
│ └── styles.css
├── img/
│ ├── comics/
│ ├── heroes/
│ ├── icons/
│ ├── parallax/
│ ├── reference/
│ ├── villain/
│ └── wallpaper/
├── js/
│ ├── cards-animation.js
│ ├── firebase-setup.js
│ ├── gotham-form.js
│ ├── gotham-menu.js
│ ├── gotham-parallax.js
│ ├── gotham-windows-modal.js
│ ├── log-in-sign-up.js
│ ├── message-firebase.js
│ ├── scroll-animated.js
│ └── search-header.js
├── node_modules/
├── video/
│ └── experiment-video-bg.mp4
├── index.html
├── LICENSE
├── package-lock.json
├── package.json
└── README.md
```

## 🚀 Installation and Usage

To run this project on your local environment, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ixf2/Gotham-City-Webpage
    cd gotham-city-universe-absolute
    ```
2.  **Open the file:**
    Simply open the `index.html` file in your web browser. No local web server is required for this basic HTML/CSS/JS project.

    📸 Preview
<img width="1917" height="891" alt="image" src="https://media.discordapp.net/attachments/816190062345060364/1448062505900576798/image.png?ex=6939e4cd&is=6938934d&hm=f635b0453735452eee0e19c95b028cda475944d9370dfc28b40ef4e171da48d6&=&format=webp&quality=lossless&width=1724&height=864" />

### Default Credentials (development only)

To access the admin panel in development mode:

- **Email:** `admin@admin.com`  
- **Password:** `123456`

> ⚠️ *These credentials are for local development use only.  
> Do not use them in production.*

## 💡 References and Credits

The design, concept, and code were inspired by the following references (mentioned in the code comments):

### 🎨 Design & Inspiration
* [Dribbble - Bento Cards v2 AI](https://dribbble.com/shots/24297211-Bento-Cards-v2-AI)
* Content and themes based on:
    * [Marvel.com/characters](https://www.marvel.com/characters) – Although the content is DC/Gotham-themed
    * [DC Fandom Wiki](https://dc.fandom.com/wiki/Category:Waylon_Jones_(Absolute_Universe)/Appearances?from=V)
* CSS Modals & Layouts:
    * [AulaDiv – Modals Examples](https://auladiv.com/snippets/modales/index.html)
    * [W3Schools – CSS Modals Tutorial](https://www.w3schools.com/howto/howto_css_modals.asp)
* CSS Animations & Effects:
    * [CSS Houdini – 3D Card Flip Animation](https://www.sitepoint.com/css-houdini-3d-card-flip-animation/)
    * [Vanilla Tilt.js](https://micku7zu.github.io/vanilla-tilt.js/)
    * [Tilt.js](https://gijsroge.github.io/tilt.js/)

### 💻 JavaScript & DOM
* [MDN – JavaScript Guide](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide)
* [W3Schools – HTML DOM Reference](https://www.w3schools.com/js/js_htmldom.asp)
* [JavaScript.info – DOM and Events](https://javascript.info)
* [StackOverflow – What is DOM: Summary & Importance](https://stackoverflow.com/questions/4976344/what-is-dom-summary-and-importance)
* [MDN – TreeWalker API](https://developer.mozilla.org/en-US/docs/Web/API/TreeWalker)
* [MDN – Document Object Model Events](https://developer.mozilla.org/es/docs/Web/API/Document_Object_Model/Events)

### ✅ Validation & Storage
* Class video on LocalStorage & validation
* [GitHub – JavaScript Form Validation Example (@tcrurav)](https://github.com/tcrurav/JavaScriptFormValidationExample)

### 📚 Books & Extra Resources
* [JavaScript: The Definitive Guide, 6th Edition](https://pepa.holla.cz/wp-content/uploads/2016/08/JavaScript-The-Definitive-Guide-6th-Edition.pdf)
* [Eloquent JavaScript – Spanish Translation](https://eloquentjs-es.thedojo.mx)

### 🧑‍💻 Developers & Code Inspiration
* [@sdvictorvergara](https://github.com/sdvictorvergara)
* [@gunterdev](https://github.com/gunterdev)
* [@midudev](https://github.com/midudev)
* [@tcrurav](https://github.com/tcrurav)
* [@sheartnet](https://github.com/sheartnet)

---
**Note:** This is a static **front-end** project. The suggestions form requires server-side logic (back-end) or the use of an external service to actually process and store the submitted data.







