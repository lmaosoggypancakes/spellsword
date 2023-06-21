#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]


use declarative_discord_rich_presence::DeclarativeDiscordIpcClient;
use declarative_discord_rich_presence::activity::{Activity, Timestamps, Assets};
use tauri::{Manager, State};
use std::{time};
fn main() {
  tauri::Builder::default()
  .setup(|app| Ok({
    let client = DeclarativeDiscordIpcClient::new("1117689291120836699");

    client.enable();
   
    let _ = client.set_activity(Activity::new()
      .assets(Assets::new().large_image("logo"))
        .details("In Main Menu").timestamps(Timestamps::new().start(time::SystemTime::now().duration_since(time::UNIX_EPOCH).expect("Error").as_secs().try_into().unwrap()))
    );
    app.manage(client);
  }))
  .run(tauri::generate_context!())
  .expect("error while running tauri application")
}

#[tauri::command]
fn set_activity(client: State<'_, DeclarativeDiscordIpcClient>) {
    client.set_activity(
      Activity::new()
        .details("")
    );
}