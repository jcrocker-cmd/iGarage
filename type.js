new TypeIt("#simpleUsage", {
    speed: 50,
    waitUntilVisible: true,
  })
  .type("This game is developed by the CAN which stands for Cutin, Abrau and Narbaja a students from BSCS 4C.")
  .break({ delay: 500 })
  .break({ delay: 500 })
  .type("<em>TAGLINE</em>")
  .break({ delay: 500 })
  .type("<em>-If we CAN then you CAN.</em>")
  .break({ delay: 500 })
  .break({ delay: 500 })
  .type("<strong>© 2021 iGarage. All rights reserved.</strong>")
  .go();