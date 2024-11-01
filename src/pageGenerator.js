import { drawTextOnCanvas } from "./textUtils.js"
import path from 'path'
import fs from 'fs'
import { initializeCanvasWithImage, saveCanvasAsImage } from "./canvasUtils.js"

const createPages = async (inputImagePath, outputImagePath, textEntries) => {
    try {
        const { canvas, ctx } = await initializeCanvasWithImage(inputImagePath)
        textEntries.forEach(({ text, xPosition, yPosition, fontsize, maxWidth, alignment, fontFamily, fontColor }) => {
            drawTextOnCanvas(ctx, text, xPosition, yPosition, fontsize, alignment, fontFamily, fontColor, maxWidth)
        })
        saveCanvasAsImage(outputImagePath, canvas)
    } catch (error) {
        console.error('An error occurred while generating the page: ', error)
    }
}

const clearDirectoryContentsSync = (dirPath) => {
    const files = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const file of files) {
        const filePath = `${dirPath}/${file.name}`

        if (file.isDirectory()) {
            fs.rmSync(filePath, { recursive: true, force: true })
        } else {
            fs.unlinkSync(filePath)
        }
    }
}

const prepareImageDirectory = (__dirname) => {
    const imgDir = path.join(__dirname, '../outputs/img')

    if (!fs.existsSync(imgDir)) {
        fs.mkdirSync(imgDir)
    }else{
        clearDirectoryContentsSync(imgDir)
    }
}

const generatePages = async (pagesData, image, __dirname) => {
    prepareImageDirectory(__dirname)
    
    for (const page of pagesData) {
        await createPages(image, page.outputImagePath, page.textEntries)
    }
}

export { generatePages }