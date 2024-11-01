import { generateFillerData } from './fillerDataGenerator.js'
import { generatePages } from './pageGenerator.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import { createPDF } from './pdfGenerator.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

try {
    let config = fs.readFileSync('../inputs/config.json', 'utf8')
    config = JSON.parse(config)
    const fillerData = generateFillerData(config.inputData, config.fileNameTemplate, __dirname)
    await generatePages(fillerData, config.image, __dirname)
    
    if(config.createPDF)
    {
        const pdfPath = path.join(__dirname, '../outputs/output.pdf')
        await createPDF(fillerData, pdfPath.toString())
    }
        
} catch (err) {
    console.error("Dosya okunamadı:", err)
}