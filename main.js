"use strict";

class Scan {
  constructor() {
    this.canvas = document.getElementById("hero-canvas");
    this.svg = document.getElementById("hero-svg");
    this.svgDots = this.svg.querySelectorAll("circle");
    this.dots = [];
    this.lines = [];
    this.ctx = this.canvas.getContext("2d");
    this._size = {
      w: window.innerWidth,
      h: window.innerHeight,
    };
    this.size = {};
    this.mouse = {
      x: null,
      y: null,
      r: (this._size.w / 80) * (this._size.h / 80),
    };
  }

  get size() {
    return this._size;
  }

  set size(obj) {
    if (Object.keys(obj).length) this._size = obj;

    this.canvas.width = this._size.w;
    this.canvas.height = this._size.h;

    return this._size;
  }

  setDots() {
    this.svgDots.forEach((d, i) => {
      d.setAttribute("data-dot", i);
      const rect = d.getBoundingClientRect();
      const x = rect.left + (rect.width / 2 + (window.innerWidth - document.documentElement.clientWidth) / 1.5);
      const y = rect.top + rect.height / 2;
      const r = Number(d.getAttribute("r"));      

      const dot = new Dot();
      dot.visible = d.getAttribute("data-dot-visibility") === "hidden" ? false : true;
      dot.id = i;
      dot.x = x;
      dot.y = y;
      dot.r = r;

      this.dots.push(dot);
    });

    this.dots.forEach((d) => (d.dots = this.dots));    
  }

  setLines() {
    this.dots.forEach((d) => {
      if (d.id === 0) {
        this.setLine(d, this.dots[1]);
        this.setLine(d, this.dots[2]);
        this.setLine(d, this.dots[3]);
      }

      if (d.id === 1) {
        this.setLine(d, this.dots[3]);
        this.setLine(d, this.dots[4]);
        this.setLine(d, this.dots[5]);
        this.setLine(d, this.dots[6]);
      }

      if (d.id === 2) {
        this.setLine(d, this.dots[3]);
        this.setLine(d, this.dots[4]);
        this.setLine(d, this.dots[7]);
      }
      
      if (d.id === 3) {
        this.setLine(d, this.dots[4]);
      }

      if (d.id === 4) {
        this.setLine(d, this.dots[5]);
        this.setLine(d, this.dots[7]);
        this.setLine(d, this.dots[9]);
      }
      
      if (d.id === 5) {
        this.setLine(d, this.dots[6]);
        this.setLine(d, this.dots[9]);
      }
      
      if (d.id === 6) {
        this.setLine(d, this.dots[10]);
      }

      if (d.id === 7) {
        this.setLine(d, this.dots[8]);
        this.setLine(d, this.dots[9]);
      }

      if (d.id === 8) {
        this.setLine(d, this.dots[14]);
      }

      if (d.id === 9) {
        this.setLine(d, this.dots[12]);
        this.setLine(d, this.dots[13]);
        this.setLine(d, this.dots[15]);
        this.setLine(d, this.dots[17]);
        this.setLine(d, this.dots[18]);
        this.setLine(d, this.dots[20]);
        this.setLine(d, this.dots[22]);
      }

      if (d.id === 10) {
        this.setLine(d, this.dots[11]);
      }

      if (d.id === 11) {
        this.setLine(d, this.dots[15]);
        this.setLine(d, this.dots[16]);
      }

      if (d.id === 12) {
        this.setLine(d, this.dots[11]);
      }

      if (d.id === 13) {
        this.setLine(d, this.dots[14]);
      }

      if (d.id === 14) {
        this.setLine(d, this.dots[18]);
        this.setLine(d, this.dots[23]);
      }

      if (d.id === 15) {
        this.setLine(d, this.dots[16]);
        this.setLine(d, this.dots[20]);
        this.setLine(d, this.dots[21]);
      }

      if (d.id === 16) {
        this.setLine(d, this.dots[21]);
      }

      if (d.id === 17) {
        this.setLine(d, this.dots[19]);
        this.setLine(d, this.dots[20]);
        this.setLine(d, this.dots[22]);
      }

      if (d.id === 18) {
        this.setLine(d, this.dots[22]);
        this.setLine(d, this.dots[23]);
      }

      if (d.id === 19) {
        this.setLine(d, this.dots[24]);
      }

      if (d.id === 20) {
        this.setLine(d, this.dots[21]);
        this.setLine(d, this.dots[26]);
      }

      if (d.id === 21) {
        this.setLine(d, this.dots[26]);
      }

      if (d.id === 22) {
        this.setLine(d, this.dots[23]);
        this.setLine(d, this.dots[27]);
      }

      if (d.id === 23) {
        this.setLine(d, this.dots[27]);
      }

      if (d.id === 24) {
        this.setLine(d, this.dots[25]);
        this.setLine(d, this.dots[26]);
        this.setLine(d, this.dots[27]);
      }

      if (d.id === 25) {
        this.setLine(d, this.dots[26]);
        this.setLine(d, this.dots[27]);
      }
    });
  }

  setLine(startDot, endDot) {
    const line = new Line();
    line.startDot = startDot;
    line.endDot = endDot;
    line.startX = line.startDot.x;
    line.startY = line.startDot.y;
    line.endX = line.endDot.x;
    line.endY = line.endDot.y;
    this.lines.push(line);
  }

  update() {
    // gsap.ticker.add(() => {
      this.clear();

      this.dots.forEach((d) => {
        d.mouse.x = this.mouse.x;
        d.mouse.y = this.mouse.y;

        d.create();
      });

      this.lines.forEach((l) => {
        this.dots.forEach(d => {
          if(d.id === l.startDot.id) {
            l.startX = d.x;
            l.startY = d.y;
          }
          if(d.id === l.endDot.id) {
            l.endX = d.x;
            l.endY = d.y;
          }
        });

        l.create();

      });
    // });
  }

  animation() {
    gsap.fromTo(this.dots, {
      opacity: 0
    },{
      delay: 0.5,
        opacity: 1,
        duration: 0.5,
        ease: "sine.inOut",
        stagger: {
          each: 0.13,
          from: "start",
          onComplete: function() {
            const d = this.targets()[0];
            const tl = gsap.timeline();

            tl.to(this.targets()[0], {
              x: () => d.x + gsap.utils.random(-5, 5),
              y: () => d.y + gsap.utils.random(-5, 5),
              repeat: -1,
              repeatRefresh: true,
              yoyo: true,
              delay: 0.1,
              duration: 3,
              ease: "power1.inOut"
            });

            d.animation = tl;
            d.collide = true;
          }
        },
      });

    gsap.to(this.lines, {
      delay: 0.3,
      progress: 1,
      duration: 1,
      ease: "expo.inOut",
      stagger: 0.07,
    });

  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  mousemove() {
    window.addEventListener("mousemove", (event) => {
      this.mouse.x = event.clientX;
      this.mouse.y = event.clientY;      
    });
  }

  destroy() {
    this.clear();
    this.dots.forEach(d => !d.animation ? null : d.animation.kill());
    this.dots = [];
    this.lines = [];
    gsap.ticker.remove(this.update.bind(this));
  }

  init() {
    this.setDots();
    this.setLines();
    this.update();
    this.animation();
    this.mousemove();
    gsap.ticker.add(this.update.bind(this));
  }
}

class Dot extends Scan {
  constructor() {
    super();
    this._id = "";
    this.id = "";

    this._x = 0;
    this.x = 0;
    this.originalX = 0;
    
    this._y = 0;
    this.y = 0;
    this.originalY = 0;

    this._r = 0;
    this.r = 0;

    this._dots = [];

    this._revealed = false;
    this.revealed = false;

    this._opacity = 1;

    this._visible = true;

    this._collide = false;

    this.mouse.x = 0;
    this.mouse.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.maxDistance = 100;
    this.effectStrength = 20;
    this.animation = null;
  }

  get visible() {
    return this._visible;
  }

  set visible(val) {
    return (this._visible = val);
  }

  get collide() {
    return this._collide;
  }

  set collide(val) {
    return (this._collide = val);
  }

  get x() {
    return this._x;
  }

  set x(val) {
    this.originalX = val;
    return (this._x = val);
  }

  get y() {
    return this._y;
  }

  set y(val) {
    this.originalY = val;
    return (this._y = val);
  }

  get r() {
    return this._r;
  }

  set r(val) {
    return (this._r = val);
  }

  get id() {
    return this._id;
  }

  set id(val) {
    return (this._id = val);
  }

  get dots() {
    return this._dots;
  }

  set dots(val) {
    return (this._dots = val);
  }

  get revealed() {
    return this._revealed;
  }

  set revealed(val) {
    return (this._revealed = val);
  }

  get opacity() {
    return this._opacity;
  }

  set opacity(val) {
    return (this._opacity = val);
  }

  create() {

    this.mouseCollision();

    const gradient = this.ctx.createRadialGradient(
      this._x,
      this._y,
      this._r * 0.1,
      this._x,
      this._y,
      this._r
    );

    gradient.addColorStop(0, `rgba(255, 255, 255, ${this._opacity})`);
    gradient.addColorStop(1, "rgba(255, 86, 0, 0)");

    this.ctx.beginPath();
    this.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);

    if (!this._visible) this.ctx.fillStyle = "rgba(255, 255, 255, 0)";
    else this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();
  }

  mouseCollision() {
    if(!this._collide) return;

    // Calculate the distance from the mouse to the dot
    this.dx = this.x - this.mouse.x;
    this.dy = this.y - this.mouse.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);

    // If the mouse is close enough, move the dot
    if (this.distance < this.maxDistance) {
      // Calculate the direction vector (normalized)
      const angle = Math.atan2(this.dy, this.dx);
      const moveX = Math.cos(angle) * this.effectStrength * (1 - this.distance / this.maxDistance);
      const moveY = Math.sin(angle) * this.effectStrength * (1 - this.distance / this.maxDistance);

      // Apply movement to the dot's position
      this._x = this.originalX + moveX;
      this._y = this.originalY + moveY;
    } else {
      // Restore dot to original position if mouse is far
      this._x = this.originalX;
      this._y = this.originalY;
    }
  }
}

class Line extends Scan {
  constructor() {
    super();
    this._startX = 0;
    this._endX = 0;
    this._startY = 0;
    this._endY = 0;
    this._progress = 0;
    this._startDot = null;
    this._endDot = null;
  }

  get startX() {
    return this._startX;
  }

  set startX(val) {
    return (this._startX = val);
  }

  get startY() {
    return this._startY;
  }

  set startY(val) {
    return (this._startY = val);
  }

  get endX() {
    return this._endX;
  }

  set endX(val) {
    return (this._endX = val);
  }

  get endY() {
    return this._endY;
  }

  set endY(val) {
    return (this._endY = val);
  }

  get progress() {
    return this._progress;
  }

  set progress(val) {
    return (this._progress = val);
  }

  get startDot() {
    return this._startDot;
  }

  set startDot(val) {
    return (this._startDot = val);
  }

  get endDot() {
    return this._endDot;
  }

  set endDot(val) {
    return (this._endDot = val);
  }

  create() {
    const gradient = this.ctx.createRadialGradient(
      this._startX,
      this._startY,
      32,
      this._endX,
      this._endY,
      16
    );
    gradient.addColorStop(0.9, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");

    this.ctx.beginPath();
    this.ctx.moveTo(this._startX, this._startY);
    this.ctx.lineTo(
      this._startX + (this._endX - this._startX) * this._progress,
      this._startY + (this._endY - this._startY) * this._progress
    );
    this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    this.ctx.lineWidth = 0.9;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

class Focus {
  constructor(cb) {
    this.svg = document.getElementById("hero-svg");
    this.edges = this.svg.querySelectorAll(".svg-edges rect")
    this.container = document.querySelector(".edges-container");
    this.imgs = this.container.querySelectorAll(".edges-container .img-wrapper");
    this.face = this.svg.querySelector(".svg-face");
    this.animating = false;
    this.tl = gsap.timeline();

    this.setPosition();
    this.animate(cb);
  }

  setPosition() {
    this.edges.forEach((edge) => {
      const img = this.container.querySelector(`[data-img='${edge.getAttribute("data-img")}']`);      
      const top = Math.abs(this.getRect(edge).top - this.getRect(this.container).top) + "px";
      const left = Math.abs(this.getRect(edge).left - this.getRect(this.container).left) + "px";
      const w = this.getRect(edge).width + "px";
      const h = this.getRect(edge).height + "px";

      img.style.top = top;
      img.style.left = left;
      img.style.width = w;
      img.style.height = h;
    });
  }

  getRect(el) {
    const rect = el.getBoundingClientRect();

    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      bottom: rect.bottom + window.scrollY,
      right: rect.right + window.scrollX,
      width: rect.width,
      height: rect.height,
    };
  }
  
  animate(cb) {    
    this.tl.fromTo(this.imgs, {
      x: (i) => {
        if(!i) return "50%";
        if(i === 1) return "-50%";
        if(i === 2) return "50%";
        if(i === 3) return "-50%";
      },
      y: (i) => {
        if(!i) return "50%";
        if(i === 1) return "50%";
        if(i === 2) return "-50%";
        if(i === 3) return "-50%";
      },
      scale: 0.9,
      autoAlpha: 0,
    }, {
      scale: 1,
      autoAlpha: 1,
      x: 0,
      y: 0,
      delay: 1,
      duration: 1,
      ease: "expo.inOut",
      onComplete:() => {
        if(typeof cb === "function") return cb();
    },
    })
    .to(this.imgs,{
      x: (i) => {
        if(!i) return "20%";
        if(i === 1) return "-20%";
        if(i === 2) return "20%";
        if(i === 3) return "-20%";
      },
      y: (i, el) => {
        if(!i) return "20%";
        if(i === 1) return "20%";
        if(i === 2) return "-20%";
        if(i === 3) return "-20%";
      },
      ease: "expo.inOut",
      scale: 0.9,
    }, "<90%")
    .to(this.imgs,{
      x: 0,
      y: 0,
      ease: "expo.out",
      duration: 1,
      scale: 1,
    })
    .to(this.imgs, {
      x: () => gsap.utils.random(-8, 8),
      y: () => gsap.utils.random(-8, 8),
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      repeatRefresh: true,
    });
  }

  destroy() {
    this.tl.kill();

    this.imgs.forEach((img) => {
      img.style.top = "";
      img.style.left = "";
      img.style.width = "";
      img.style.height = "";
    });
  }
}


// Initiate Animation
(()=> {
  let w = window.innerWidth;
  let scan = new Scan();
  let focus = new Focus(() => scan.init());

  function resetScan() {
    scan.destroy();
    focus.destroy();

    scan = new Scan();
    focus = new Focus(() => scan.init());
  }

  window.addEventListener("resize", () => {
    if (w !== window.innerWidth) {
      w = window.innerHeight;
      resetScan();
    }
  });
})();


