// Blockhead
// Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

// game state references (for game_state and fade transitions)
var NONE      = 0;
var LOADING   = 1;
var SPLASH    = 2;
var TITLE     = 3;
var MENU      = 4;
var GAME      = 5;
var INSTRUCT1 = 6;
var INSTRUCT2 = 7;
var CREDITS   = 8;

// control types
var NO_CONTROL = 0;
var KEYBOARD_CONTROL = 1;
var CLICK_CONTROL = 2;  // finger or mouse

// color references
var _ = 0;
var R = 1;
var O = 2;
var Y = 3;
var G = 4;
var B = 5;
var P = 6;
var M = 7; // metal
var K = 8; // black
var Q = 9; // rainbow
var Z = 10; // random
 
// direction references
var NONE  = 0;
var UP    = 1;
var DOWN  = 2;
var LEFT  = 3;
var RIGHT = 4;
 
// block change state references
var CHANGE_DESTROY = -2;  // being destroyed right now
var CHANGE_MARKED  = -1;  // marked for destruction later
var CHANGE_NONE    = 0;
var CHANGE_COLOR1  = 1;
var CHANGE_COLOR2  = 2;

////////////////////////////////////////////////////////////////////////////////

function Block ()
  {
  this.x = 0;
  this.y = 0;
  this.width = tilesize_x;
  this.height = tilesize_y;
  this.gx = 0;  // grid location
  this.gy = 0;
  this.dir = NONE;    // direction moving
  this.color = P;
  this.status = 0;
  this.change = CHANGE_NONE;
  this.frame = 0;
  this.count = 0;
  this.is_checked = false;
  this.destroy_checked = false;
  this.goal_block = 0;
  this.glowcount = 0;
  this.glowdelay = 0;
  this.colorframe = 0;
  this.delay = 0;
  this.height = 0; // for crushing

  this.set_defaults = function ()
    {
    this.x = 0;
    this.y = 0;
    this.gx = 0;  // grid location
    this.gy = 0;
    this.dir = NONE;    // direction moving
    this.color = P;
    this.status = 0;
    this.change = CHANGE_NONE;
    this.frame = 0;
    this.count = 0;
    this.is_checked = false;
    this.destroy_checked = false;
    this.goal_block = 0;
    this.glowcount = 0;
    this.glowdelay = 0;
    this.colorframe = 0;
    this.delay = 0;
    this.height = 0; // for crushing
    }
  }
 
////////////////////////////////////////////////////////////////////////////////

function Block_List ()
  {
  this.list = [];

  this.init = function (max_blocks)
    {
    for (var b = 0; b < max_blocks; b += 1)
      {
      var new_block = new Block ();
      this.list.push (new_block);
      }
    }

  this.clear_list = function ()
    {
    for (var b = 0; b < this.list.length; b += 1)
      {
      this.list[b].set_defaults ();
      }
    }

  // this.get_first_free_index = function ()
  //   {
  //   for (var b = 0; b < this.list.length; b += 1)
  //     {
  //     if (this.list[b].status === 0) return b;
  //     }
  //   return -1;
  //   }
  }

////////////////////////////////////////////////////////////////////////////////

function Game_Object (sprite = null, draw_from_center = false)
  {
  this.x = 0;
  this.y = 0;
  this.dir = 0;    // direction moving
  this.gx = 0;
  this.gy = 0;
  this.frame = 0;
  this.last_frame = 0;
  this.count = 0;
  this.delay = 0;
  // this.width = width;
  // this.height = height;
  this.sprite = sprite;
  this.draw_from_center = draw_from_center;
  }
 
////////////////////////////////////////////////////////////////////////////////

function Grabber ()
  {
  this.x = 0;
  this.y = 0;
  this.gx = 0;
  this.gy = 0;
  this.width = 78;
  this.dir;
  this.wantmove;
  this.movespeed = 0;
  this.status;
  this.block;
  this.destination;  // column grabber is moving to (only with click control)
  this.block_offset_x = 18;
  this.block_offset_y = 91;
  this.control_type = -1;  // last control type used - KEYBOARD_CONTROL, CLICK_CONTROL
  }
 
////////////////////////////////////////////////////////////////////////////////

function Conveyor ()
  {
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.x3 = 0;
  this.y3 = 0;
  this.frame = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function Chart ()
  {
  this.x = 0;
  this.y = 0;
  this.x0 = 0;
  this.y0 = 0;
  this.x1 = 0;
  this.y1 = 0;
  this.x2 = 0;
  this.y2 = 0;
  this.x3 = 0;
  this.y3 = 0;
  this.block0 = 0;
  this.block1a = 0;
  this.block1b = 0;
  this.block2a = 0;
  this.block2b = 0;
  this.arrow1 = 0;
  this.arrow2 = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function Next_Block ()
  {
  this.x = 0;
  this.y = 0;
  this.block = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function Timer ()
  {
  this.x = 0;
  this.y = 0;
  this.seconds = 0;
  this.current_miliseconds = 0;
  this.last_miliseconds = 0;
  }

////////////////////////////////////////////////////////////////////////////////

// function sprite_fade_object (sprite_file)
//   {
//   this.x = 0;
//   this.y = 0;
//   this.sprite = Sprite (sprite_file);
//   this.opacity = 0.0;

//   this.draw_fade = function (x, y)
//     {
//     if (this.opacity < 1.0) this.opacity += .01;
//     canvas_2d.globalAlpha = this.opacity;
//     this.sprite.draw (canvas_2d, x, y);
//     canvas_2d.globalAlpha = 1.0;
//     }

//   this.draw = function (x, y)
//     {
//     this.sprite.draw (canvas_2d, x, y);
//     }

//   this.reset = function ()
//     {
//     this.opacity = 0.0;
//     }
//   }

////////////////////////////////////////////////////////////////////////////////

function Rectangle (x = 0, y = 0, width = 0, height = 0)
  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  }
