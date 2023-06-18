#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use discord_presence::{Client, Event};
use std::{thread, time, cell::RefCell};
use once_cell::{sync::Lazy};
fn getClient() -> Client {
  return Client::new(1117689291120836699);
}
static mut DRPC: Lazy<Client> = Lazy::new(getClient);
fn main() {
  unsafe {
    
    DRPC.on_ready(|_ctx| {
      println!("Ready!");
    });
    
    DRPC.on_error(|ctx| {
      eprint!("An error occurred: {}", ctx.event);
  });
  
  
  DRPC.start();
  DRPC.block_until_event(Event::Ready);
  // thread::sleep(time::Duration::from_secs(5));
  if let Err(why) = DRPC.set_activity(|a| {
    a.details("In Main Menu").assets(|ass| {
      ass.large_image("logo")
    }).timestamps(|time| {
      time.start(time::SystemTime::now().duration_since(time::UNIX_EPOCH).expect("Error").as_secs())
    })
  }) {
    println!("Failed to set presence: {}", why);
  }
}
  tauri::Builder::default()
  .run(tauri::generate_context!())
  .expect("error while running tauri application");
}

#[tauri::command]
fn avatar() {
  unsafe {

    DRPC.set_activity(|a| {
      a.details("Editing Avatar").assets(|ass| {
        ass.large_image("logo")
      })
      .timestamps(|time| {
        time.start(time::SystemTime::now().duration_since(time::UNIX_EPOCH).expect("Error").as_secs())
      })
    });
  }
}

#[tauri::command]
fn matchmaking() {
  unsafe {

    DRPC.set_activity(|a| {
      a.details("In queue (1 of 2)").assets(|ass| {
        ass.large_image("logo")
      })
      .timestamps(|time| {
        time.start(time::SystemTime::now().duration_since(time::UNIX_EPOCH).expect("Error").as_secs())
      })
    });
  }
}

#[tauri::command]
fn docs() {
  unsafe {

    DRPC.set_activity(|a| {
      a.details("Browsing Documentation").assets(|ass| {
        ass.large_image("logo")
      })
      .timestamps(|time| {
        time.start(time::SystemTime::now().duration_since(time::UNIX_EPOCH).expect("Error").as_secs())
      })
    });
  }
}

#[tauri::command]
fn playing() {
  unsafe {

    DRPC.set_activity(|a| {
      a.details("In Match").assets(|ass| {
        ass.large_image("logo")
      })
      .timestamps(|time| {
        time.start(time::SystemTime::now().duration_since(time::UNIX_EPOCH).expect("Error").as_secs())
      })
    });
  }
}