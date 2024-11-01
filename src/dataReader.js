import fs from 'fs'
import path from 'path'
import xlsx from 'xlsx'

const getSpreadsheetData = (filePath, __dirname) => {
    try {
        const fullPath = path.resolve(__dirname, filePath)

        if (!fs.existsSync(fullPath)) {
            throw new Error(`File not found: ${fullPath}`)
        }
        
        const workbook = xlsx.readFile(fullPath)
        const sheetName = workbook.SheetNames[0]  
        const worksheet = workbook.Sheets[sheetName]
        const rows = xlsx.utils.sheet_to_json(worksheet, { header: 1 })
        return rows 
    } catch (error) {
        console.error(`Error reading data from file: ${error.message}`)
        return []
    }
}

export { getSpreadsheetData }