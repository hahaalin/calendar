# 發生錯誤時執行終止指令
set -e

# 打包編譯
npm run build

# 移動到打包資料夾下
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
git push -f https://github.com/hahaalin/calendar.git master:gh-pages

cd -