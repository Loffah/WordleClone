# Birthday Wordle 🎂

A special birthday surprise twist on the classic Wordle game! This interactive web game starts as a normal 5-letter Wordle but reveals a hidden birthday message when the player makes their first guess.

## 🎮 How It Works

1. **Start Simple**: The game begins as a standard 5-letter Wordle targeting "HAPPY"
2. **The Reveal**: After the first guess (regardless of correctness), the grid magically expands to reveal the full message: "HAPPY BIRTHDAY DOG"
3. **Keep Playing**: Players can now solve the full 18-character phrase with visual feedback
4. **Never Give Up**: If players run out of attempts, more rows are automatically added
5. **Celebrate**: When solved, a special birthday celebration appears!

## 🌟 Features

- **Dynamic Grid Expansion**: Smooth animation from 5 to 18 columns
- **Infinite Attempts**: More rows added automatically when needed
- **Visual Feedback**: Green for correct letters, orange for letters in wrong positions
- **Mobile Responsive**: Works great on phones and tablets
- **Interactive Keyboard**: Click or type to play
- **Beautiful UI**: Modern design with animations and gradients

## 🚀 Getting Started

### Option 1: GitHub Pages (Recommended)

1. Fork this repository
2. Go to your repository settings
3. Scroll down to "Pages" section
4. Set source to "Deploy from a branch" and select "main"
5. Your game will be live at `https://yourusername.github.io/WordleClone`

### Option 2: Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Loffah/WordleClone.git
   cd WordleClone
   ```

2. Open `index.html` in your web browser

### Option 3: Other Hosting Services

You can also deploy to:
- **Netlify**: Drag and drop the files or connect your GitHub repo
- **Vercel**: Import from GitHub and deploy instantly
- **GitHub Codespaces**: Edit and preview in the browser

## 🎯 Customization

Want to customize for a different occasion? Edit `script.js`:

```javascript
// Change the target message (line 3)
this.target = "YOUR CUSTOM MESSAGE";

// Update the celebration text in index.html
<h2>🎉 YOUR CELEBRATION! 🎉</h2>
```

## 📱 Browser Support

- Chrome, Firefox, Safari, Edge (modern versions)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive Web App features coming soon!

## 🎨 Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Grid layout, animations, responsive design
- **JavaScript ES6+**: Game logic, DOM manipulation
- **No dependencies**: Pure vanilla web technologies

## 🤝 Contributing

Feel free to fork and customize for your own special occasions! Some ideas:
- Holiday themes
- Anniversary messages
- Congratulations for achievements
- Welcome messages for new team members

## 📝 License

This project is open source and available under the MIT License.

---

Made with ❤️ for special birthdays and celebrations!
