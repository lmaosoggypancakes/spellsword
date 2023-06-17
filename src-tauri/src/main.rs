use discord_rich_presence::{activity, DiscordIpc, DiscordIpcClient};

#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  let mut client = DiscordIpcClient::new("1117689291120836699")?;

  client.connect()?;
  client.set_activity(activity::Activity::new()
      .state("foo")
      .details("bar")
  )?;
  client.close()?;

  Ok(())
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
