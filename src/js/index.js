import { projects } from "./projetos.js";

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = Array(200).fill().map(() => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    speed: Math.random() * 0.5 + 0.1
}));

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars)
}
animateStars()

try {
    const projetosContainer = document.querySelector('#projetos-lista');
    projects.forEach(projeto => {
        const div = document.createElement('div');
        div.className = 'card';

        if (projeto.imagem) {
            div.style.backgroundImage = `url('${projeto.imagem}')`;
            div.style.backgroundSize = 'cover';
            div.style.backgroundPosition = 'center';
            div.style.backgroundRepeat = 'no-repeat';
        }

        div.innerHTML = `
        <div class= "card-conteudo">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.descricao}</p>
        ${projeto.link ? `<a href="${projeto.link}" target="_blank">Ver Projeto</a>` : ""}
        </div>
    `;
        projetosContainer.appendChild(div);
    });
} catch (error) {
    console.error("Erro ao renderizar projetos:", error);
}

const fadeIns = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visivel");
        }
    });
}, { threshold: 0.2 });
fadeIns.forEach(el => observer.observe(el));