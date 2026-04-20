app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://asko-ai-8bpp.vercel.app",
        "https://asko-ai-8bpp-git-main-panvithachowdarys-projects.vercel.app",
        "https://asko-ai-8bpp-azzx4vvju-panvithachowdarys-projects.vercel.app"
      ],
      methods: ["GET", "POST"],
      credentials: true
    })
  );