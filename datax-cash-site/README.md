# datax.cash Website

This is the official website for datax.cash - a free desktop application for deploying and managing data tools across multiple hosts using Docker containers.

## About datax

datax is a free (but not open source) desktop application that provides:
- **Docker App Store**: Deploy databases and data tools with one click
- **Multi-Host Management**: Manage multiple remote servers via SSH
- **Data Tools Suite**: PostgreSQL, MySQL, MongoDB, Redis, Apache Spark, Jupyter, and more
- **Cross-Platform**: Available for Windows, macOS, and Linux

## Website Structure

- `index.html` - Homepage with overview and download links
- `features.html` - Detailed feature descriptions
- `pricing.html` - Pricing information (FREE)
- `docs.html` - Documentation and user guide
- `test-links.html` - Link testing page (development only)

## Quick Preview

- Open `index.html` in a browser (Tailwind CDN is used for quick preview).

Build (optional)

- For production Tailwind builds, install Node.js and run Tailwind CLI as described in `tailwind.config.js` comments.

Deployment

- GitHub Pages: push this folder to a repo and enable GitHub Pages from root or `gh-pages` branch.
- Nginx: see `nginx/example_nginx.conf` for JSON access_log and a downloads location example. Prefer serving large downloads via Nginx/X-Accel-Redirect or object storage.

Logs & downloads

- Access logs: JSON format recommended in `nginx/example_nginx.conf`.
- Download tracking: place downloadable assets under `/downloads/` and use X-Accel-Redirect for access-logging and authorization.

Privacy

- Consider IP minimization or hashing before long-term storage. Keep retention short and restrict access to logs.

Files of interest

- `assets/images/logo.svg` — brand icon (no slogan text embedded)
- `assets/images/slogan.txt` — slogan text (separate resource)
- `i18n/` — translation JSON files
- `nginx/example_nginx.conf` — example server config with JSON logs

License: MIT (example)
