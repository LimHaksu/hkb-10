cd front/ && yarn build

cd dist && pm2 start "sudo http-server-spa ./ ./index.html 80"

cd ../../back && pm2 start "yarn start"