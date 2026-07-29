# League Tools

![Issues](https://img.shields.io/github/issues-raw/7rebux/league-tools)
![Pull requests](https://img.shields.io/github/issues-pr/7rebux/league-tools)
![Last commit](https://img.shields.io/github/last-commit/7rebux/league-tools/main)
![License](https://img.shields.io/github/license/7rebux/league-tools)
![Stars](https://img.shields.io/github/stars/7rebux/league-tools)

A cross-platform desktop app with many League Client exploits:

- Change your profile icon to any icon
- Change your profile background to any splashart
- Bypass status character limit
- Change your availability (for example appear as offline)
- Clear selected challenge tokens
- Use the same challenge token multiple times
- Display custom ranks in all ranked game modes & challenges

## 🧩 Demo

<img src='demo.gif' width=650>

## 💾 Installation

Either download and install the latest release or make your own changes to this project by cloning this repository.

### Download

- [Windows](https://github.com/7rebux/league-tools/releases/download/0.6.1/league-tools-0.6.1-win32-x64.zip)

### Development

```bash
git clone "https://github.com/7rebux/league-tools"
cd "./league-tools"
bun install
bun run start
```

To work on the UI without a running League Client (for example on macOS), start the
app with a mocked LCU. It serves canned summoner data, skips the connect screen and
applies changes locally, so every page is reachable and interactive:

```bash
bun run start:mock
```

## 👨‍💻 Contributing

Just open a pull request and explain your additions and changes.

## ℹ️ Riot Games

This project isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.

## ⚖️ License

This project is licensed under the MIT License - see the [LICENSE file](/LICENSE) for details

## 🔗 Related Projects

[Awesome League](https://github.com/CommunityDragon/awesome-league), a list of things that work with the League of Legends API.
