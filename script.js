const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
let particles = [];
const snowflake = new Image();
snowflake.src = 'https://pngimg.com/uploads/snowflakes/snowflakes_PNG7580.png';

function resizeCanvas() {
    canvas.width = window.innerWidth / 1.5;
    canvas.height = window.innerHeight / 1.5;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function Particle() {
    this.t = 0;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * (canvas.height + 800) - 800;
    this.size = Math.random() * 25 + 10;
    this.speedY = Math.random() * 2 + 1;
    this.speedX = Math.random();
    this.angleY = Math.random() * 360;
    this.angleZ = Math.random() * 360;
    this.opacity = 0;
    this.def = 0;
    this.defs = 0;
    this.rnd = Math.random();
    this.rnds = Math.random();
}

Particle.prototype.draw = function () {
    ctx.save();
    this.t += 0.001;
    this.def = (this.rnd * Math.sin(this.t)) * 0.4 + 0.6;
    this.defs = (this.rnds * Math.cos(this.t)) * 0.4 + 0.6;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angleY * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;
    const rotateYDeg = this.angleY % 360;
    if (true) {
        ctx.scale(this.def, this.defs);
    }
    ctx.drawImage(snowflake, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.scale(1, 1);
    ctx.globalAlpha = 1;
    ctx.restore();
};

Particle.prototype.update = function () {
    if (this.opacity < 0.9) {
        this.opacity += 0.01;
    }
    this.t += 0.04;
    this.y += this.speedY + (Math.cos(this.t) * 0.5);
    this.x += this.speedX + Math.sin(this.t);
    this.angleY += 1;
    this.angleZ += 1;

    if (this.y > canvas.height) {
        this.y = -this.size;
        this.x = Math.random() * canvas.width;
    }
};

function createParticles() {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animate);
}

setInterval(createParticles, 125);
animate();
