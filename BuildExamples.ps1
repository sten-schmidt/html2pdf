Remove-Item .\TestOutput\*.pdf
node html2pdf.js --html=TestInput/Example1/index.html --css=TestInput/Example1/more.css --pdf=TestOutput/Example1.pdf
node html2pdf.js --html=TestInput/Example1/index.html --pdf=TestOutput/Example_NoCss.pdf