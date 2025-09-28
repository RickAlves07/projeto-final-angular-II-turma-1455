@echo off
echo INICIANDO FRONTEND E BACKEND. NAO FECHE ESSA JANELA! ELA FECHARA AUTOMATICAMENTE!
@echo on

echo Iniciar o script do frontend
start "" init-setup-frontend.bat

echo Iniciar o script do backend
start "" init-setup-backend.bat

echo TODOS OS PROCESSOS FORAM INICIADOS. FECHANDO JANELA AUTOMATICAMENTE...
exit
