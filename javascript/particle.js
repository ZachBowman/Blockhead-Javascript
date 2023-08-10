// Particle
// Zach Bowman
// 2007, 2015 Nightmare Games

// One individual particle
function Particle()
  {
  //this.pos = new Vector2();
  this.x = 0;
  this.y = 0;
  this.dir = 0;  // degrees
  this.velocity = 0;
  this.acceleration = 0;
  this.fade = 0;  // alpha transparency
  this.fade_speed = 0;
  this.gravity = 0;
  this.gravity_accelerated = 0;
  this.sprite;
  this.alive = false;
  }
