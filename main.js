"use strict";

class Canvas {
  constructor() {
    this.canvas = document.getElementById("hero-canvas");
    this.svg = document.getElementById("hero-svg");
    this.svgDots = this.svg.querySelectorAll("circle");
    this._dots = [];
    this.dots = [];
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

  get dots() {
    return this._dots;
  }

  set dots(val) {
    return (this._dots = val);
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

  resize() {
    let w = window.innerWidth;

    window.addEventListener("resize", () => {
      if (w !== window.innerWidth) {
        w = window.innerHeight;

        this.clear();
        this.size = {
          w: window.innerWidth,
          h: window.innerHeight,
        };
      }
    });
  }

  draw() {
    this.svgDots.forEach((d, i) => {
      d.setAttribute("data-dot", i);
      const x =
        d.getBoundingClientRect().left +
        (d.getBoundingClientRect().width / 2 +
          (window.innerWidth - document.documentElement.clientWidth) / 1.5);
      const y =
        d.getBoundingClientRect().top + d.getBoundingClientRect().height / 2;
      const r = Number(d.getAttribute("r"));
      const id = i;

      const dot = new Dot(id, y, r);
      dot.id = i;
      dot.x = x;
      dot.y = y;
      dot.r = r;


      gsap.to(dot, {
        x: dot.x + Math.random() * 15 - 5, // Move slightly left/right
        y: dot.y + Math.random() * 15 - 5, // Move slightly up/down
        duration: 2 + Math.random() * 1, // Randomize duration
        r: dot.r + Math.random() * 5 - 2.5,
        repeat: -1, // Infinite loop
        yoyo: true, // Return to original position
        ease: "sine.inOut", // Smooth easing
      });

      this._dots.push(dot);
    });
  }

  update() {
    gsap.ticker.add(() => {
      this.clear();
      this._dots.forEach(d => d.update());
      this.connect();
    });
  }

  connect() {
    for (let i = 0; i < this._dots.length; i++) {
      const dot = (i) => this._dots[i];

      this.line(dot(0), dot(1));

      if (dot(i).id === 0) {
        this.line(dot(0), dot(1));
        this.line(dot(0), dot(4));
        this.line(dot(0), dot(16));
      }

      if (dot(i).id === 1) {
        this.line(dot(1), dot(2));
        this.line(dot(1), dot(4));
      }

      if (dot(i).id === 2) {
        this.line(dot(2), dot(3));
      }

      if (dot(i).id === 3) {
        this.line(dot(3), dot(6));
      }

      if (dot(i).id === 4) {
        this.line(dot(4), dot(2));
        this.line(dot(4), dot(5));
        this.line(dot(4), dot(16));
      }

      if (dot(i).id === 5) {
        this.line(dot(5), dot(7));
        this.line(dot(5), dot(12));
        this.line(dot(5), dot(15));
        this.line(dot(5), dot(14));
      }

      if (dot(i).id === 6) {
        this.line(dot(6), dot(5));
        this.line(dot(6), dot(11));
        this.line(dot(6), dot(12));
      }

      if (dot(i).id === 7) {
        this.line(dot(7), dot(9));
        this.line(dot(7), dot(17));
        this.line(dot(7), dot(20));
      }

      if (dot(i).id === 9) {
        this.line(dot(9), dot(22));
      }

      if (dot(i).id === 10) {
        this.line(dot(10), dot(9));
        this.line(dot(10), dot(22));
      }

      if (dot(i).id === 11) {
        this.line(dot(11), dot(10));
      }

      if (dot(i).id === 12) {
        this.line(dot(12), dot(9));
        this.line(dot(12), dot(11));
      }

      if (dot(i).id === 13) {
        this.line(dot(13), dot(14));
        this.line(dot(13), dot(15));
        this.line(dot(13), dot(17));
        this.line(dot(13), dot(19));
      }

      if (dot(i).id === 14) {
        this.line(dot(14), dot(15));
        this.line(dot(14), dot(17));
      }

      if (dot(i).id === 15) {
      }

      if (dot(i).id === 16) {
        this.line(dot(16), dot(15));
      }

      if (dot(i).id === 17) {
        this.line(dot(17), dot(19));
      }

      if (dot(i).id === 19) {
        this.line(dot(19), dot(21));
      }

      if (dot(i).id === 20) {
        this.line(dot(20), dot(21));
      }

      if (dot(i).id === 21) {
        this.line(dot(21), dot(22));
      }
    }
  }

  line(start, end) {
    const gradient = this.ctx.createRadialGradient(
      start.x,
      start.y,
      32,
      end.x,
      end.y,
      16
    );
    gradient.addColorStop(0.7, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 0.8;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  init() {
    this.draw();
    this.resize();
    this.update();
  }
}

class Dot extends Canvas {
  constructor() {
    super();
    this._id = "";
    this.id = "";

    this._x = 0;
    this.x = 0;

    this._y = 0;
    this.y = 0;

    this._r = 0;
    this.r = 0;
  }

  get x() {
    return this._x;
  }

  set x(val) {
    return (this._x = val);
  }

  get y() {
    return this._y;
  }

  set y(val) {
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

  create() {
    const gradient = this.ctx.createRadialGradient(
      this._x,
      this._y,
      this._r * 0.1,
      this._x,
      this._y,
      this._r
    );

    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(1, "rgba(255, 86, 0, 0)");

    this.ctx.beginPath();
    this.ctx.arc(this._x, this._y, this._r, 0, 2 * Math.PI);

    if (
      this._id === 16 ||
      this._id === 15 ||
      this._id === 14 ||
      this._id === 13 ||
      this._id === 18 ||
      this._id === 8
    )
      this.ctx.fillStyle = "rgba(255, 255, 255, 0)";
    else this.ctx.fillStyle = gradient;
    this.ctx.fill();
    this.ctx.closePath();
  }

  update() {
    this.create();
  }

  init() {
    this.create();
  }
}


const canvas = new Canvas();
canvas.init();
