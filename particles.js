class Canvas {
    constructor() {
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.mouse = {
            x: null,
            y: null,
            r: (window.innerWidth / 80) * (window.innerHeight / 80)
        };
    }

    styleCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    events() {
        let w = window.innerWidth;

        window.addEventListener("resize", () => {
            if(w !== window.innerWidth) {
                this.styleCanvas();
                this.mouse.r = (this.canvas.width / 80) * (this.canvas.height / 80);
            }
        })

        window.addEventListener("mousemove", (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;            
        })
    }

    draw() {
        let n = 30;
        for (let i = 0; i < n; i++) {
            const size = (Math.random() * 5) + 1;
            const x = (Math.random() * ((this.canvas.width - size * 2) - (size * 2)) + size * 2);
            const y = (Math.random() * ((this.canvas.height - size * 2) - (size * 2)) + size * 2);
            const dirX = (Math.random() * 5) - 2.5;
            const dirY = (Math.random() * 5) - 2.5;
            const color = "#000000";

            this.particles.push(new Particle(x, y, dirX, dirY, size, color, this.mouse));   
        }
    }

    connect() {
        let opacity = 1;

        for (let a = 0; a < this.particles.length; a++) {
            const pA = this.particles[a];
            
            for (let b = 0; b < this.particles.length; b++) {
                const pB = this.particles[b];
                
                const dist = ((pA.x - pB.x) * (pA.x - pB.x)) + ((pA.y - pB.y) * (pA.y - pB.y));
                
                if(dist < (this.canvas.width / 7) * (this.canvas.height / 7)) {
                    opacity = 1 - (dist / 20000);
                    
                    this.ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                    this.ctx.beginPath();
                    this.ctx.moveTo(pA.x, pA.y);
                    this.ctx.lineTo(pB.x, pB.y);
                    this.ctx.stroke();

                }
            }
        }
    }

    animate() { 
        gsap.ticker.add(() => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (let i = 0; i < this.particles.length; i++) {
                const particle = this.particles[i];
                particle.update();
                this.connect();                
            }
        }, false, true);

    }

    init() {
        this.styleCanvas();
        this.events();
        this.draw();
        this.animate();
    }
}

class Particle  extends Canvas {
    constructor(x, y, dirX, dirY, size, color, mouse) {
        super();
        this.x = x;
        this.y = y;
        this.dirX = dirX,
        this.dirY = dirY;
        this.size = size;
        this.color = color;
        this.mouse = mouse;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false),
        this.ctx.fillStyle = "#000000";
        this.ctx.fill();
    }

    move() {
         // Check if Particles are within the canvas
         if(this.x > this.canvas.width || this.x < 0) this.dirX = - this.dirX;
         if(this.y > this.canvas.height || this.y < 0) this.dirY = - this.dirY;
 
         // Check collision detection - mouse position
         let dx = this.mouse.x - this.x;
         let dy = this.mouse.y - this.y;
         let distance = Math.sqrt(dx * dx + dy * dy);
 
         if(distance < this.mouse.r + this.size) {
             if(this.mouse.x < this.x && this.x < this.canvas.width - this.size * 10) {
                 this.x += 10;
             }
             if(this.mouse.x > this.x && this.x > this.size * 10) {
                 this.x -= 10;
             }
 
             if(this.mouse.y < this.y && this.y < this.canvas.height - this.size * 10) {
                 this.y += 10;
             }
             if(this.mouse.y > this.y && this.y > this.size * 10) {
                 this.y -= 10;
             }
         }
 
         // Move particles
         this.x += this.dirX;
         this.y += this.dirY;

         console.log(this.mouse.x);
         
    }

    update() {
        this.move();
        this.draw();
    }
}



const canvas = new Canvas();
canvas.init();