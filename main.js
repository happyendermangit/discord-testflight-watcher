async function sendToHook(message) {

  const webhook = process.env.DISCORD_WEBHOOK
    const response = await (
    await fetch(webhook, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(message),
    })
  ).text();
  console.log(response);
}

async function main() {
  const testflight_url = "https://testflight.apple.com/join/gdE4pRzI";
  const content = await (await fetch(testflight_url)).text();


  const role = "<@&1218192974979137607>";

  if (content.includes("This beta is full.")) {
    // full
    await sendToHook({
      embeds: [
        {
          title: "Testflight is **full**!",
          url: testflight_url,
          description: "Testflight is full right now.",
          color: 0xff6e14,
        },
      ],
    });
    return;
  }
  if (content.includes("This beta isn't accepting")) {
    // closed
    await sendToHook({
      embeds: [
        {
          title: ":x: Testflight is **closed**!",
          url: testflight_url,
          description: "Testflight is closed right now.",
          color: 0xff4d4d,
        },
      ],
    });
    return;
  }

  // open
  await sendToHook({
    content: role,
    embeds: [
        {
            title: ":white_check_mark: Testflight is **open**",
            url: testflight_url,
            description: "Testflight is open and has slots right now.",
            color: 0x5865F2
        }
    ]
    });
  return;
}
main();
