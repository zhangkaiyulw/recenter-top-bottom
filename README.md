# Recenter Top Bottom

Reposition current line at center, top, or bottom. Multiple cursors are
supported.

By default, `Recenter Top Bottom` doesn't bind to any key bindings. It's user's
right to decide which command goes to which key binding. This is a very handy
editor command, you may not want to invoke it through command palette.

If you are an previously emacs user, you may want to add these to your
`keybindings.json`.

```json
{
  "key": "ctrl+l",
  "command": "recenterTopBottom",
  "when": "textInputFocus"
}
```

## Need Help?

Open an issue [here](https://github.com/zhangkaiyulw/recenter-top-bottom/issues).

## License

[MIT](https://github.com/zhangkaiyulw/recenter-top-bottom/blob/master/LICENSE) @ Victor Zhang
