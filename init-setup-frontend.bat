@echo off
echo INICIANDO APLICACAO FRONTEND. NAO FECHE ESSA JANELA!

echo.
echo.

@echo off
echo Instalar o Angular CLI na versao 20 dependencias e Iniciar a aplicacao
@echo on
npm install @angular/cli@20.1.0 && npm install && npm run start
@echo off

echo.
echo.

echo FRONTEND INICIADO. MANTENHA ESSA JANELA ABERTA DURANTE O USO DA APLICACAO!
@echo on

pause
