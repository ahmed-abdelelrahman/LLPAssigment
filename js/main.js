import displayAssests from "./displayAssests.js";

const container = document.querySelector(".container");

const asset = document.createElement("div");
const threadDiv = document.createElement("div");
const button = document.createElement("button");
const panel = document.createElement("div");
const p = document.createElement("p");
const subThread = document.createElement("button");
const summary = document.createElement("div");
const h2summary = document.createElement("div");

const textsummary = document.createElement("input");
const iframe = document.createElement("iframe");
const articleDiv = document.createElement("form");
const labelArticle = document.createElement("label");
const inputArticle = document.createElement("input");
const labelArticle2 = document.createElement("label");
const textareaArticle = document.createElement("textarea");
const script = document.createElement("script");
// const SAdiv = document.createElement("div");
const SAButton = document.createElement("button");
const SApanel = document.createElement("div");
const textElement = document.createElement("p");
var link = document.createElement("a");
link.href = "#";
link.textContent = "See More";
const SApanel2 = document.createElement("div");
const SApanelh2 = document.createElement("div");
const SApanelp = document.createElement("p");

button.classList.add("accordion");
panel.classList.add("panel");
subThread.classList.add("add-note");
summary.classList.add("summary");
h2summary.classList.add("h2summary");
textsummary.classList.add("textsummary");
iframe.classList.add("iframe");
labelArticle2.classList.add("labelArticle2");
SAButton.classList.add("saaccorion");
SApanel.classList.add("sapanel");
SApanelh2.classList.add("SApanelh2");
SApanelp.classList.add("SApanelp");
SApanel2.classList.add("SApanel2");

button.innerHTML = "Thread A";
subThread.innerHTML = "+ sub-thread";
link.innerHTML = "see more";
labelArticle.innerHTML = "Title";
labelArticle2.innerHTML = "content";
textElement.innerHTML = "The 4SA Method , How to bring a idea into progress ?";
SAButton.innerHTML = "Introduction";
h2summary.innerHTML = "summary for thread A";
SApanelh2.innerHTML = "Example 1";
SApanelp.innerHTML =
  "How are you going to develop your stratergy ? Which method are you going to use to develop a stratergy ? What if the project is lengthy?";
textsummary.setAttribute("cols", "55");
textsummary.setAttribute("rows", "45");
textsummary.setAttribute("placeholder", "enter text here");
inputArticle.setAttribute("type", "text");
textareaArticle.setAttribute("name", "content");

panel.appendChild(subThread);
threadDiv.append(button, panel, summary);
summary.append(h2summary, textsummary);
articleDiv.append(
  labelArticle,
  inputArticle,
  labelArticle2,
  textareaArticle,
  script
);
SApanel2.append(SApanelh2, SApanelp);
SApanel.append(textElement, SApanel2, link);

const fetchApi = async () => {
  await fetch("js/api.json")
    .then((response) => {
      return response.json();
    })
    .then((obj) => {
      console.log(obj.tasks[0].assets);
      const assestsContainer = obj.tasks[0].assets
        .map((asset) => {
          const {
            asset_title,
            asset_description,
            asset_content,
            asset_content_type,
          } = asset;
          iframe.setAttribute("src", `${asset_content}`);
          iframe.setAttribute("frameborder", "0");
          return `
          <article class='card ${asset_content_type}'>
          <div class="h2">${asset_title}
          
          <i class="fas fa-info-circle"></i>
          </div>
          <p classs="desc">Description: ${asset_description}</p>
          
          
          </article>
          `;
        })
        .join("");

      container.innerHTML = assestsContainer;

      // threadbuilder section task1
      const threadbuilder = document.querySelector(".threadbuilder");
      threadbuilder.appendChild(threadDiv);

      const article2 = document.querySelector(".article2");
      article2.append(SAButton, SApanel);

      addAccordionListener("saaccorion");
      addAccordionListener("accordion");

      // functionlaity of subthread

      getNotes().forEach((note) => {
        const noteElement = createNoteElement(note.id, note.content);
        panel.insertBefore(noteElement, subThread);
      });

      subThread.addEventListener("click", () => addNote());

      function getNotes() {
        return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
      }

      function saveNotes(notes) {
        localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
      }

      function createNoteElement(id, content) {
        const element = document.createElement("textarea");

        element.classList.add("note");
        element.value = content;
        element.placeholder = "enter text here";

        element.addEventListener("change", () => {
          updateNote(id, element.value);
        });

        element.addEventListener("dblclick", () => {
          const doDelete = confirm(
            "Are you sure you wish to delete this sticky note?"
          );

          if (doDelete) {
            deleteNote(id, element);
          }
        });

        return element;
      }

      function addNote() {
        const notes = getNotes();
        const noteObject = {
          id: Math.floor(Math.random() * 100000),
          content: "",
        };

        const noteElement = createNoteElement(
          noteObject.id,
          noteObject.content
        );
        panel.insertBefore(noteElement, subThread);

        notes.push(noteObject);
        saveNotes(notes);
      }

      function updateNote(id, newContent) {
        const notes = getNotes();
        const targetNote = notes.filter((note) => note.id == id)[0];

        targetNote.content = newContent;
        saveNotes(notes);
      }

      function deleteNote(id, element) {
        const notes = getNotes().filter((note) => note.id != id);

        saveNotes(notes);
        panel.removeChild(element);
      }
      const video = document.querySelector(".video");
      video.appendChild(iframe);

      // asset card number 3
      const article = document.querySelector(".article");
      article.appendChild(articleDiv);

      // asset card number 4

      script.innerHTML = "CKEDITOR.replace('content');";

      articleDiv.appendChild(script);

      function toggleText(event) {
        // prevent link from refresh the page

        event.preventDefault();
        if (SApanel2.style.display === "none") {
          SApanel2.style.display = "block";
          link.textContent = "See Less";
        } else {
          SApanel2.style.display = "none";
          link.textContent = "See More";
        }
      }

      link.onclick = toggleText;
    })
    .catch((error) => {
      console.error("something went wrong");
      console.error(error);
    });
};

// function for accordion
function addAccordionListener(elementClass) {
  var acc = document.getElementsByClassName(elementClass);
  console.log("need more power man");

  for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

window.addEventListener("load", fetchApi());
