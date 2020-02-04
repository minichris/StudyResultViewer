rmdir assets\Data -r
robocopy Data assets\Data /E
cd assets\Data
del /f foldername.txt
FOR /F "usebackq tokens=*" %%d IN (`DIR /b /o:n /ad`) DO (ECHO>>foldername.txt %%d)
cd ..\..
npm run start