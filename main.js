async function main(){
  const content = await (await fetch("https://testflight.apple.com/join/gdE4pRzI")).text()
  const webhook = "https://canary.discord.com/api/webhooks/1218190715910356992/8DP3Ka0j4iX8kXUroDRwRSb1E73Jo0b1zF3uJ1zkn6AR7-NhfQ2MWsbGVbmkf8aKoFKR"
  const role = "<@&1218192974979137607>"

  
  if (content.includes("This beta is full.")){
    // full
         await fetch(webhook, {
      method: "POST",
      body: JSON.stringify({
        content: "Testflight is **full**!"
    })
    })
    return 
  }
  if (content.includes("This beta isn't accepting"){
    // closed
     await fetch(webhook, {
      method: "POST",
      body: JSON.stringify({
        content: "Testflight is **closed**!"
    })
    })
  
    return   
  }

  // open 
  await fetch(webhook, {
    method: "POST",
    body: JSON.stringify({
      content: `${role} Testflight is now **open**!`
    })
  })
  
  
}
main()
