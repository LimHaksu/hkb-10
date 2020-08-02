cd front/ && yarn build

cd dist && pm2 start "lite-server"

cd ../../back && pm2 start "yarn start"