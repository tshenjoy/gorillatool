# Git Cheatsheet for Starland Machinery Website

## Your Working Folder
```
/proj/feintcad3/shihang/mess/web_trial/tshenjoy.github.io_starlandmech/
```

## Daily Workflow (3 Steps)

### Step 1: Edit your files
Edit HTML, CSS, images, etc. in the folder above.

### Step 2: Commit your changes
```bash
cd /proj/feintcad3/shihang/mess/web_trial/tshenjoy.github.io_starlandmech

git status              # See what changed
git add .               # Stage all changes
git commit -m "Your message here"   # Save changes
```

### Step 3: Push to make it live
```bash
git push                # Upload to GitHub - site updates in ~1 min
```

---

## Common Commands

| Command | What it does |
|---------|--------------|
| `git status` | See what files changed |
| `git diff` | See exact changes in files |
| `git add .` | Stage ALL changes |
| `git add filename` | Stage ONE specific file |
| `git commit -m "msg"` | Save staged changes with a message |
| `git push` | Upload to GitHub (makes site live) |
| `git pull` | Download latest from GitHub |
| `git log --oneline -5` | See last 5 commits |

---

## Undo Mistakes

| Situation | Command |
|-----------|---------|
| Undo changes to a file (not yet staged) | `git checkout -- filename` |
| Unstage a file (added but not committed) | `git reset HEAD filename` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |

---

## Quick One-Liner to Update Site

```bash
cd /proj/feintcad3/shihang/mess/web_trial/tshenjoy.github.io_starlandmech && git add . && git commit -m "Update site" && git push
```

---

## Useful Info

- **Live site URL**: https://tshenjoy.github.io/
- **GitHub repo**: https://github.com/tshenjoy/tshenjoy.github.io
- **Branch**: starlandmech

## Switch Back to Old Personal Site
```bash
gh api repos/tshenjoy/tshenjoy.github.io/pages -X PUT --field 'source[branch]=cloud_version' --field 'source[path]=/docs'
```

## Switch to Starland Machinery Site
```bash
gh api repos/tshenjoy/tshenjoy.github.io/pages -X PUT --field 'source[branch]=starlandmech' --field 'source[path]=/'
```
