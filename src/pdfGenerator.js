import PDFDocument from 'pdfkit'
import fs from 'fs'
import { getImageSizes } from './canvasUtils.js'

const createPDF = async (fillerData, pdfOutputPath) => {
    try {
        const pdf = new PDFDocument({ autoFirstPage: false })
        const writeStream = fs.createWriteStream(pdfOutputPath)
        pdf.pipe(writeStream)

        for(const data of fillerData){
            const imagePath = data.outputImagePath
            const {width, height} = await getImageSizes(imagePath)
            pdf.addPage({ size: [width, height] })
            pdf.image(imagePath, 0, 0, { width: width, height: height })
        }

        pdf.end()
        writeStream.on('finish', () => {
            console.log(`PDF created successfully at: ${pdfOutputPath}`)
        })
    } catch (error) {
        console.error('Error creating PDF:', error)
    }
}

export { createPDF }