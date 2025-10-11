# Digital Ocean Coolify Deployment Guide

This guide provides step-by-step instructions for deploying the Charette System to Digital Ocean using Coolify.

## Prerequisites

- A [Digital Ocean](https://www.digitalocean.com/) account
- A [Coolify](https://coolify.io/) instance running on Digital Ocean
- [Git](https://git-scm.com/) installed on your local machine
- A GitHub repository containing your Charette System code

## Setup Steps

### 1. Prepare Your Repository

1. Ensure your code is pushed to a GitHub repository
2. Make sure the following files are present in your repository:
   - `Dockerfile`
   - `docker-compose.yml`
   - `.env.example`
   - `coolify-deploy.sh`

### 2. Set Up Coolify on Digital Ocean

1. Create a Digital Ocean Droplet
   - Choose a plan with at least 2GB RAM
   - Select Ubuntu 20.04 or later
   - Add your SSH key for secure access

2. Install Coolify on your Droplet
   ```bash
   wget -q [https://get.coolify.io](https://get.coolify.io) -O install.sh
   sudo bash ./install.sh