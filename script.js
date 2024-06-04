const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image();
let x = window.innerWidth / 2;
let y = window.innerHeight / 2;
let dx = 1;  // change for speed
let dy = 1;
const imgWidth = 100;
const imgHeight = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas(); 

window.addEventListener('resize', resizeCanvas);

document.getElementById('file-upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
            x = (canvas.width - imgWidth) / 2;
            y = (canvas.height - imgHeight) / 2;
            animate();
        };
    };
    reader.readAsDataURL(file);
});

canvas.addEventListener('dragover', (event) => {
    event.preventDefault();
});

canvas.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
            x = (canvas.width - imgWidth) / 2;
            y = (canvas.height - imgHeight) / 2;
            animate();
        };
    };
    reader.readAsDataURL(file);
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
}

function animate() {
    draw();
    x += dx;
    y += dy;

    if (x + imgWidth >= canvas.width || x <= 0) {
        dx *= -1;
    }
    if (y + imgHeight >= canvas.height || y <= 0) {
        dy *= -1;
    }

    requestAnimationFrame(animate);
}
document.addEventListener('click', () => {
    document.getElementById('file-upload').click();
});
