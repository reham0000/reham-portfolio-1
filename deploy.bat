@echo off
set KEY="D:\All Downloads\reham.pem"
set SERVER=ubuntu@13.238.115.171

call npm run build
if errorlevel 1 (echo Build failed & exit /b 1)

scp -i %KEY% -r dist %SERVER%:~/
if errorlevel 1 (echo Upload failed & exit /b 1)

ssh -i %KEY% %SERVER% "rm -rf /var/www/rehamportfolio/* && cp -r ~/dist/* /var/www/rehamportfolio/ && rm -rf ~/dist"
if errorlevel 1 (echo Deploy failed & exit /b 1)

echo Deployed: https://rehamportfolio.duckdns.org