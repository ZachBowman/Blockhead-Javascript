// Wobbly Piss
// 2014 Nightmare Games
// Zach Bowman

////////////////////////////////////////////////////////////////////////////////

function handleClick()
  {
	canvas_html.onclick = null;
	//play_sound ("zip3");
	}

////////////////////////////////////////////////////////////////////////////////

function mouse_move (e, finger, canvas_html)
  {
  if (!e) var e = event;
  if (!canvas_html) canvas_html = document.getElementById ("canvas");
  if (finger === true) e.preventDefault();

  if (canvas_html)
    {
    mouse_x = e.pageX - canvas_html.offsetLeft;
    mouse_y = e.pageY - canvas_html.offsetTop;
    }
  }

////////////////////////////////////////////////////////////////////////////////

function mouse_down (finger, mouse_x, mouse_y)
  {
  var click_x = mouse_x;
  var click_y = mouse_y;  
  
  if (game_state == SPLASH)
    {
    if (sound_loaded_flag === true)
      {
      splash_screen_click();
      }
    }
  if (game_state === MENU)
    {
    if (game_active === true && click_over_object (click_x, click_y, menu_resume))
      {
      fadeout ();
      if (game_active === true)
        {
        newgame = false;
        newsong = false;
        }
      next_game_state = GAME;
      sound_click = true;
      console.log ("RESUME");
      }
    if (click_over_object (click_x, click_y, menu_new))
      {
      click_new_game ();
      }
    else if (click_over_object (click_x, click_y, menu_instruct))
      {
      fadeout ();
      next_game_state = INSTRUCT1;
      sound_click = true;
      console.log ("INSTRUCTIONS");
      }
    // else if (click_over (click_x, click_y, menu_exit, menu_exit_sprite))
    //   {
    //   sound_click = true;
    //   exit_game ();
    //   }
    }
  else if (game_state === INSTRUCT1)
    {
    fadeout ();
    next_game_state = INSTRUCT2;
    sound_click = true;
    }
  else if (game_state === INSTRUCT2)
    {
    fadeout ();
    if (played_game === false && clicked_new === true) next_game_state = GAME;
    else next_game_state = MENU;
    sound_click = true;
    }
  else if (game_state === CREDITS)
    {
    fadeout ();
    next_game_state = MENU;
    sound_click = true;
    }
  else if (game_state === GAME)
    {
    if (display_options === false)
      {
      if (click_over_rect (click_x, click_y, game_region))
        {
        if (game_won === true || game_lost === true)
          {
          click_new_game();
          }
        else if (click_x >= puzzle_x && click_x <= puzzle_x + puzzle_width
          && click_y >= puzzle_y && click_y < puzzle_y + puzzle_height
          && game_active === true)
          {
          var column = Math.round(((click_x - puzzle_x) / tilesize_x) - .50);
 
          if (column >= 0 && column < 7)
            {
            grabber.destination = column;
            //particle_vertical_highlight (puzzle_x + (grabber.destination * tilesize_x), puzzle_y);
            grabber.control_type = CLICK_CONTROL;
            if (grabber.gx === grabber.destination) drop_block ();
            }
          }
        }

      else if (click_over_object (click_x, click_y, box_newgame))
        {
        click_new_game();
        }
      else if (click_over_object (click_x, click_y, box_menu))
        {
        fadeout();
        next_game_state = MENU;
        move_menu();
        }
      else if (click_over_rect (click_x, click_y, box_options))
        {
        display_options = true;
        }
      }
    else if (display_options === true)
      {
      // if (click_over (click, options_resume.v, menu_resume_sprite))
        // {
        // display_options = false;
        // options_fade.reset ();
        // options_fade.init (192, 0, 24);
        // }
      // else if (click_over (click, options_sound.v, options_sound_off_sprite))
        // {
        // if (option_sound === true) option_sound = false;
        // else option_sound = true;
        // sound_click = true;
        // }
      // else if (click_over (click, options_music.v, options_music_off_sprite))
        // {
        // if (option_music === true) option_music = false;
        // else option_music = true;
        // sound_click = true;
        // }
      // else if (click_over (click, options_difficulty.v, options_difficulty_10_sprite))
        // {
        // option_difficulty_next += 1;
        // if (option_difficulty_next > 10) option_difficulty_next = 1;
        // sound_click = true;
        // }
      // else if (click_over (click, options_height.v, options_height_7_sprite))
        // {
        // option_height += 1;
        // if (option_height > 7) option_height = 1;
        // sound_click = true;
        // }
      // else if (click_over (click, options_timer.v, options_timer_off_sprite))
        // {
        // if (option_timer_next === true) option_timer_next = false;
        // else option_timer_next = true;
        // sound_click = true;
        // }
      }
    // if (click_over (click, box_newgame.v, box_newgame_sprite))
      // {
      // fadeout ();
      // if (played_game === true) next_game_state = GAME;
      // else next_game_state = INSTRUCT1;
      // newsong = true;
      // newgame = true;
      // sound_click = true;
      // clicked_new = true;
      // }
    // else if (click_over (click, box_options.v, box_options_sprite))
      // {
      // if (display_options === false)
        // {
        // display_options = true;
        // options_fade.init (0, 192, 24);
        // }
      // else if (display_options === true)
        // {
        // display_options = false;
        // options_fade.reset ();
        // options_fade.init (192, 0, 24);
        // }
      // }
    // else if (click_over (click, box_menu.v, box_menu_sprite))
      // {
      // blockhead_bounce.bouncepop_init ();
      // write_config ();
      // fadeout ();
      // next_game_state = MENU;
      // title_screen_bg ();
      // move_menu ();
      // sound_click = true;
      // }
    }
  pointer_down = true;
  mouse_move (finger);
  }
  
////////////////////////////////////////////////////////////////////////////////

// checks if the click is over a rectangle or any object with x, y, width, and height

function click_over_rect (click_x, click_y, rect)
  {
  if (click_x >= rect.x && click_x <= rect.x + rect.width
      && click_y >= rect.y && click_y <= rect.y + rect.height)
    {
    return true;
    }

  else return false;
  }

////////////////////////////////////////////////////////////////////////////////

// checks if the click is over an object that relies on its sprite for width and height

function click_over_object (click_x, click_y, object)
  {
  if (object.draw_from_center === true
      && click_x >= object.x - (object.sprite.width / 2) && click_x <= object.x + (object.sprite.width / 2)
      && click_y >= object.y - (object.sprite.height / 2) && click_y <= object.y + (object.sprite.height / 2))
    {
    return true;
    }

  else if (click_x >= object.x && click_x <= object.x + object.sprite.width
      && click_y >= object.y && click_y <= object.y + object.sprite.height)
    {
    return true;
    }

  else return false;
  }

//////////////////////////////////////////////////////////////////////////////// 

function mouse_up (finger)
  {
  pointer_down = false;
  if (finger === false) mouse_move (false);
  }

////////////////////////////////////////////////////////////////////////////////

function keyboard_down (event)
  {
    //   // escape
    //   if (keyboard.IsKeyDown (Keys.Escape) && key_esc == false)
    //     {
    //     key_esc = true;
    //     if (game_state == MENU)
    //       {
    //       if (cue_bg != null && cue_bg.IsPaused) cue_bg.Resume ();
    //       fadeout ();
    //       if (game_active == true)
    //         {
    //         newgame = false;
    //         newsong = false;
    //         }
    //       next_game_state = GAME;
    //       }
    //     else if (game_state == GAME)
    //       {
    //       if (cue_bg != null && cue_bg.IsPlaying) cue_bg.Pause ();
    //       fadeout ();
    //       next_game_state = MENU;
    //       move_menu ();
    //       }
    //     }
    //   else if (!keyboard.IsKeyDown (Keys.Escape) && key_esc == true) key_esc = false;

    //   // spacebar
    //   if (keyboard.IsKeyDown (Keys.Space) && key_space == false)
    //     {
    //     key_space = true;
    //     if (game_state == GAME && game_active == true)
    //       {
    //       if (grabber.dir == NONE && grabber.block > -1 && grid[grabber.gy + 1, grabber.gx] == '.')
    //         {
    //         block[grabber.block].gx = grabber.gx;
    //         block[grabber.block].gy = grabber.gy;
    //         block[grabber.block].x = puzzle_x + (block[grabber.block].gx * tilesize_x);
    //         block[grabber.block].y = puzzle_y + (block[grabber.block].gy * tilesize_y);
    //         grid[block[grabber.block].gy, block[grabber.block].gx] = color2char (block[grabber.block].color);
    //         num[block[grabber.block].gy, block[grabber.block].gx] = grabber.block;
    //         block[grabber.block].is_checked = false;
    //         block[grabber.block].count = 0;
    //         grabber.block = -1;
    //         if (next1.block >= 0) grabber.status = 0;
    //         }
    //       }
    //     }
    //   else if (!keyboard.IsKeyDown (Keys.Space) && key_space == true) key_space = false;

    if ((event.keyIdentifier === "Left" || event.key === "ArrowLeft") && key_left === false)
      {
      key_left = true;
      if (game_state === GAME && game_active === true)
        {
        grabber.control_type = KEYBOARD_CONTROL;
        if (grabber.gx > 0) grabber.destination = grabber.gx - 1;
        }
      }

    if ((event.keyIdentifier === "Right" || event.key === "ArrowRight") && key_right === false)
      {
      key_right = true;
      if (game_state === GAME && game_active === true)
        {
        grabber.control_type = KEYBOARD_CONTROL;
        if (grabber.gx < 5) grabber.destination = grabber.gx + 1;
        }
      }

    if ((event.keyIdentifier === "Down" || event.key === "ArrowDown") && key_down === false)
      {
      key_down = true;
      if (game_state === GAME && game_active === true)
        {
        grabber.control_type = KEYBOARD_CONTROL;
        drop_block ();
        }
      }

  }

function keyboard_up (event)
  {
  if ((event.keyIdentifier === "Left" || event.key === "ArrowLeft") && key_left === true)
    {
    key_left = false;
    if (grabber.wantmove === LEFT) grabber.wantmove = NONE;
    }

  if ((event.keyIdentifier === "Right" || event.key === "ArrowRight") && key_right === true)
    {
    key_right = false;
    if (grabber.wantmove === RIGHT) grabber.wantmove = NONE;
    }

  if ((event.keyIdentifier === "Down" || event.key === "ArrowDown") && key_down === true)
    {
    key_down = false;
    }
  }

function click_new_game ()
  {
  fadeout ();
  //if (played_game === true)
  next_game_state = GAME;
  //else next_game_state = INSTRUCT1;
  newsong = true;
  newgame = true;
  sound_click = true;
  clicked_new = true;
  play_sound ("gong");
  }
