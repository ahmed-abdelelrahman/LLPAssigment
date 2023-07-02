const container = document.querySelector(".container");

const display = (assests) => {
  const newAssests = assests
    .map((tasks) => {
      const { title, description, content } = tasks;
      return `
         <div class='assest'>
           <h2>${title}</h2>
           <p classs="desc">${description}</p>
           
           <a herf=${content}>link</a>
         </div>
         `;
    })
    .join("");
  container.innerHTML = newAssests;
};

export default display;
