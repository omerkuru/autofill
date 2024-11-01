import { getSpreadsheetData } from './dataReader.js'
import path from 'path'

const generateFillerData = (inputData, fileNameTemplate, __dirname) => {
    const data = getSpreadsheetData(inputData.dataFile, __dirname)
    const rowsPerPage = inputData.totalRowsToFill
    const fillerData = []
    let rowIndex = 0, pageIndex = 0

    for (const userData of data) {
        let outputPath

        try {
            const pathSuffix = fileNameTemplate.map(item =>
                typeof item === 'number' ? (userData[item - 1] || '') : item
            ).join('') + ".png"
            outputPath = pathSuffix
        } catch {
            outputPath = `output${pageIndex}.png`
        }
        outputPath = path.join(__dirname, '../outputs/img', outputPath)

        if (rowIndex === 0) {
            fillerData.push({
                outputImagePath: outputPath,
                textEntries: []
            })
        }

        inputData.textEntries[rowIndex].forEach(({ columnIndex, xPosition, yPosition, fontsize, maxWidth, alignment, fontFamily, fontColor }) => {
            const textValue = userData[columnIndex - 1] || ''
            fillerData[pageIndex].textEntries.push({
                text: textValue,
                xPosition,
                yPosition,
                fontsize: fontsize,
                maxWidth,
                alignment,
                fontFamily,
                fontColor
            })
        })

        // Move to the next page when rows per page limit is reached
        if (++rowIndex === rowsPerPage) {
            rowIndex = 0
            pageIndex++
        }
    }

    return fillerData
}

export { generateFillerData }