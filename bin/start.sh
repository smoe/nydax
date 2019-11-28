source ../bin/config.env
pm2 start  ../frontend/build/server.js ../backend/build/server.js 
echo "NYDAX Exchange platform is started , please browse http://$FIP:$HTTP_PORT "
