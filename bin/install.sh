
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update
sudo apt install -y nodejs
sudo apt install -y npm
sudo npm i -g pm2

sudo apt-get install -y  yui-compressor

sudo apt-get install -y yarn

sudo apt-get install -y mysql-server
echo "building front end code ..."
cd ../frontend
yarn install
yarn build
#npm install
echo "building backend code ..."
cd ../backend
yarn install
yarn build
#npm install
echo "Installing NYDAX Database ..."
sudo mysql -e "CREATE DATABASE IF NOT EXISTS nydax;"
cd ../bin
echo "creating tables,this will take a while ..."
sudo mysql -uroot nydax < ../db/nydaxdb.sql 
sudo mysql -uroot nydax -e "grant all on nydax.* to 'nydax_user' identified by 'nydax_pass' "
sudo mysql -uroot nydax -e "flush privileges"
echo "NYDAX Exchange Platform installed succesfully,  to run the platform , please try ./start.sh"


