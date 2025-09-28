@echo off
echo INICIANDO BACKEND FAKE PARA TESTES. NAO FECHE ESSA JANELA!

echo.
echo.

@echo off
echo Navegar ate a pasta /movies-api
@echo on
cd /d "%~dp0movies-api"

echo.
echo.

@echo off
echo Instalar dependencias e Iniciar a aplicacao
@echo on
npm install && npm run start
@echo off

echo.
echo.

echo BACKEND FAKE INICIADO. MANTENHA ESSA JANELA ABERTA DURANTE O USO DA APLICACAO!
@echo on

pause
