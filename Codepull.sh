#!/bin/bash
#当前目录上层路径
BASEPATH=$(dirname $(pwd))

#版本备份路径
BACKDIR=$BASEPATH/backup

#版本部署路径
LOCAL_DIR=h5UninSystem

cd $BASEPATH
#包名称
PACK=$BACKDIR/h5UninSystem`date +%Y%m%d%H%M`.tar.gz
echo $PACK
tar -czf $PACK  $LOCAL_DIR
sleep 1
cd $BASEPATH/$LOCAL_DIR

git pull origin master
sleep 2
sudo chown -R www:www ${BASEPATH}/${LOCAL_DIR}
sudo chmod  a+x Codepull.sh




