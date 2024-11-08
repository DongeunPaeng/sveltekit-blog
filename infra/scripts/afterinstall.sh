#!/bin/bash
chmod +x /home/ec2-user/sveltekit-test/build/afterinstall.sh
cd /home/ec2-user/sveltekit-test/build/afterinstall.sh || return
pnpm install