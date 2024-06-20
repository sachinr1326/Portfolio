import React, { useEffect, useRef } from 'react';
import './ParticleNetwork.css';

const ParticleNetwork = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    class ParticleNetworkAnimation {
      constructor() {
        this.container = null;
        this.canvas = null;
        this.ctx = null;
        this.particleNetwork = null;
      }

      init(element) {
        this.container = element;
        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.sizeCanvas();
        this.particleNetwork = new ParticleNetwork(this);
        this.bindUiActions();
      }

      bindUiActions() {
        window.addEventListener("resize", this.onResize);
      }

      unbindUiActions() {
        window.removeEventListener("resize", this.onResize);
      }

      onResize = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.sizeCanvas();
        this.particleNetwork.createParticles();
      }

      sizeCanvas() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
      }
    }

    class Particle {
      constructor(parent, x, y) {
        this.network = parent;
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;
        this.particleColor = this.returnRandomArrayItem(parent.options.particleColors);
        this.radius = this.getLimitedRandom(1.5, 2.5);
        this.opacity = 0;
        this.x = x || Math.random() * this.canvas.width;
        this.y = y || Math.random() * this.canvas.height;
        this.velocity = {
          x: (Math.random() - 0.5) * parent.options.velocity,
          y: (Math.random() - 0.5) * parent.options.velocity
        };
      }

      update() {
        this.opacity = Math.min(this.opacity + 0.01, 1);
        if (this.x > this.canvas.width + 100 || this.x < -100) this.velocity.x = -this.velocity.x;
        if (this.y > this.canvas.height + 100 || this.y < -100) this.velocity.y = -this.velocity.y;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
      }

      draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.particleColor;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fill();
      }

      returnRandomArrayItem(array) {
        return array[Math.floor(Math.random() * array.length)];
      }

      getLimitedRandom(min, max) {
        return Math.random() * (max - min) + min;
      }
    }

    class ParticleNetwork {
      constructor(parent) {
        this.options = {
          velocity: 3,
          density: 15000,
          netLineDistance: 200,
          netLineColor: "#ff0000",
          particleColors: ["#00FFEF", "#ff0000", "#564c41","#FFEA00","#8d0680"]
        };
        this.canvas = parent.canvas;
        this.ctx = parent.ctx;
        this.init();
      }

      init() {
        this.createParticles(true);
        this.animationFrame = requestAnimationFrame(this.update.bind(this));
        this.bindUiActions();
      }

      createParticles(isInitial) {
        this.particles = [];
        const quantity = (this.canvas.width * this.canvas.height) / this.options.density;
        if (isInitial) {
          let counter = 0;
          clearInterval(this.createIntervalId);
          this.createIntervalId = setInterval(() => {
            if (counter < quantity - 1) {
              this.particles.push(new Particle(this));
            } else {
              clearInterval(this.createIntervalId);
            }
            counter++;
          },1);
        } else {
          for (let i = 0; i < quantity; i++) {
            this.particles.push(new Particle(this));
          }
        }
      }

      update() {
        if (this.canvas) {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.ctx.globalAlpha = 1;
          this.drawConnections();
          this.drawParticles();
          if (this.options.velocity !== 0) {
            this.animationFrame = requestAnimationFrame(this.update.bind(this));
          }
        } else {
          cancelAnimationFrame(this.animationFrame);
        }
      }

      drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
          for (let j = this.particles.length - 1; j > i; j--) {
            const p1 = this.particles[i];
            const p2 = this.particles[j];
            const distance = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
            if (distance > this.options.netLineDistance) continue;
            const preciseDistance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            if (preciseDistance > this.options.netLineDistance) continue;
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.options.netLineColor;
            this.ctx.globalAlpha = ((this.options.netLineDistance - preciseDistance) / this.options.netLineDistance) * p1.opacity * p2.opacity;
            this.ctx.lineWidth = 0.7;
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
          }
        }
      }

      drawParticles() {
        this.particles.forEach(particle => {
          particle.update();
          particle.draw();
        });
      }

      bindUiActions() {
        this.spawnQuantity = 3;
        this.mouseIsDown = false;
        this.touchIsMoving = false;

        this.onMouseMove = (e) => {
          if (!this.interactionParticle) this.createInteractionParticle();
          this.interactionParticle.x = e.offsetX;
          this.interactionParticle.y = e.offsetY;
        };

        this.onTouchMove = (e) => {
          e.preventDefault();
          this.touchIsMoving = true;
          if (!this.interactionParticle) this.createInteractionParticle();
          this.interactionParticle.x = e.changedTouches[0].clientX;
          this.interactionParticle.y = e.changedTouches[0].clientY;
        };

        this.onMouseDown = (e) => {
          this.mouseIsDown = true;
          let counter = 0;
          let quantity = this.spawnQuantity;
          const intervalId = setInterval(() => {
            if (this.mouseIsDown) {
              if (counter === 1) quantity = 1;
              for (let i = 0; i < quantity; i++) {
                if (this.interactionParticle) {
                  this.particles.push(new Particle(this, this.interactionParticle.x, this.interactionParticle.y));
                }
              }
            } else {
              clearInterval(intervalId);
            }
            counter++;
          }, 50);
        };

        this.onTouchStart = (e) => {
          e.preventDefault();
          setTimeout(() => {
            if (!this.touchIsMoving) {
              for (let i = 0; i < this.spawnQuantity; i++) {
                this.particles.push(new Particle(this, e.changedTouches[0].clientX, e.changedTouches[0].clientY));
              }
            }
          }, 200);
        };

        this.onMouseUp = (e) => {
          this.mouseIsDown = false;
        };

        this.onMouseOut = (e) => {
          this.removeInteractionParticle();
        };

        this.onTouchEnd = (e) => {
          e.preventDefault();
          this.touchIsMoving = false;
          this.removeInteractionParticle();
        };

        this.canvas.addEventListener("mousemove", this.onMouseMove);
        this.canvas.addEventListener("touchmove", this.onTouchMove);
        this.canvas.addEventListener("mousedown", this.onMouseDown);
        this.canvas.addEventListener("touchstart", this.onTouchStart);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
        this.canvas.addEventListener("mouseout", this.onMouseOut);
        this.canvas.addEventListener("touchend", this.onTouchEnd);
      }

      unbindUiActions() {
        this.canvas.removeEventListener("mousemove", this.onMouseMove);
        this.canvas.removeEventListener("touchmove", this.onTouchMove);
        this.canvas.removeEventListener("mousedown", this.onMouseDown);
        this.canvas.removeEventListener("touchstart", this.onTouchStart);
        this.canvas.removeEventListener("mouseup", this.onMouseUp);
        this.canvas.removeEventListener("mouseout", this.onMouseOut);
        this.canvas.removeEventListener("touchend", this.onTouchEnd);
      }

      createInteractionParticle() {
        this.interactionParticle = new Particle(this);
        this.interactionParticle.velocity = { x: 0, y: 0 };
        this.particles.push(this.interactionParticle);
      }

      removeInteractionParticle() {
        const index = this.particles.indexOf(this.interactionParticle);
        if (index > -1) {
          this.interactionParticle = null;
          this.particles.splice(index, 1);
        }
      }
    }

    const pna = new ParticleNetworkAnimation();
    pna.init(containerRef.current);

    return () => {
      pna.unbindUiActions();
      if (pna.particleNetwork) {
        pna.particleNetwork.unbindUiActions();
      }
      containerRef.current.removeChild(pna.canvas);
    };
  }, []);

  return (
    <div className="particle-network-animation" ref={containerRef}>
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
      <div className="glow glow-3"></div>
      <div className="glow glow-4"></div>
      <div className="glow glow-5"></div>
      <div className="glow glow-6"></div>
    </div>
  );
};

export default ParticleNetwork;
