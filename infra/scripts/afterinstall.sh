#!/bin/bash
chmod +x /home/ec2-user/sveltekit-test/build/afterinstall.sh
cd /home/ec2-user/sveltekit-test/build || exit
/home/ec2-user/.nvm/versions/node/v21.7.3/bin/pnpm install