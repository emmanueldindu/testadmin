import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const Pdf = ({ data }) => {
    const [numPages, setNumPages] = useState(null)

    const exportToPdf = () => {
        const blob = new Blob([data],  { type: 'application/pdf' })
        const url = URL.createObjectURL(blob);
        window.open(url)

    };

  return (
    <div>
          <button onClick={exportToPdf}>Export As PDF</button>
          <Document file={data}>
              <Page pageNumber={1} width={300} onLoadSuccess={({ numPages }) => setNumPages(numPages)} />
              
          </Document>
    </div>
  )
}

export default Pdf
