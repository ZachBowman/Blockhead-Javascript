// Fade Control
// 2007, 2022 Nightmare Games
// Zach Bowman

// TODO: replace fade_direction with fade_target
var fade_opacity = 0;
var fade_target = 0;
var fade_direction = NONE;
var fade_speed = 0.03;

////////////////////////////////////////////////////////////////////////////////

function fadeout ()
  {
  fade_direction = "out";
  fade_target = 1;
  }

function fadein ()
  {
  fade_direction = "in";
  fade_target = 0;
  }
   
////////////////////////////////////////////////////////////////////////////////
 
function Fade_Control ()
  {
  // if (fade_direction === "in")
  //   {
  //   fade_opacity -= fade_speed;
  //   if (fade_opacity <= 0) fade_direction = NONE;
  //   }
  // else if (fade_direction === "out")
  //   {
  //   fade_opacity += fade_speed;
  //   if (fade_opacity >= 1.0)
  //     {
  //     fade_direction = "in";

  //     game_state = next_game_state;
  //     next_game_state = NONE;          

  //     if (newgame === true && (game_state === GAME || game_state === TUMBLE)) new_game ();
  //     }
  //   }

  // Fade in
  if (fade_opacity > fade_target)
    {
    fade_opacity -= fade_speed;
    if (fade_opacity <= fade_target) fade_opacity = fade_target;
    }

  // Fade out
  else if (fade_opacity < fade_target)
    {
    fade_opacity += fade_speed;
    if (fade_opacity >= fade_target)
      {
      fade_opacity = fade_target;
      
      // Fade back in to the new game state
      if (fade_target === 1)
        {
        fade_target = 0;
        game_state = next_game_state;
        next_game_state = NONE;          

        if (newgame === true && (game_state === GAME || game_state === TUMBLE)) new_game ();
        }
      }
    }
  }

////////////////////////////////////////////////////////////////////////////////
