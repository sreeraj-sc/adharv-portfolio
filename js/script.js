let menu = document.querySelector("#menu-btn");
let header = document.querySelector(".header");
let themeToggler = document.querySelector("#theme-toggler");

// Toggle menu functionality
menu.onclick = () => {
  menu.classList.toggle("fa-times");
  header.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  header.classList.remove("active");
};

// Theme toggle functionality
themeToggler.onclick = () => {
  themeToggler.classList.toggle("fa-sun");
  document.body.classList.toggle("active");
};

console.log("loaded");

// Typing animation
const typed = document.querySelector(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 100,
  });
}

// Function to fetch Medium blogs
async function fetchMediumBlogs() {
  const mediumFeedUrl =
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@adharvkt";
  const blogContainer = document.getElementById("medium-posts");

  try {
    const response = await fetch(mediumFeedUrl);
    const data = await response.json();

    if (data.status === "ok") {
      const posts = data.items;
      blogContainer.innerHTML = ""; // Clear previous content

      posts.forEach((post) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("box"); // Flash card styling like services section

        // Extract image from content
        const imageMatch = post.content.match(/<img[^>]+src="([^">]+)"/);
        const imageUrl = imageMatch ? imageMatch[1] : "";

        blogCard.innerHTML = `
          <i class="fas fa-newspaper"></i> 
          ${
            imageUrl
              ? `<img src="${imageUrl}" alt="${post.title}" style="width: 100%; border-radius: 0.5rem; margin-bottom: 1rem;">`
              : ""
          }
          <h3>${post.title}</h3>
          <p>${post.content
            .replace(/(<([^>]+)>)/gi, "")
            .substring(0, 300)}...</p>
        `;

        blogContainer.appendChild(blogCard);
      });
    } else {
      blogContainer.innerHTML =
        "<p>Failed to load blogs. Please try again later.</p>";
    }
  } catch (error) {
    console.error("Error fetching Medium blogs:", error);
    blogContainer.innerHTML =
      "<p>Failed to load blogs. Please try again later.</p>";
  }
}

// ✅ Combine both functions inside a single `window.onload`
window.onload = () => {
  document.body.classList.add("active"); // Ensures the theme toggler works on first click
  fetchMediumBlogs(); // Fetch blog posts on page load
};
