/* Inspired by https://codepen.io/paul/pen/kXqAGJ */

const backgroundColor = "#21BA45";
const canvas = document.querySelector("#canvas_confetti");
const balloonParent = document.querySelectorAll(".balloons");

// Tracks the draw function
let started = null;

function startConfetti() {
  if (started) {
    return;
  }
  var context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  var calculatedDensity = canvas.width * 0.0085;
  var calculatedVelocity = canvas.width * 0.0037;
  var calculatedLife = canvas.height * 0.65;
  var calculatedStartingX = canvas.width / 2;

  //Generating many particles
  //Make object with settings for function
  var particles = {},
    particleIndex = 0,
    settings = {
      density: calculatedDensity,
      particleSize: 8,
      particleSizeVariety: 1.5,
      startingX: calculatedStartingX,
      startingY: -20,
      velX: calculatedVelocity,
      velY: 2,
      gravity: 0.015,
      //maxLife: 300,
      maxLife: calculatedLife,
      particleColours: [
        "#F06292",
        "#BA68C8",
        "#64B5F6",
        "#4DD0E1",
        "#81C784",
        "#DCE775",
        "#FFD54F",
        "#FF8A65",
        "#EEEEEE",
      ],
    };

  //Function that will create particles
  function Particle() {
    //Starting positions and velocities
    this.x = settings.startingX;
    this.y = settings.startingY;
    //Random X and Y velocities
    this.vx = Math.random() * settings.velX - settings.velX / 2;
    this.vy = Math.random() * settings.velY - settings.velY / 2;
    //this.vx = 10;
    //this.vy = 10;

    //Set up rotation & center of origin
    this.rot = 0;
    this.centerOfOriginX = -this.particleSize / 2;
    this.centerOfOriginY = -this.particleSize / 4;

    this.particleSize = parseInt(
      Math.random() * (settings.particleSizeVariety * 2) + settings.particleSize
    );

    //Choose a random colour
    this.particleColor =
      settings.particleColours[
        parseInt(Math.random() * settings.particleColours.length)
      ];

    //Add new particle to index - this is a way to store the particles created
    particleIndex++;
    particles[particleIndex] = this;
    this.id = particleIndex;
    //Will be used later to remove particle
    this.life = -10 + parseInt(Math.random() * 20);
  }

  //Add a 'draw' method to the Particle function
  Particle.prototype.draw = function () {
    this.x += this.vx;
    this.y += this.vy;

    //calculate rotation
    var period = 100;
    this.rot +=
      (Math.sin((this.life * 2 * Math.PI) / period) / 2) * (Math.random() * 2);

    //Add gravity
    this.vy += settings.gravity;

    //Age the particle by adding to 'life'
    this.life++;

    //Remove the particle if it's old
    if (this.life >= settings.maxLife) {
      delete particles[this.id];
    }

    //Create shape
    context.clearRect(0, settings.groundLevel, canvas.width, canvas.height);
    context.beginPath();
    context.fillStyle = this.particleColor;
    //save context position
    context.save();
    context.translate(this.x, this.y);

    var rotationAmount = 5;
    //rotate by sine value
    context.rotate(this.rot / rotationAmount);

    //translate to near random center of origin
    context.translate(this.centerOfOriginX, this.centerOfOriginY);
    //context.translate(0,0);

    context.globalAlpha = 0.9;
    context.fillRect(0, 0, this.particleSize, this.particleSize / 2);
    context.restore();
  };

  //Set up interval to draw particles
  started = setInterval(function () {
    //Fillstyle transparency adds motion trails
    //#673AB7 purple
    //#2196F3 blue
    //#009688 teal
    //#FFEB3B yellow
    // "rgba(39,174,96,.98)"; green
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the particles
    for (var i = 0; i < settings.density; i++) {
      // Random chance of creating a particle corresponding to an chance of 1 per second per "density" value
      if (Math.random() > 0.97) {
        new Particle();
      }
    }

    //Use the draw method for all the particles in particles[]
    for (var i in particles) {
      particles[i].draw();
    }
  }, 16);
}

function stopConfetti() {
  if (started) {
    clearInterval(started);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    started = null;
  }
}

function addBalloons(parentEl, numBalloons) {
  // Only generate once
  if (parentEl.querySelectorAll(".balloon").length) {
    console.log("Element already has balloons");
    return;
  }

  // Generate the balloons
  for (let i = 0; i < numBalloons; i++) {
    const el = document.createElement("div");
    el.className = "balloon";
    parentEl.appendChild(el);
  }
}

function showBalloons() {
  balloonParent.forEach((el) => {
    addBalloons(el, 5);
  });
}

function hideBalloons() {
  balloonParent.forEach((parentEl) => {
    while (parentEl.lastElementChild) {
      parentEl.removeChild(parentEl.lastElementChild);
    }
  });
}
