local_hash=$(git rev-parse release)
remote_hash=$(git rev-parse origin/release)

if [ ${local_hash} != ${remote_hash} ];then
  git pull && si ./build.sh
fi 
