// Blockhead
// Burning Freak Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

// application
var canvas_html;
var canvas_2d;
var div;
var fps = 30;
var game;

// game
var game_state = LOADING;
var game_active = false;
var played_game = false;
var game_won = false;
var game_lost = false;
var game_check_lost = false;
var newgame = true;
var passed_intro = false;
var goal_blocks = 0;
var clicked_new = false;
var menu_selection = 0;
var display_options = false;
var options_selection = 0;
var background_index = 0;

// video
var screen_width = 400;
var screen_height = 600;
// var boundary = 50;
var screen_x_offset = 0;
var screen_y_offset = 0;

// controls
var mouse_x = 0;
var mouse_y = 0;
var key_left = false;
var key_right = false;
var key_down = false;
var key_enter = false;
var key_esc = false;

// title screen
var title_border = 150;
var splash_clicked = false;
var loading_text = "LOADING";
var splash_text = "CLICK TO START";
var title_pingponger = new Pingponger ();
var sound_loaded_flag = false;

// fade
var fade_opacity = 0;
var fade_direction = NONE;
var next_game_state = SPLASH;

// options
var option_difficulty;
var option_difficulty_next;
var option_height;
var option_timer;
var option_timer_next;
var option_sound;
var option_music;

// blocks
var gravity = 4;
//var block.list.length = 60;
//var block = [];
//for (var b = 0; b < block.list.length; b += 1) block.list[b] = new Block ();
var block = new Block_List ();

// tiles
var tilesize_x = 40;
var tilesize_y = 40;
var tiles_x;// = 8;  // width in tiles of puzzle including walls
var tiles_y;// = 10; // height

// frame pulse data
var pulse_frames = 30;         // number of drawing frames for pulse to last (30 = 1 second)
var pulse_increasing = true;   // fading in = true, out = false
var pulse_speed;               // amount to increase each frame (256 / frames)
var pulse_fade = 0;
var pulse_max = 160;

// graphics
var solid_black = Sprite ("solid_black");
var title_screen = Sprite ("title_trans");
var title_yellow = Sprite ("title_yellow");
var title_green = Sprite ("title_green");
var title_blue = Sprite ("title_blue");
var title_red = Sprite ("title_red");
var title_orange = Sprite ("title_orange");
var title_bg_sprite = title_green;
var lightning_sprite = Sprite ("lightning");
var lightning_large_sprite = Sprite ("lightning_large");
var big_purple_sprite = Sprite ("bigpurple");
var blockhead_logo_sprite = Sprite ("blockhead3");
var menu_new_sprite = Sprite ("menu_newgame2");
var menu_instruct_sprite = Sprite ("menu_instruct2");
var menu_exit_sprite = Sprite ("menu_exit2");
var menu_resume_sprite = Sprite ("menu_resume2");
//var menu_credits_sprite = Sprite ("credits_sprite2");
var ng_sprite = Sprite ("ng");
var background =
  [
  Sprite ("bg7b"),
  Sprite ("bg8b"),
  Sprite ("bg9a"),
  Sprite ("bg10a"),
  Sprite ("bg12a"),
  Sprite ("bg14b")
  ];
var instructions1 = Sprite ("instructions1");
var instructions2 = Sprite ("instructions2");
var instructions_blur = Sprite ("instructions_blur");
//var credits_screen = Sprite ("credits7");
var chart_sprite = Sprite ("Chart1");
var chart_stuff_sprite = Sprite ("Chart2");
var wall_sprite = Sprite ("Walls");
var conveyor_sprite = Sprite ("Conveyor");
var grabber_sprite = Sprite ("Grabber");
var frame_sprite = Sprite ("Frame3");
var block_sprite = Sprite ("Blocks");
var rainbow_sprite = Sprite ("Rainbow");
var box_sprite = Sprite ("Box4");
var box_newgame_sprite = Sprite ("box_newgame");
var box_menu_sprite = Sprite ("box_menu");
var box_options_sprite = Sprite ("box_options");
var timer_0_sprite = Sprite ("timer_0");
var timer_1_sprite = Sprite ("timer_1");
var timer_2_sprite = Sprite ("timer_2");
var timer_3_sprite = Sprite ("timer_3");
var timer_4_sprite = Sprite ("timer_4");
var timer_5_sprite = Sprite ("timer_5");
var timer_6_sprite = Sprite ("timer_6");
var timer_7_sprite = Sprite ("timer_7");
var timer_8_sprite = Sprite ("timer_8");
var timer_9_sprite = Sprite ("timer_9");
var counter_0_sprite = Sprite ("counter_0");
var counter_1_sprite = Sprite ("counter_1");
var counter_2_sprite = Sprite ("counter_2");
var counter_3_sprite = Sprite ("counter_3");
var counter_4_sprite = Sprite ("counter_4");
var counter_5_sprite = Sprite ("counter_5");
var counter_6_sprite = Sprite ("counter_6");
var counter_7_sprite = Sprite ("counter_7");
var counter_8_sprite = Sprite ("counter_8");
var counter_9_sprite = Sprite ("counter_9");
var counter_label = Sprite ("blocksleft3");
var youwin_sprite = Sprite ("youwin");
var youlose_sprite = Sprite ("youlose");
var playagain_sprite = Sprite ("playagain");
var particle_red = Sprite ("particle_red");
var particle_orange = Sprite ("particle_orange");
var particle_yellow = Sprite ("particle_yellow");
var particle_green = Sprite ("particle_green");
var particle_blue = Sprite ("particle_blue");
var particle_purple = Sprite ("particle_purple");
var particle_white = Sprite ("particle_white");
//var particle_grey = Sprite ("particle_grey");
//var particle_black = Sprite ("particle_black");
var particle_smoke_sprite = Sprite ("particle_smoke");
var solid_white = Sprite ("solid_white");
var solid_red = Sprite ("solid_red");
var solid_orange = Sprite ("solid_orange");
var solid_yellow = Sprite ("solid_yellow");
var solid_green = Sprite ("solid_green");
var solid_blue = Sprite ("solid_blue");
var solid_purple = Sprite ("solid_purple");
var color_flash_sprite = Sprite ("solid_white");
var splash_sprite = Sprite ("splash2");
var intro_lightning1_sprite = Sprite ("lightning1a");
var intro_lightning2_sprite = Sprite ("lightning2");
var intro_lightning3_sprite = Sprite ("lightning3");
//var credits_hypno = Sprite ("hypno3");
var options_menu_sprite = Sprite ("options_menu");
var options_difficulty_1_sprite = Sprite ("options_difficulty_1");
var options_difficulty_2_sprite = Sprite ("options_difficulty_2");
var options_difficulty_3_sprite = Sprite ("options_difficulty_3");
var options_difficulty_4_sprite = Sprite ("options_difficulty_4");
var options_difficulty_5_sprite = Sprite ("options_difficulty_5");
var options_difficulty_6_sprite = Sprite ("options_difficulty_6");
var options_difficulty_7_sprite = Sprite ("options_difficulty_7");
var options_difficulty_8_sprite = Sprite ("options_difficulty_8");
var options_difficulty_9_sprite = Sprite ("options_difficulty_9");
var options_difficulty_10_sprite = Sprite ("options_difficulty_10");
var options_height_1_sprite = Sprite ("options_height_1");
var options_height_2_sprite = Sprite ("options_height_2");
var options_height_3_sprite = Sprite ("options_height_3");
var options_height_4_sprite = Sprite ("options_height_4");
var options_height_5_sprite = Sprite ("options_height_5");
var options_height_6_sprite = Sprite ("options_height_6");
var options_height_7_sprite = Sprite ("options_height_7");
var options_sound_on_sprite = Sprite ("options_sound_on");
var options_sound_off_sprite = Sprite ("options_sound_off");
var options_music_on_sprite = Sprite ("options_music_on");
var options_music_off_sprite = Sprite ("options_music_off");
var options_timer_on_sprite = Sprite ("options_timer_on");
var options_timer_off_sprite = Sprite ("options_timer_off");
var border_sprite = Sprite ("border3");
var options_prompt_sprite = Sprite ("options_prompt");
var block_smasher_sprite = Sprite ("block_smasher");
var vertical_highlight_sprite = Sprite ("vertical highlight2");
var demolition_sprite = Sprite ("demolition1c");

var click_here_counter = 0;
var click_here_delay = 20;
var click_here_onoff = true;

// visual effects
var blockhead_bounce = new BouncePop ();
var youwin_bounce    = new BouncePop ();
var youlose_bounce   = new BouncePop ();
var intro_expander   = new Expander ();
// public Fade intro_flash_fader               = new Fade ();
// public Fade intro_lightning_fader           = new Fade ();
// public Fade color_flash                     = new Fade ();
// public Fade options_fade                    = new Fade ();
// public Wait wait                            = new Wait ();

var click_to_start_sound = false;

// puzzle pixel location and size
var puzzle_width, puzzle_height;
var puzzle_x = screen_x_offset + (tilesize_x / 2);
var puzzle_y = 100;
 
// block grids
var color_grid = [[]];
var number_grid = [[]];

// animation frame counters
var frame_frame;
var frame_count;
var frame_delay;

// objects
var big_purple = new Block ();
var lightning = new Game_Object ();
var blockhead_logo = new Game_Object ();

var menu_new = new Game_Object (menu_new_sprite, true);
var menu_instruct = new Game_Object (menu_instruct_sprite, true);
var menu_resume = new Game_Object (menu_resume_sprite, true);

var ng = new Game_Object (ng_sprite);

var grabber = new Grabber ();
var conveyor = new Conveyor ();
var chart = new Chart ();
var box = new Game_Object ();
var box_newgame = new Game_Object (box_newgame_sprite);
var box_menu = new Game_Object (box_menu_sprite);
var box_options = new Game_Object (box_options_sprite);
var block_counter = new Game_Object ();
var timer = new Timer ();
var next1 = new Next_Block ();
var next2 = new Next_Block ();
var next3 = new Next_Block ();
var splash = new Game_Object ();
var date = new Date();
//   var title_screen = new Game_Object ();
//   var title_bg = new Game_Object ();

var options_difficulty_object = new Game_Object ();
var options_height_object = new Game_Object ();
var options_sound_object = new Game_Object ();
var options_music_object = new Game_Object ();
var options_menu_object = new Game_Object ();
var options_timer_object = new Game_Object ();
var options_resume_object = new Game_Object ();

var game_region = new Rectangle();

var sounds =
  [
  {id: "blockhead1", src: "sounds/blockhead1a.mp3"},
  {id: "blockhead2", src: "sounds/blockhead2a.mp3"},
  {id: "blockhead3", src: "sounds/blockhead3a.mp3"},
  {id: "blockhead4", src: "sounds/blockhead4a.mp3"},
  {id: "clok1",      src: "sounds/clok1.mp3"},
  {id: "clok2",      src: "sounds/clok2.mp3"},
  {id: "clok3",      src: "sounds/clok3.mp3"},
  {id: "clok4",      src: "sounds/clok4.mp3"},
  {id: "clok5",      src: "sounds/clok5.mp3"},
  {id: "clok6",      src: "sounds/clok6.mp3"},
  {id: "clok7",      src: "sounds/clok7.mp3"},
  {id: "clok8",      src: "sounds/clok8.mp3"},
  {id: "clok9",      src: "sounds/clok9.mp3"},
  {id: "clok10",     src: "sounds/clok10.mp3"},
  {id: "gong",       src: "sounds/gong.mp3"},
  {id: "p1",         src: "sounds/p1.mp3"},
  {id: "p2",         src: "sounds/p2.mp3"},
  {id: "p3",         src: "sounds/p3.mp3"},
  {id: "p4",         src: "sounds/p4.mp3"},
  {id: "p5",         src: "sounds/p5.mp3"},
  {id: "p6",         src: "sounds/p6.mp3"},
  {id: "p7",         src: "sounds/p7.mp3"},
  {id: "p8",         src: "sounds/p8.mp3"},
  {id: "p9",         src: "sounds/p9.mp3"},
  {id: "p10",        src: "sounds/p10.mp3"},
  {id: "pop1",      src: "sounds/pop1.mp3"},
  {id: "pop2",      src: "sounds/pop2.mp3"},
  {id: "pop3",      src: "sounds/pop3.mp3"},
  {id: "pop4",      src: "sounds/pop4.mp3"},
  {id: "pop5",      src: "sounds/pop5.mp3"},
  {id: "pop6",      src: "sounds/pop6.mp3"},
  {id: "pop7",      src: "sounds/pop7.mp3"},
  {id: "pop8",      src: "sounds/pop8.mp3"},
  {id: "pop9",      src: "sounds/pop9.mp3"},
  {id: "pop10",     src: "sounds/pop10.mp3"},
  {id: "pop11",     src: "sounds/pop11.mp3"},
  {id: "pop12",     src: "sounds/pop12.mp3"},
  {id: "pop13",     src: "sounds/pop13.mp3"},
  {id: "pop14",     src: "sounds/pop14.mp3"},
  {id: "pop15",     src: "sounds/pop15.mp3"},
  {id: "pop16",     src: "sounds/pop16.mp3"},
  {id: "pop17",     src: "sounds/pop17.mp3"},
  {id: "pop18",     src: "sounds/pop18.mp3"},
  {id: "pop19",     src: "sounds/pop19.mp3"},
  {id: "pop20",     src: "sounds/pop20.mp3"},
  {id: "pop21",     src: "sounds/pop21.mp3"},
  {id: "wah1",      src: "sounds/wah1.mp3"},
  {id: "wah2",      src: "sounds/wah2.mp3"},
  {id: "wah3",      src: "sounds/wah3.mp3"},
  {id: "wah4",      src: "sounds/wah4.mp3"},
  {id: "wah5",      src: "sounds/wah5.mp3"},
  {id: "wah6",      src: "sounds/wah6.mp3"},
  {id: "wah7",      src: "sounds/wah7.mp3"},
  {id: "wah8",      src: "sounds/wah8.mp3"},
  {id: "wah9",      src: "sounds/wah9.mp3"},
  {id: "wah10",     src: "sounds/wah10.mp3"},
  {id: "wah11",     src: "sounds/wah11.mp3"},
  {id: "wah12",     src: "sounds/wah12.mp3"},
  {id: "wah13",     src: "sounds/wah13.mp3"},
  {id: "wah14",     src: "sounds/wah14.mp3"},
  {id: "woosh1",    src: "sounds/woosh1.mp3"},
  {id: "woosh2",    src: "sounds/woosh2.mp3"},
  {id: "woosh3",    src: "sounds/woosh3.mp3"},
  {id: "woosh4",    src: "sounds/woosh4.mp3"},
  {id: "woosh5",    src: "sounds/woosh5.mp3"},
  {id: "woosh6",    src: "sounds/woosh6.mp3"},
  {id: "woosh7",    src: "sounds/woosh7.mp3"},
  {id: "woosh8",    src: "sounds/woosh8.mp3"},
  {id: "woosh9",    src: "sounds/woosh9.mp3"},
  {id: "youlose1",  src: "sounds/youlose2a.mp3"},
  {id: "youlose2",  src: "sounds/youlose3a.mp3"},
  {id: "youlose3",  src: "sounds/youlose5a.mp3"},
  {id: "youwin1",   src: "sounds/youwin1b.mp3"},
  {id: "youwin2",   src: "sounds/youwin2a.mp3"},
  {id: "youwin3",   src: "sounds/youwin3a.mp3"},
   
  {id: "music_title_short", src: "music/title_short.mp3"}
  ];

var music =
  [
  {id: "puzzle1", src: "music/puzzle1.mp3", loaded: false},
  {id: "puzzle2", src: "music/puzzle2.mp3", loaded: false},
  {id: "puzzle3", src: "music/puzzle3.mp3", loaded: false},
  {id: "puzzle4", src: "music/puzzle4.mp3", loaded: false},
  {id: "puzzle5", src: "music/puzzle5.mp3", loaded: false}
  ];

var music_player = null;
var music_volume = 0.5;
var music_track = null;
var last_track = null;
var total_sounds = 0;
var sounds_loaded = 0;

////////////////////////////////////////////////////////////////////////////////

// called when the html file is loaded

function html_init()
  {
  canvas_html = document.getElementById ("canvas");
  canvas_2d = document.getElementById ("canvas").getContext ("2d");
  div = document.getElementById ("canvas_div");

  // big purple block
  big_purple.x = (screen_width / 2) - 40;
  big_purple.y = screen_y_offset + 168;
  big_purple.color = P;
  big_purple.status = 0;
  big_purple.change = CHANGE_NONE;
  big_purple.frame = 0;
  big_purple.dir = NONE;

  // lightning
  lightning.frame = 0;
  lightning.last_frame = 0;
  lightning.count = 0;
  lightning.delay = 2;

  blockhead_bounce.bouncepop_init ();
  blockhead_logo.x = screen_x_offset + (screen_width / 2);
  blockhead_logo.y = screen_y_offset + 60;

  title_screen_bg ();
  init_sound();
  }

////////////////////////////////////////////////////////////////////////////////

setInterval (function()
  {
  if (splash_clicked === false) splash_screen_update();
  else game.update();

  try
    {
    if (canvas_2d)
      {
      if (splash_clicked === false) splash_screen_draw();
      else game.draw();
      }
    }
  catch (error)
    {
    console.log ("canvas_2d not ready yet.");
    }
  }, 1000 / fps);

////////////////////////////////////////////////////////////////////////////////

// called by html_init()

function init_sound ()
  {
  if (!createjs.Sound.initializeDefaultPlugins()) 
    {
    console.log ("Sound not available on this device.");
    sound_loaded();
    return;
    }

  total_sounds = sounds.length;
  sounds_loaded = 0;

  createjs.Sound.addEventListener("fileload", one_sound_loaded);
  createjs.Sound.registerSounds (sounds, "");
  }

////////////////////////////////////////////////////////////////////////////////

function one_sound_loaded (event)
  {
  sounds_loaded += 1;
  if (sounds_loaded === total_sounds) all_sounds_loaded();
  }

////////////////////////////////////////////////////////////////////////////////

function music_track_loaded (event)
  {
  // mark each track loaded as they come in.
  for (var track = 0; track < music.length; track += 1)
    {
    if (music[track].id === event.id) music[track].loaded = true;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function all_sounds_loaded (event)
  {
  // stop listening for sound loads.
  createjs.Sound.removeEventListener ("fileload", one_sound_loaded);

  sound_loaded_flag = true;
  game_state = SPLASH;
  div.addEventListener ("click", splash_screen_click, false);

  // load music async.
  createjs.Sound.addEventListener("fileload", music_track_loaded);
  createjs.Sound.registerSounds (music, "");
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_update ()
  {
  click_here_counter += 1;
  if (click_here_counter >= click_here_delay)
    {
    click_here_counter = 0;
    if (click_here_onoff === true) click_here_onoff = false;
    else click_here_onoff = true;
    }

  if (game_state === SPLASH)
    {
    big_block_animation ();
    lightning_control ();
    }
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_draw ()
  {
  var x = 0;
  var y = 0;
  var r = new Rectangle();

  solid_black.draw (canvas_2d, x, y);

  if (game_state === LOADING)
    {
    splash_sprite.draw_from_center(canvas_2d, screen_width / 2, screen_height / 2);

    canvas_2d.fillStyle = "#FFFFFF";
    canvas_2d.font = "24px impact";
    if (click_here_onoff === true) canvas_2d.fillText (loading_text, 150, 500);
    }
  else if (game_state === SPLASH)
    {
    var title_box = new Rectangle();
    title_box.x = screen_x_offset - title_border;
    title_box.y = screen_y_offset - title_border;
    title_box.width = screen_width + (title_border * 2);
    title_box.height = screen_height + (title_border * 2);
  
    title_pingponger.pingpongchingchong (title_bg_sprite, .35, title_box);
    title_screen.draw (canvas_2d, 0, 0);

    // lightning
    x = (screen_width / 2) - 52;
    y = screen_y_offset + 140;
    r.x = 0;
    r.y = lightning.frame * 33;
    r.width = 103;
    r.height = 32;
    if (lightning_large_sprite.draw_part != undefined) lightning_large_sprite.draw_part (canvas_2d, r, x, y);

    // purple block
    r.x = 80 * big_purple.frame;
    r.y = 0;
    r.width = 80;
    r.height = 80;
    if (big_purple_sprite.draw_part != undefined) big_purple_sprite.draw_part (canvas_2d, r, big_purple.x, big_purple.y);

    blockhead_bounce.bounce (blockhead_logo_sprite, blockhead_logo.x, blockhead_logo.y, 20, 4, 4);

    canvas_2d.fillStyle = "#FF00FF";
    canvas_2d.font = "24px impact";
    if (click_here_onoff === true) canvas_2d.fillText (splash_text, 125, 400);
    }
  }

// ////////////////////////////////////////////////////////////////////////////////

function splash_screen_click ()
  {
  splash_clicked = true;
  div.removeEventListener ("click", splash_screen_click, false);
  game = new blockhead_namespace.blockhead();
  game_state = MENU;

  canvas_html.addEventListener   ("mousedown",   function() {mouse_down (false, mouse_x, mouse_y)}, false);
  canvas_html.addEventListener   ("mousemove",   function(event) {mouse_move (event, false, canvas_html)}, false);
  canvas_html.addEventListener   ("touchstart",  function() {mouse_down (true)},  false);
  canvas_html.addEventListener   ("touchmove",   function() {mouse_move (true)},  true);
  canvas_html.addEventListener   ("touchend",    function() {mouse_up (true)},    false);
  document.body.addEventListener ("mouseup",     function() {mouse_up (false)},   false);
  document.body.addEventListener ("touchcancel", function() {mouse_up (true)},    false);
  document.body.addEventListener ('touchmove',   function (event) {event.preventDefault()}, false);
  document.addEventListener ('keydown', keyboard_down, false);
  document.addEventListener ('keyup', keyboard_up, false);

  play_sound ("start");
  }

////////////////////////////////////////////////////////////////////////////////

this.blockhead_namespace = this.blockhead_namespace || {};

////////////////////////////////////////////////////////////////////////////////

(function ()
  {
//   // particles
//   var max_effects = 20;
//   var particle_effect = [];
//   //for (var p = 0; p < max_effects; p += 1) particle_effect[p] = new Particle_Effect ();
   
//   // credits screen
//   var credits_rotation = 0;

  var timer_opacity = 255;
  var counter_opacity = 255;
        
  ////////////////////////////////////////////////////////////////////////////////

  function blockhead ()
    {
    this.init();
    play_sound ("blockhead");
    music_player = createjs.Sound.play ("music_title_short");
    music_player.volume = music_volume;
    }

  blockhead_namespace.blockhead = blockhead;

  ////////////////////////////////////////////////////////////////////////////////

  blockhead.prototype.init = function ()
    {
//     if (!createjs.Sound.initializeDefaultPlugins())
//       {
//       document.getElementById ("canvas_div").style.display = NONE;
//       return;
//       }
    
//     // initialize particles
//     //for (var i = 0; i < max_effects; i += 1) particle_effect[i] = new Particle_Effect ();
   
    block.init (60);

    // position title screen objects
    menu_resume.x = screen_x_offset + (screen_width / 2);// - (menu_resume_sprite.width / 2);
    menu_resume.y = screen_y_offset + 325;
    menu_new.x = screen_x_offset + (screen_width / 2);// - (menu_new_sprite.width / 2);
    menu_new.y = menu_resume.y;
    menu_instruct.x = screen_x_offset + (screen_width / 2);// - (menu_instruct_sprite.width / 2);
    menu_instruct.y = menu_new.y + 75;
    ng.x = screen_x_offset;
    ng.y = screen_y_offset + screen_height - ng_sprite.height - 15;
     
    next_game_state = NONE;
  
    pulse_speed = pulse_max / pulse_frames;  // amount to increase each frame (256 / frames)

    set_default_options();

    game_region.width = screen_width;
    game_region.height = screen_height - box_sprite.height;
    }

  ////////////////////////////////////////////////////////////////////////////////

//   function doneLoading(event)
//     {
//   	canvas_html.onclick = handleClick;
//     }

  ////////////////////////////////////////////////////////////////////////////////

  blockhead.prototype.update = function ()
    {
    if (game_state === MENU)
      {
      big_block_animation ();
      }

    else if (game_state === GAME)
      {    
      Block_Counter ();
      Grabber_Control ();
      Chart_Control ();
      Goal_Frame_Pulse ();
      Conveyor_Control ();
      Falling_Blocks ();
      Color_Change ();
      Destroy_Blocks ();
      Block_Animations ();
      //if (option_timer === true && game_active === true) Timer_Control ();
      //Update_Particles ();
      Check_Win ();
      }

    lightning_control ();
    //Sound_Control ();
    Music_Control ();

    // update_fade
    Fade_Control ();
    }
    
  ////////////////////////////////////////////////////////////////////////////////

  $(document).ready (function()
    {
    $("canvas").mousemove (function (event)
      {
      if (game_state === GAME)
        {
        mouse_x = event.pageX - this.offsetLeft;
        mouse_y = event.pageY - this.offsetTop;
        }
      });
    });

  ////////////////////////////////////////////////////////////////////////////////

  blockhead.prototype.draw = function ()
    {
    var x = 0, y = 0;
    var x2 = 0, y2 = 0;
    var x3 = 0, y3 = 0;
    var r = new Rectangle ();
    var r2 = new Rectangle ();
//   //       // string t;
//   //       // float temp_fade;

    if (game_state === MENU)
      {
      if (solid_black.draw != undefined) solid_black.draw (canvas_2d, 0, 0);

      var title_box = new Rectangle ();
      title_box.x = screen_x_offset - title_border;
      title_box.y = screen_y_offset - title_border;
      title_box.width = screen_width + (title_border * 2);
      title_box.height = screen_height + (title_border * 2);
      
      title_pingponger.pingpongchingchong (title_bg_sprite, .35, title_box);
      
      title_screen.draw (canvas_2d, 0, 0);
   
      // lightning
      x = (screen_width / 2) - 52;
      y = screen_y_offset + 140;
      r.x = 0;//1;
      // r.y = 26 + lightning.frame * 33;
      r.y = lightning.frame * 33;
      r.width = 103;
      r.height = 32;
      if (lightning_large_sprite.draw_part != undefined) lightning_large_sprite.draw_part (canvas_2d, r, x, y);
   
      // purple block
      r.x = 80 * big_purple.frame;
      r.y = 0;
      r.width = 80;
      r.height = 80;
      if (big_purple_sprite.draw_part != undefined) big_purple_sprite.draw_part (canvas_2d, r, big_purple.x, big_purple.y);
   
      if (game_active === true) menu_resume_sprite.draw_from_center (canvas_2d, menu_resume.x, menu_resume.y);
      menu_new_sprite.draw_from_center (canvas_2d, menu_new.x, menu_new.y);
      menu_instruct_sprite.draw_from_center (canvas_2d, menu_instruct.x, menu_instruct.y);
      //menu_exit_sprite.draw_from_center (canvas_2d, menu_exit.x, menu_exit.y);
      ng_sprite.draw (canvas_2d, ng.x, ng.y);

      blockhead_bounce.bounce (blockhead_logo_sprite, blockhead_logo.x, blockhead_logo.y, 20, 4, 4);
      }
          
    else if (game_state === INSTRUCT1 || game_state === INSTRUCT2)  // Draw Instruction Screens
      {
      x = (screen_width - instructions1.width) / 2;
      y = (screen_height - instructions1.height) / 2;
      instructions_blur.draw (canvas_2d, x, y);
      if (game_state === INSTRUCT1) instructions1.draw (canvas_2d, x, y);
      else if (game_state === INSTRUCT2) instructions2.draw (canvas_2d, x, y);
      }
   
    // else if (game_state === CREDITS)  // Draw Credits Screen
    //   {
    //   x = screen_x_offset + screen_width / 2;
    //   y = screen_height / 2;
    //   v2.x = credits_hypno.width / 2;
    //   v2.y = credits_hypno.height / 2;
    //   v3.x = screen_x_offset;
    //   v3.y = screen_y_offset;
    //   //credits_hypno.draw (canvas_2d, x, y, credits_rotation, v2, 1, SpriteEffects.None, 1);
    //   credits_screen.draw (canvas_2d, v3);

    //   credits_rotation += .005;
    //   if (credits_rotation >= 360) credits_rotation -= 360;
    //   }
      
    else if (game_state === GAME)
      {
      game.draw_background();
   
      // bottom border
      x = 0;
      y = screen_height - box_sprite.height - demolition_sprite.height;//puzzle_y + puzzle_height - tilesize_y;
      demolition_sprite.draw (canvas_2d, x, y);
     
      // block smasher (cube the blocks fall into)
      x = puzzle_x;// + tilesize_x - 1;
      y = puzzle_y;// + tilesize_y - 1;
      block_smasher_sprite.draw (canvas_2d, x, y, .5);
     
      // color flash
      // if (color_flash.activated === true) // fade has been started
        // color_flash.fade (spriteBatch, color_flash_sprite, Vector2.Zero);
     
      // chart
      chart_sprite.draw (canvas_2d, chart.x, chart.y);
      
      r.width = 20;
      r.height = 20;
      x = chart.x1;
      y = chart.y1;
      r.x = 1;
      r.y = 1 + chart.block0 * 21;
      
      //chart_stuff_sprite.draw_part (x, y, , r);

      //x = chart.v0.x;
      //y = chart.v2.y;
      //r.x = 1;
      //r.y = 1 + chart.block0 * 21;
      // spriteBatch.Draw (chart_stuff_sprite, v, r);// }

      if (chart.block0 < M)
        {
        x = chart.x1; y = chart.y1; r.x = 1;  r.y = 1 + ((chart.block1a - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x2; y = chart.y1; r.x = 22; r.y = 1 + ((chart.arrow1  - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x3; y = chart.y1; r.x = 1;  r.y = 1 + ((chart.block1b - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x1; y = chart.y2; r.x = 1;  r.y = 1 + ((chart.block2a - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x2; y = chart.y2; r.x = 22; r.y = 1 + ((chart.arrow2  - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x3; y = chart.y2; r.x = 1;  r.y = 1 + ((chart.block2b - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        }
   
    // conveyor
    r.x = 1; r.y = 1 + conveyor.frame * 21; r.width = 66; r.height = 20;
    conveyor_sprite.draw_part (canvas_2d, r, conveyor.x1, conveyor.y1);

    x = conveyor.x2; y = conveyor.y1;
    r.x = 68; r.y = 1 + conveyor.frame * 21; r.width = 64; r.height = 20;
    while (x < screen_x_offset + screen_width)
      {
      conveyor_sprite.draw_part (canvas_2d, r, x, y);
      x += 64;
      }

    // lightning
    if (grabber.block > -1)
      {
      x = grabber.x;
      y = grabber.y + 72;
      r.x = 0;//1 + lightning.frame * 79;
      r.y = lightning.frame * 25;
      r.width = 78;
      r.height = 24;
      lightning_sprite.draw_part (canvas_2d, r, x, y);
      }

    // blocks
    r.width = tilesize_x;
    r2.width = tilesize_x;
    r2.height = tilesize_y;
    for (b = 0; b < block.list.length; b += 1)
      {
      //console.log ("block.list[" + b + "].status: " + block.list[b].status);
      if (block.list[b].status === 1)
        {
        r.x = block.list[b].x;
        r.y = block.list[b].y + tilesize_y - block.list[b].height;
        r.height = block.list[b].height;
   
        if (block.list[b].goal_block === 1 && block.list[b].change > -1)
          {
          temp_fade = pulse_fade / 255;
          frame_sprite.draw (canvas_2d, block.list[b].x, block.list[b].y, temp_fade);
          }

        // rainbow blocks
        if (block.list[b].color === Q)
          {
          r2.width = tilesize_x;
          r2.height = tilesize_y;
          r2.x = tilesize_x * block.list[b].colorframe;
          r2.y = 0;
          rainbow_sprite.draw_part (canvas_2d, r2, block.list[b].x, block.list[b].y, 1.0);
          r2.x = tilesize_x * block.list[b].frame;
          r2.y = tilesize_y;
          rainbow_sprite.draw_part(canvas_2d, r2, block.list[b].x, block.list[b].y, 1.0);

          //if (r2.x > 160)
          //  {
          //  debugger;
          //  }
          }

        // non-rainbow blocks
        else
         {
          // r2.x = 0;
          // r2.y = tilesize_y * 8;
          // temp_fade = pulse_fade / 255;
          // if (block.list[b].color === K && block.list[b].change != -1) spriteBatch.Draw (block_sprite, block.list[b].v, r2, Color.White * temp_fade);
          r2.x = tilesize_x * block.list[b].frame;
          r2.y = tilesize_y * (block.list[b].color - 1);
          block_sprite.draw_part_scaled (canvas_2d, r2, r, 1.0);
          }
        }
      }

    // grabber
    r.x = 1; r.y = 1; r.width = 78; r.height = 72;
    grabber_sprite.draw_part (canvas_2d, r, grabber.x, grabber.y, 1.0);
    y = grabber.y - 72;
    while (y > -72)
      {
      x = grabber.x; r.x = 80; r.y = 1; r.width = 78; r.height = 72;
      grabber_sprite.draw_part (canvas_2d, r, x, y);
      y -= 72;
      }

    // menu box
    if (display_options === false)
      {
      box_sprite.draw (canvas_2d, box.x, box.y);
      box_newgame_sprite.draw (canvas_2d, box_newgame.x, box_newgame.y);
      box_options_sprite.draw (canvas_2d, box_options.x, box_options.y);
      box_menu_sprite.draw (canvas_2d, box_menu.x, box_menu.y);
      }

    game.draw_block_counter();

    // timer
    if (option_timer === true)
      {
      if (timer.time < 10) timer.x = screen_x_offset + (screen_width / 2) - (timer_0_sprite.width * 2.5);
      else if (timer.time < 100) timer.x = screen_x_offset + (screen_width / 2) - (timer_0_sprite.width * 2);
      else timer.x = screen_x_offset + (screen_width / 2) - (timer_0_sprite.width * 1.5);

      // t = timer.time.ToString ();
      // if (t.Length < 2) t = t.Insert (0, "0");
      // if (t.Length < 3) t = t.Insert (0, "0");
  // 
      // temp_fade = Convert.ToSingle (timer_opacity / 255);
  // 
      // if (timer.time >= 100)
        // {
        // if (t.Substring (0, 1) === "1") spriteBatch.Draw (timer_1_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "2") spriteBatch.Draw (timer_2_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "3") spriteBatch.Draw (timer_3_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "4") spriteBatch.Draw (timer_4_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "5") spriteBatch.Draw (timer_5_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "6") spriteBatch.Draw (timer_6_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "7") spriteBatch.Draw (timer_7_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "8") spriteBatch.Draw (timer_8_sprite, timer.v, Color.White * temp_fade);
        // if (t.Substring (0, 1) === "9") spriteBatch.Draw (timer_9_sprite, timer.v, Color.White * temp_fade);
        // }
      // if (timer.time >= 10)
        // {
        // v = timer.v; x = timer.x + 40;
        // if (t.Substring (1, 1) === "1") spriteBatch.Draw (timer_1_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "2") spriteBatch.Draw (timer_2_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "3") spriteBatch.Draw (timer_3_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "4") spriteBatch.Draw (timer_4_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "5") spriteBatch.Draw (timer_5_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "6") spriteBatch.Draw (timer_6_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "7") spriteBatch.Draw (timer_7_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "8") spriteBatch.Draw (timer_8_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "9") spriteBatch.Draw (timer_9_sprite, v, Color.White * temp_fade);
        // if (t.Substring (1, 1) === "0") spriteBatch.Draw (timer_0_sprite, v, Color.White * temp_fade);
        // }
      // v = timer.v; x = timer.x + 80;
      // if (t.Substring (2, 1) === "1") spriteBatch.Draw (timer_1_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "2") spriteBatch.Draw (timer_2_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "3") spriteBatch.Draw (timer_3_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "4") spriteBatch.Draw (timer_4_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "5") spriteBatch.Draw (timer_5_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "6") spriteBatch.Draw (timer_6_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "7") spriteBatch.Draw (timer_7_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "8") spriteBatch.Draw (timer_8_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "9") spriteBatch.Draw (timer_9_sprite, v, Color.White * temp_fade);
      // if (t.Substring (2, 1) === "0") spriteBatch.Draw (timer_0_sprite, v, Color.White * temp_fade);
      }

    // you win
    if (game_won === true)
      {
      // if (Math.round (Math.random() * 20) <= 1)
      if (random (0, 20) <= 1)
        {
        var firework_color = random (0, 6);//Math.round (Math.random() * 7);
        var firework_x = random (0, screen_width);//Math.round (Math.random() * screen_width);
        var firework_y = random (0, screen_height);//Math.round (Math.random() * screen_height);
        //particle_firework (firework_color, firework_x, firework_y);
        play_sound ("p");
        }

      x = screen_x_offset + (screen_width / 2);
      y = screen_y_offset + (screen_height / 2 - 50);
      youwin_bounce.bounce (youwin_sprite, x, y, 20, 4, 5);
      x2 = x - (playagain_sprite.width / 2);
      y2 = y + (youwin_sprite.height / 2);
      playagain_sprite.draw (canvas_2d, x2, y2, 1.0);
      }
    else if (game_lost === true)
    	{
    	youlose_bounce.bounce (youlose_sprite, screen_x_offset + (screen_width / 2), screen_y_offset + (screen_height / 2), 20, 4, 5);
      }

    // particles
    // for (var p = 0; p < particle_effect.length; p += 1)
    //   {
    //   particle_effect[p].draw ();
    //   }

    // options_fade.fade (spriteBatch, solid_black, Vector2.Zero);

    if (display_options === true)
      {
      // x = options_resume.x - (menu_resume_sprite.width / 2);
      // y = options_resume.y - (menu_resume_sprite.height / 2);
      // spriteBatch.Draw (menu_resume_sprite, v);
  // 
      // x = options_sound.x - (options_sound_off_sprite.width / 2);
      // y = options_sound.y - (options_sound_off_sprite.height / 2);
      // if (option_sound === true) spriteBatch.Draw (options_sound_on_sprite, v);
      // else spriteBatch.Draw (options_sound_off_sprite, v);
  // 
      // x = options_music.x - (options_music_off_sprite.width / 2);
      // y = options_music.y - (options_music_off_sprite.height / 2);
      // if (option_music === true) spriteBatch.Draw (options_music_on_sprite, v);
      // else spriteBatch.Draw (options_music_off_sprite, v);
  // 
      // x = options_difficulty.x - (options_difficulty_10_sprite.width / 2);
      // y = options_difficulty.y - (options_difficulty_10_sprite.height / 2);
      // if (option_difficulty_next === 1) spriteBatch.Draw (options_difficulty_1_sprite, v);
      // else if (option_difficulty_next === 2) spriteBatch.Draw (options_difficulty_2_sprite, v);
      // else if (option_difficulty_next === 3) spriteBatch.Draw (options_difficulty_3_sprite, v);
      // else if (option_difficulty_next === 4) spriteBatch.Draw (options_difficulty_4_sprite, v);
      // else if (option_difficulty_next === 5) spriteBatch.Draw (options_difficulty_5_sprite, v);
      // else if (option_difficulty_next === 6) spriteBatch.Draw (options_difficulty_6_sprite, v);
      // else if (option_difficulty_next === 7) spriteBatch.Draw (options_difficulty_7_sprite, v);
      // else if (option_difficulty_next === 8) spriteBatch.Draw (options_difficulty_8_sprite, v);
      // else if (option_difficulty_next === 9) spriteBatch.Draw (options_difficulty_9_sprite, v);
      // else if (option_difficulty_next === 10) spriteBatch.Draw (options_difficulty_10_sprite, v);
  // 
      // x = options_height.x - (options_height_7_sprite.width / 2);
      // y = options_height.y - (options_height_7_sprite.height / 2);
      // if (option_height === 1) spriteBatch.Draw (options_height_1_sprite, v);
      // else if (option_height === 2) spriteBatch.Draw (options_height_2_sprite, v);
      // else if (option_height === 3) spriteBatch.Draw (options_height_3_sprite, v);
      // else if (option_height === 4) spriteBatch.Draw (options_height_4_sprite, v);
      // else if (option_height === 5) spriteBatch.Draw (options_height_5_sprite, v);
      // else if (option_height === 6) spriteBatch.Draw (options_height_6_sprite, v);
      // else if (option_height === 7) spriteBatch.Draw (options_height_7_sprite, v);
  // 
      // x = options_timer.x - (options_timer_off_sprite.width / 2);
      // y = options_timer.y - (options_timer_off_sprite.height / 2);
      // if (option_timer_next === true) spriteBatch.Draw (options_timer_on_sprite, v);
      // else spriteBatch.Draw (options_timer_off_sprite, v);
      }
    }
    
    // menu box
    if (display_options === true && game_state === GAME)
      {
      // spriteBatch.Draw (box_sprite, box.v);
      // spriteBatch.Draw (box_newgame_sprite, box_newgame.v);
      // spriteBatch.Draw (box_options_sprite, box_options.v);
      // spriteBatch.Draw (box_menu_sprite, box_menu.v);
      }


    if (fade_direction != NONE)
      {
      canvas_2d.globalAlpha = fade_opacity;
      solid_black.draw (canvas_2d, 0, 0);
      canvas_2d.globalAlpha = 1.0;
      }

    //console.log (game_state);


  //   // debug text
  //   // canvas_2d.fillStyle = "#FFFF00";
  //   // canvas_2d.font = "16px arial";
  //   // canvas_2d.fillText ("mouse_x: " + mouse_x, 5, 20);
  //   // canvas_2d.fillText ("mouse_y: " + mouse_y, 5, 40);
  //   // canvas_2d.fillText ("menu_new.x: " + menu_new.x, 5, 60);
  //   // canvas_2d.fillText ("menu_new.y: " + menu_new.y, 5, 80);
  //   // canvas_2d.fillText ("screen_x_offset: " + screen_x_offset, 5, 100);
  //   // canvas_2d.fillText ("screen_width: " + screen_width, 5, 120);
  //   // canvas_2d.fillText ("menu_new_sprite.width: " + menu_new_sprite.width, 5, 140);
    }

  blockhead.prototype.draw_background = function()
    {
    background[background_index].draw (canvas_2d, screen_x_offset, screen_y_offset);
	  }

	blockhead.prototype.draw_block_counter = function()
	  {
	  block_counter.x = 0;
	  block_counter.y = 0;
	  x = block_counter.x;
	  y = block_counter.y;
	  //if (goal_blocks < 10) x += counter_0_sprite.width / 2;
	 
	  t = "" + goal_blocks;
	  if (t.length < 2)
	  	{
	  	//t = "0" + t;
	  	x += counter_0_sprite.width / 2;
	    }

	  temp_fade = counter_opacity / 255;

	  if (t[0] === "1") counter_1_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "2") counter_2_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "3") counter_3_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "4") counter_4_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "5") counter_5_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "6") counter_6_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "7") counter_7_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "8") counter_8_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "9") counter_9_sprite.draw (canvas_2d, x, y, 1.0);
	  if (t[0] === "0") counter_0_sprite.draw (canvas_2d, x, y, 1.0);
	  x = block_counter.x + 35;

	  if (t.length > 1)
	    {
	    if (t[1] === "1") counter_1_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "2") counter_2_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "3") counter_3_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "4") counter_4_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "5") counter_5_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "6") counter_6_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "7") counter_7_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "8") counter_8_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "9") counter_9_sprite.draw (canvas_2d, x, y, 1.0);
	    if (t[1] === "0") counter_0_sprite.draw (canvas_2d, x, y, 1.0);
	    }

	  x = block_counter.x;
	  y = block_counter.y + 40;
	  counter_label.draw (canvas_2d, x, y, 1.0);
    }

  }());
