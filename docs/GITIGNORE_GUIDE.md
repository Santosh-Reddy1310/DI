# 🔒 .gitignore Guide

Complete guide to what's excluded from version control and why.

---

## 📋 Overview

The `.gitignore` file prevents sensitive data, build artifacts, and unnecessary files from being committed to your repository.

---

## 🔐 Environment Variables (Critical)

### Excluded
```
.env
.env.local
.env.production
.env.staging
.env*.local
```

**Why**: Contains sensitive API keys and credentials
- Supabase keys
- AI provider keys
- Database passwords
- Secret tokens

### Included
```
!.env.example
```

**Why**: Template file with no actual secrets, helps others set up the project

---

## 📦 Dependencies

### Excluded
```
node_modules/
.pnp
.pnp.js
```

**Why**: 
- Large folder (100+ MB)
- Can be regenerated with `npm install`
- Different across platforms
- Slows down Git operations

---

## 🏗️ Build Output

### Excluded
```
dist/
dist-ssr/
build/
.next/
out/
```

**Why**:
- Generated files
- Can be rebuilt with `npm run build`
- Large files
- Platform-specific

---

## 📝 Logs

### Excluded
```
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*
```

**Why**:
- Temporary debugging information
- Can contain sensitive data
- Not needed in version control
- Regenerated on each run

---

## 🧪 Testing

### Excluded
```
coverage/
.nyc_output/
*.lcov
.jest/
```

**Why**:
- Generated test reports
- Can be regenerated
- Large files
- Not needed in production

---

## 💾 Cache & Temporary Files

### Excluded
```
.cache/
.temp/
.tmp/
.vite/
.turbo/
.vercel/
.netlify/
```

**Why**:
- Temporary build cache
- Platform-specific
- Can be regenerated
- Speeds up local development only

---

## 💻 OS Files

### Excluded
```
.DS_Store          # macOS
Thumbs.db          # Windows
desktop.ini        # Windows
```

**Why**:
- Operating system metadata
- Not relevant to project
- Different across platforms
- Clutters repository

---

## 🛠️ Editor & IDE

### Excluded (Mostly)
```
.vscode/*          # VSCode settings
.idea/             # JetBrains IDEs
*.sublime-*        # Sublime Text
*.swp, *.swo       # Vim
```

### Included
```
!.vscode/extensions.json
!.vscode/settings.json
```

**Why Excluded**:
- Personal editor preferences
- Different for each developer
- Not relevant to project

**Why Some Included**:
- Shared project settings
- Recommended extensions
- Consistent formatting

---

## 🗄️ Supabase

### Excluded
```
supabase/.branches/
supabase/.temp/
.supabase/
```

**Why**:
- Local Supabase CLI data
- Temporary files
- Not needed in repository

### Included
```
supabase/schema.sql
supabase/SETUP_DELETE_ACCOUNT.sql
```

**Why**:
- Database schema (essential)
- Setup scripts (needed for deployment)

---

## 🔑 Sensitive Data (Extra Protection)

### Excluded
```
*.key
*.pem
*.p12
*.pfx
secrets/
credentials/
```

**Why**:
- SSL certificates
- Private keys
- Credentials files
- Security risk if committed

---

## 📦 Package Manager Locks

### Excluded
```
bun.lockb
```

### Optional (Commented)
```
# package-lock.json
# yarn.lock
# pnpm-lock.yaml
```

**Why Excluded (bun.lockb)**:
- Binary file
- Not human-readable
- Can cause merge conflicts

**Why Optional (others)**:
- Some teams commit lock files for consistency
- Others regenerate them
- Depends on team preference

**Recommendation**: 
- **Commit** `package-lock.json` for consistency
- **Exclude** `bun.lockb` (binary)

---

## 📚 Documentation

### Included (All)
```
*.md
docs/**/*.md
README.md
```

**Why**:
- Essential project documentation
- Helps other developers
- Deployment guides
- Feature documentation

---

## 🚀 Deployment

### Excluded
```
.env.production.local
.vercel/
.netlify/
```

**Why**:
- Platform-specific deployment data
- May contain secrets
- Regenerated on each deployment

---

## ✅ What Should Be Committed

### Essential Files
- ✅ Source code (`src/`)
- ✅ Public assets (`public/`)
- ✅ Configuration files (`package.json`, `tsconfig.json`, etc.)
- ✅ Database schema (`supabase/schema.sql`)
- ✅ Documentation (`*.md`, `docs/`)
- ✅ Environment template (`.env.example`)
- ✅ Git configuration (`.gitignore`, `.gitattributes`)

### Optional Files
- ⚠️ Lock files (`package-lock.json`) - Team decision
- ⚠️ Editor settings (`.vscode/settings.json`) - If shared

---

## ❌ What Should Never Be Committed

### Critical (Security Risk)
- ❌ Environment files with secrets (`.env`, `.env.local`)
- ❌ API keys and tokens
- ❌ Database passwords
- ❌ SSL certificates and private keys
- ❌ Credentials files

### Build Artifacts
- ❌ `node_modules/`
- ❌ `dist/`
- ❌ Build output

### Temporary Files
- ❌ Logs
- ❌ Cache
- ❌ OS files

---

## 🔍 Verify What's Ignored

### Check if file is ignored
```bash
git check-ignore -v filename
```

### List all ignored files
```bash
git status --ignored
```

### See what would be committed
```bash
git status
```

---

## 🚨 Emergency: Accidentally Committed Secrets

### If you committed sensitive data:

1. **Remove from Git history**
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

2. **Force push** (⚠️ Dangerous)
```bash
git push origin --force --all
```

3. **Rotate all secrets immediately**
- Change Supabase keys
- Regenerate AI API keys
- Update all credentials

4. **Add to .gitignore**
```bash
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Add .env to .gitignore"
```

**Better**: Use tools like [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/) or [git-secrets](https://github.com/awslabs/git-secrets)

---

## 🛡️ Prevention

### Pre-commit Hooks

Install git-secrets:
```bash
# macOS
brew install git-secrets

# Configure
git secrets --install
git secrets --register-aws
```

### Environment Variable Scanning

Use tools like:
- [truffleHog](https://github.com/trufflesecurity/trufflehog)
- [GitGuardian](https://www.gitguardian.com/)
- [detect-secrets](https://github.com/Yelp/detect-secrets)

---

## 📊 .gitignore Best Practices

### ✅ DO
- Keep .gitignore updated
- Add comments for clarity
- Group related patterns
- Use specific patterns
- Test with `git status`
- Review before committing

### ❌ DON'T
- Commit sensitive data
- Ignore too broadly (`*`)
- Forget to test
- Remove without checking
- Commit then ignore (won't work)

---

## 🔧 Common Patterns

### Ignore all files of type
```
*.log
*.tmp
*.cache
```

### Ignore folder
```
node_modules/
dist/
```

### Ignore except
```
*.env*
!.env.example
```

### Ignore in subdirectories
```
**/temp/
**/cache/
```

---

## 📝 Template for New Projects

```gitignore
# Environment
.env*
!.env.example

# Dependencies
node_modules/

# Build
dist/
build/

# Logs
*.log

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/*
!.vscode/extensions.json
.idea/

# Testing
coverage/

# Cache
.cache/
```

---

## 🔗 Resources

- [Git Documentation](https://git-scm.com/docs/gitignore)
- [GitHub .gitignore Templates](https://github.com/github/gitignore)
- [gitignore.io](https://www.toptal.com/developers/gitignore)

---

## ✅ Checklist

Before committing:
- [ ] Check `git status`
- [ ] Verify no `.env` files
- [ ] No `node_modules/`
- [ ] No build output
- [ ] No sensitive data
- [ ] Review changes with `git diff`

---

**Status**: ✅ Production-Ready .gitignore
**Last Updated**: February 3, 2026
