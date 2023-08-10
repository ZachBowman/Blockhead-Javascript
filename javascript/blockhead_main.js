// Blockhead
// Nightmare Games
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
var next_game_state = SPLASH;
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
var random_generation = true;  // Only false when testing hard-coded scenarios.
var tumble_down = true;
var music_state = MUSIC_STOPPED;

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
var key_space = false;

// title screen
var title_border = 150;
var splash_clicked = false;
var loading_text = "LOADING";
var splash_text = "CLICK TO START";
var title_pingponger = new Pingponger ();
var sound_loaded_flag = false;

// var fade_opacity = 0;
// var fade_direction = NONE;

// physics
var initial_velocity_on_drop = 1;
var gravity_acceleration = 0.2;
var gravity_max_game = 6;
var gravity_max_tumble = 6;

// blocks
var block = new Block_List ();

// frame pulse data
var pulse_frames = 30;         // number of drawing frames for pulse to last (30 = 1 second)
var pulse_increasing = true;   // fading in = true, out = false
var pulse_speed;               // amount to increase each frame (1.0 / frames)
var pulse_fade = 0.0;
var pulse_max = 1.0;//160;

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

var text_loading_sprite = Sprite ("text_loading_2");
var text_click_to_start_sprite = Sprite ("text_click_to_start_2");

var menu_new_sprite = Sprite ("menu_newgame2");
var menu_instruct_sprite = Sprite ("menu_instruct2");
var menu_exit_sprite = Sprite ("menu_exit2");
var menu_resume_sprite = Sprite ("menu_resume2");

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

var timer_number_sprites =
  [
  Sprite ("timer_0"),
  Sprite ("timer_1"),
  Sprite ("timer_2"),
  Sprite ("timer_3"),
  Sprite ("timer_4"),
  Sprite ("timer_5"),
  Sprite ("timer_6"),
  Sprite ("timer_7"),
  Sprite ("timer_8"),
  Sprite ("timer_9")
  ];

var counter_number_purple_sprites = 
  [
  Sprite ("counter_0"),
  Sprite ("counter_1"),
  Sprite ("counter_2"),
  Sprite ("counter_3"),
  Sprite ("counter_4"),
  Sprite ("counter_5"),
  Sprite ("counter_6"),
  Sprite ("counter_7"),
  Sprite ("counter_8"),
  Sprite ("counter_9")
  ];

var counter_number_white_sprites =
  [
  Sprite ("counter_0_white"),
  Sprite ("counter_1_white"),
  Sprite ("counter_2_white"),
  Sprite ("counter_3_white"),
  Sprite ("counter_4_white"),
  Sprite ("counter_5_white"),
  Sprite ("counter_6_white"),
  Sprite ("counter_7_white"),
  Sprite ("counter_8_white"),
  Sprite ("counter_9_white")
  ];

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

var options_sound_sprite = Sprite ("options_sound3");
var options_music_sprite = Sprite ("options_music3");
var options_difficulty_sprite = Sprite ("options_difficulty3");
var options_height_sprite = Sprite ("options_height3");
var options_timer_sprite = Sprite ("options_timer3");

var options_on_sprite = Sprite ("options_on3");
var options_off_sprite = Sprite ("options_off3");

var options_1_sprite = Sprite ("options_1a");
var options_2_sprite = Sprite ("options_2a");
var options_3_sprite = Sprite ("options_3a");
var options_4_sprite = Sprite ("options_4a");
var options_5_sprite = Sprite ("options_5a");
var options_6_sprite = Sprite ("options_6a");
var options_7_sprite = Sprite ("options_7a");
var options_8_sprite = Sprite ("options_8a");
var options_9_sprite = Sprite ("options_9a");
var options_10_sprite = Sprite ("options_10a");

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

// Dimensions
var puzzle_pixel_width, puzzle_pixel_height;
var puzzle_x = screen_x_offset + (tile_pixel_width / 2);
var puzzle_y = 100;
var tile_pixel_width = 40;
var tile_pixel_height = 40;
var puzzle_tile_width;// = 8;  // width in tiles of puzzle including walls
var puzzle_tile_height;// = 10; // height

// block grids
var color_grid = [[]];  // TODO: Do we really need this?
var number_grid = [[]];
var tumble_grid = [[]];

// animation frame counters
var frame_frame;
var frame_count;
var frame_delay;

// objects
var big_purple = new Block();
var lightning = new Game_Object();
var blockhead_logo = new Game_Object();

var menu_new = new Game_Object (menu_new_sprite, true);
var menu_instruct = new Game_Object (menu_instruct_sprite, true);
var menu_resume = new Game_Object (menu_resume_sprite, true);

var ng = new Game_Object (ng_sprite);

var grabber = new Grabber();
var conveyor = new Conveyor();
var chart = new Chart();
var box = new Game_Object();

var box_newgame = new Game_Object (box_newgame_sprite);
var box_menu = new Game_Object (box_menu_sprite);
var box_options = new Game_Object (box_options_sprite);

var block_counter = new Game_Object();
var timer = new Timer();
var timer_interval = null;
var next1 = new Next_Block();
var next2 = new Next_Block();
var next3 = new Next_Block();
var splash = new Game_Object();
var date = new Date();

var options =
  [
  new Option (menu_resume_sprite, true, toggle_options, "none"),
  new Option (options_sound_sprite, true, null, "bool", true),
  new Option (options_music_sprite, true, toggle_music, "bool", true),
  new Option (options_difficulty_sprite, true, null, "int", 3, 1, 10),
  new Option (options_height_sprite, true, null, "int", 3, 1, 7),
  new Option (options_timer_sprite, true, null, "bool", true)
  ];

var OPTION_RESUME = 0;
var OPTION_SOUND = 1;
var OPTION_MUSIC = 2;
var OPTION_DIFFICULTY = 3;
var OPTION_HEIGHT = 4;
var OPTION_TIMER = 5;

// var options_timer_object = new Game_Object();
// var options_timer_value_object = new Game_Object();

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

//var os = window.navigator?.userAgentData;//?.platform || window.navigator?.platform;
//var navigator = navigator;
var platform = navigator.platform;
var user_agent = navigator.userAgent;
var is_ios = platform === "iPhone" || platform === "iPad" || platform === "iPod";// ? true : false;
  
var music_player = null;
var music_volume = 0.5;
var music_track = null;
var last_track = null;
var total_sounds = 0;
var sounds_loaded = 0;
var newsong = true;

var timer_opacity = 255;
var counter_opacity = 255;
   
// credits screen
//   var credits_rotation = 0;

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
  big_purple.alive = true;
  big_purple.state = CHANGE_NONE;
  big_purple.frame = 0;
  //big_purple.dir = NONE;
  big_purple.vertical_velocity = 0;

  // lightning
  lightning.frame = 0;
  lightning.last_frame = 0;
  lightning.count = 0;
  lightning.delay = 2;

  blockhead_bounce.bouncepop_init ();
  blockhead_logo.x = screen_x_offset + (screen_width / 2);
  blockhead_logo.y = screen_y_offset + 60;

  pulse_speed = pulse_max / pulse_frames;  // amount to increase each frame

  init_sound();
  }

////////////////////////////////////////////////////////////////////////////////

setInterval (function()
  {
  // Both LOADING and SPLASH game states.
  if (splash_clicked === false) splash_screen_update();
  else game.update();

  try
    {
    if (canvas_2d)
      {
      if (splash_clicked === false) splash_screen_draw();
      else game.main_draw();
      }
    }
  catch (error)
    {
    //console.log ("canvas_2d not ready yet.");
    console.log (error);
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
  music_state = MUSIC_LOADING;
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_update ()
  {
  Update_Loading_Text();
  Update_Goal_Frame_Pulse();

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
    //splash_sprite.draw_rotated(canvas_2d, screen_width / 2, screen_height / 2, 5);
    //splash_sprite.draw_rotated_from_center(canvas_2d, screen_width / 2, screen_height / 2, 5);

    //canvas_2d.fillStyle = "#FFFFFF";
    //canvas_2d.font = "24px impact";
    //if (click_here_onoff === true)
      //{
      //canvas_2d.fillText (loading_text, 150, 500);
      text_loading_sprite.draw_from_center(canvas_2d, screen_width / 2, 500, pulse_fade);
      //}
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
    if (!is_ios)
      {
      r.x = 80 * big_purple.frame;
      r.y = 0;
      r.width = 80;
      r.height = 80;
      if (big_purple_sprite.draw_part != undefined) big_purple_sprite.draw_part (canvas_2d, r, big_purple.x, big_purple.y);
      }

    blockhead_bounce.bounce (blockhead_logo_sprite, blockhead_logo.x, blockhead_logo.y, 20, 4, 4);

    text_click_to_start_sprite.draw_from_center(canvas_2d, screen_width / 2, 400, pulse_fade);
    }
  }

////////////////////////////////////////////////////////////////////////////////

function splash_screen_click ()
  {
  splash_clicked = true;
  div.removeEventListener ("click", splash_screen_click, false);
  game = new blockhead_namespace.blockhead();
  game_state = MENU;
  music_state = MUSIC_PLAYING;

  canvas_html.addEventListener   ("mousedown",   function() {mouse_down (false, mouse_x, mouse_y)}, false);
  canvas_html.addEventListener   ("mousemove",   function(event) {mouse_move (event, false, canvas_html)}, false);
  canvas_html.addEventListener   ("touchstart",  function() {mouse_down (true)},  false);
  canvas_html.addEventListener   ("touchmove",   function() {mouse_move (true)},  true);
  canvas_html.addEventListener   ("touchend",    function() {mouse_up (true)},    false);
  document.body.addEventListener ("mouseup",     function() {mouse_up (false)},   false);
  document.body.addEventListener ("touchcancel", function() {mouse_up (true)},    false);
  //document.body.addEventListener ('touchstart',  function (event) {event.preventDefault();}, false);
  //document.body.addEventListener ('touchmove',   function (event) {event.preventDefault();}, false);
  //document.addEventListener ('touchstart',  function (event) {event.preventDefault();}, {passive: false});
  //document.addEventListener ('touchmove',   function (event) {event.preventDefault();}, {passive: false});
  document.addEventListener ("keydown", keyboard_down, false);
  document.addEventListener ("keyup", keyboard_up, false);
  document.addEventListener ("visibilitychange", visibility_change, false);
  window.addEventListener ("load", function()
    {
    setTimeout(function()
      {
      window.scrollTo(0, 1);
      }, 0);
    });

  play_sound ("start");
  }

////////////////////////////////////////////////////////////////////////////////

this.blockhead_namespace = this.blockhead_namespace || {};

////////////////////////////////////////////////////////////////////////////////

function visibility_change (event)
  {
  //if (!options[OPTION_MUSIC].on() || music_state == MUSIC_OFF) return;
  if (ACTUAL_MUSIC || music_state == MUSIC_OFF) return;

  //if ((document.visibilityState === "visible" && music_player.getPaused() === true)
  if ((document.visibilityState === "visible" && music_player.paused === true)
    || (document.visibilityState === "visible" && music_state == MUSIC_PAUSED))
    {
    //music_player.setPaused (false);
    music_player.paused = false;
    music_state = MUSIC_PLAYING;
    }
  //if ((document.visibilityState != "visible" && music_player.getPaused() === false)
  if ((document.visibilityState != "visible" && music_player.paused === false)
    || (document.visibilityState != "visible" && music_state == MUSIC_PLAYING))
    {
    //music_player.setPaused (true);
    music_player.paused = true;
    music_state = MUSIC_PAUSED;
    }
  }

////////////////////////////////////////////////////////////////////////////////

(function ()
  {
        
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
  
    // pulse_speed = pulse_max / pulse_frames;  // amount to increase each frame

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

    else if (game_state === TUMBLE)
      {
      Update_Options();
      Tumble_Control();
      Falling_Blocks();
      Check_Tumble_Finished();
      }

    else if (game_state === GAME)
      {
      Update_Options();
      Block_Counter();
      Grabber_Control();
      Chart_Control();
      Update_Goal_Frame_Pulse();
      Conveyor_Control();
      Falling_Blocks();
      Color_Change();
      Destroy_Blocks();
      Block_Animations();
      Update_Particles();
      Check_Win();
      }

    lightning_control();
    Music_Control();
    Fade_Control();
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

  blockhead.prototype.main_draw = function ()
    {
    let x = 0, y = 0;
    let x2 = 0, y2 = 0;
    //let x3 = 0, y3 = 0;
    let r = new Rectangle ();
    let r2 = new Rectangle ();

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
      
    else if (game_state === TUMBLE || game_state === GAME)
      {
      draw_background();
   
      // bottom border
      x = 0;
      y = screen_height - box_sprite.height - demolition_sprite.height;
      demolition_sprite.draw (canvas_2d, x, y);
     
      // block smasher (cube the blocks fall into)
      x = puzzle_x;// + tile_pixel_width - 1;
      y = puzzle_y;// + tile_pixel_height - 1;
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
      
      if (chart.block0 < M)
        {
        x = chart.x1; y = chart.y1; r.x = 1;  r.y = 1 + ((chart.block1a - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x2; y = chart.y1; r.x = 22; r.y = 1 + ((chart.arrow1  - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x3; y = chart.y1; r.x = 1;  r.y = 1 + ((chart.block1b - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x1; y = chart.y2; r.x = 1;  r.y = 1 + ((chart.block2a - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x2; y = chart.y2; r.x = 22; r.y = 1 + ((chart.arrow2  - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        x = chart.x3; y = chart.y2; r.x = 1;  r.y = 1 + ((chart.block2b - 1) * 21); chart_stuff_sprite.draw_part (canvas_2d, r, x, y);
        }
   
      draw_conveyor();
      draw_lightning();
      draw_blocks();
      draw_grabber();
      draw_quick_menu_box();
      draw_block_counter();
      draw_timer();
      }

    if (fade_opacity > 0)
      {
      canvas_2d.globalAlpha = fade_opacity;
      solid_black.draw (canvas_2d, 0, 0);
      canvas_2d.globalAlpha = 1.0;
      }

    if (game_state === TUMBLE || game_state === GAME)
      {
      // particles
      for (let p = 0; p < particle_effect.length; p += 1) particle_effect[p].draw();

      // you win / lose
      if (game_won === true)
        {
        // if (Math.round (Math.random() * 20) <= 1)
        if (random (0, 20) <= 1)
          {
          let firework_color = random (0, 6);//Math.round (Math.random() * 7);
          let firework_x = random (0, screen_width);//Math.round (Math.random() * screen_width);
          let firework_y = random (0, screen_height);//Math.round (Math.random() * screen_height);
          particle_firework (firework_color, firework_x, firework_y);
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

      if (display_options === true)  draw_options_screen();
      }  // game_state === GAME
    
    //console.log (game_state);

    // debug text
    // canvas_2d.fillStyle = "#FFFF00";
    // canvas_2d.font = "16px arial";
    // canvas_2d.fillText ("mouse_x: " + mouse_x, 5, 20);
    // canvas_2d.fillText ("mouse_y: " + mouse_y, 5, 40);
    // canvas_2d.fillText ("menu_new.x: " + menu_new.x, 5, 60);
    // canvas_2d.fillText ("menu_new.y: " + menu_new.y, 5, 80);
    // canvas_2d.fillText ("screen_x_offset: " + screen_x_offset, 5, 100);
    // canvas_2d.fillText ("screen_width: " + screen_width, 5, 120);
    // canvas_2d.fillText ("menu_new_sprite.width: " + menu_new_sprite.width, 5, 140);
    }

  }());
