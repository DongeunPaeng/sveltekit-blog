#!/bin/bash
chmod +x /home/ec2-user/afterinstall.sh
cd /home/ec2-user/afterinstall.sh || return
pnpm install