#!/bin/bash
chmod +x /home/ec2-user/afterinstall.sh
echo '{"type": "module"}' > /home/ec2-user/sveltekit-test/build/package.json