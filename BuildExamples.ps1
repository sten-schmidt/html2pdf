Remove-Item .\Examples\*.pdf
node html2pdf.js --html=Examples/Example1/index.html --css=Examples/Example1/more.css --pdf=Examples/Example1.pdf
node html2pdf.js --html=Examples/Example1/index.html --pdf=Examples/Example_NoCss.pdf