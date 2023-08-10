// Blockhead
// Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

// default options
var DEFAULT_SOUND = true;
var DEFAULT_MUSIC = true;
var DEFAULT_DIFFICULTY = 3;
var DEFAULT_HEIGHT = 3;
var DEFAULT_TIMER = true;

// options the game uses
var ACTUAL_SOUND;
var ACTUAL_MUSIC;
var ACTUAL_DIFFICULTY;
var ACTUAL_HEIGHT;
var ACTUAL_TIMER;

// game state references (for game_state and fade transitions)
var NONE      = 0;
var LOADING   = 1;
var SPLASH    = 2;
var TITLE     = 3;
var MENU      = 4;
var TUMBLE    = 5;
var GAME      = 6;
var INSTRUCT1 = 7;
var INSTRUCT2 = 8;
var CREDITS   = 9;

// music state references
var MUSIC_OFF = 0;      // option toggled by user
var MUSIC_STOPPED = 1;  // game loading, won, or lost
var MUSIC_NEW = 2;      // new song requested
var MUSIC_LOADING = 3;  // selected song not loaded yet
var MUSIC_PLAYING = 4;
var MUSIC_PAUSED = 5;   // app not in focus

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
 
// block states
var BLOCK_DESTROY = -2;  // being destroyed right now
var BLOCK_MARKED  = -1;  // marked for destruction later
var CHANGE_NONE    = 0;   // default, nothing happening
var CHANGE_COLOR1  = 1;
var CHANGE_COLOR2  = 2;
var FALLING        = 3;
//var BOUNCE         = 4;   // already hit once

////////////////////////////////////////////////////////////////////////////////

class Block
  {
  constructor()
    {
    this.set_defaults();
    }

  set_defaults()
    {
    this.x = 0;
    this.y = 0;
    this.gx = 0;  // grid location
    this.gy = 0;
    this.vertical_velocity = 0.0;
    this.color = P;
    this.alive = false;
    this.state = CHANGE_NONE;
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

//TODO: Add functionality to find empty space in the list (probably copy from elsewhere)
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
  }

////////////////////////////////////////////////////////////////////////////////

class Game_Object
  {
  constructor (sprite = null, draw_from_center = false)
    {
    this.set_defaults (sprite, draw_from_center)
    }

  set_defaults (sprite, draw_from_center)
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
    this.sprite = sprite;
    this.draw_from_center = draw_from_center;

    //this.click_event = function() {};
    }

  //set_click_event (event_function) {this.click_event = event_function;}
  }
 
////////////////////////////////////////////////////////////////////////////////

class Option
  {
  constructor
    (
    sprite,           // sprite class
    //sprite_name,      // string
    draw_from_center, // bool
    click_event,      // function
    value_type,       // string - none, int, bool
    value_default,
    value_min,        // int
    value_max         // int
    )
    {
    this.x = screen_x_offset;//0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.type = value_type;
    this.value = value_default;
    this.min = value_min;
    this.max = value_max;

    this.draw_from_center = draw_from_center;
    //this.click_event = function() {};
    if (click_event === null) this.click_event = this.cycle_value;
    else this.click_event = click_event;

    this.sprites_loaded = 0;
    this.sprite1 = sprite;
    this.set_value_sprite();
    }

  update_if_sprites_loaded()
    {
    // Wait for the label sprite to load.
    if (this.sprites_loaded === 0)
      {
      if (this.sprite1 != null && this.sprite1 != undefined)
        {
        this.width = this.sprite1.width;
        this.height = this.sprite1.height;

        this.sprites_loaded += 1;
        if (this.type === "none")
          {
          this.sprites_loaded += 1;
          this.center_horizontally();
          }
        }
      }
    // Wait for the value sprite to load.
    if (this.sprites_loaded === 1)
      {
      if (this.type === "bool" && options_off_sprite != null && options_off_sprite != undefined)
        {
        this.width += options_off_sprite.width;
        this.sprites_loaded += 1;
        this.center_horizontally();
        }
      if (this.type === "int" && options_10_sprite != null && options_10_sprite != undefined)
        {
        this.width += options_10_sprite.width;
        this.sprites_loaded += 1;
        this.center_horizontally();
        }
      }
    }

  center_horizontally()
    {
    if (this.draw_from_center) this.x = get_screen_horizontal_center();

    else this.x = get_screen_horizontal_center() - (this.width / 2);
    }

  set_click_event (event_function) {this.click_event = event_function;}

  cycle_value()
    {
    if (this.type === "bool") this.value = !this.value;
    if (this.type === "int")
      {
      this.value += 1;
      if (this.value > this.max) this.value = this.min;
      }
    this.set_value_sprite();
    }

  on()
    {
    return this.value === true;
    }

  set_value_sprite()
    {
    if (this.type === "bool")
      {
      if (this.value === true) this.sprite2 = options_on_sprite;
      else this.sprite2 = options_off_sprite;
      }
    else if (this.type === "int")
      {
      if (this.value === 1) this.sprite2 = options_1_sprite;
      else if (this.value === 2) this.sprite2 = options_2_sprite;
      else if (this.value === 3) this.sprite2 = options_3_sprite;
      else if (this.value === 4) this.sprite2 = options_4_sprite;
      else if (this.value === 5) this.sprite2 = options_5_sprite;
      else if (this.value === 6) this.sprite2 = options_6_sprite;
      else if (this.value === 7) this.sprite2 = options_7_sprite;
      else if (this.value === 8) this.sprite2 = options_8_sprite;
      else if (this.value === 9) this.sprite2 = options_9_sprite;
      else if (this.value === 10) this.sprite2 = options_10_sprite;
      }
    }

  draw (canvas)
    {
    var draw_x = this.x;
    var draw_y = this.y;
    var value_x = this.x;
    var value_y = this.y;

    if (this.draw_from_center)
      {
      draw_x -= this.width / 2;
      draw_y -= this.height / 2;

      value_x = draw_x + this.sprite1.width;
      value_y -= this.height / 2;
      }
    else
      {
      value_x = draw_x + this.sprite1.width;
      }

    this.sprite1.draw (canvas, draw_x, draw_y);
    if (this.type != "none") this.sprite2.draw (canvas, value_x, value_y);
    }
  }

////////////////////////////////////////////////////////////////////////////////

function option_sprite_load_callback()
  {
  //arguments[0].width = arguments[0].sprite.width;
  }

////////////////////////////////////////////////////////////////////////////////

function Rectangle (x = 0, y = 0, width = 0, height = 0)
  {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
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

function Chart()
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

function Next_Block()
  {
  this.x = 0;
  this.y = 0;
  this.block = 0;
  }

////////////////////////////////////////////////////////////////////////////////

function Timer()
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
