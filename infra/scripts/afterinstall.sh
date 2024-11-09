#!/bin/bash
export NVM_DIR="/home/ec2-user/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
chmod +x /home/ec2-user/sveltekit-test/build/afterinstall.sh
cd /home/ec2-user/sveltekit-test/build || exit
pnpm install
pm2 restart sveltekit-app || pm2 start index.js --name sveltekit-app --watch