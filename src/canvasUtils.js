import { createCanvas, loadImage, registerFont } from 'canvas'
import path from 'path'
import fs from 'fs'

registerFont(path.join(process.cwd(), '../fonts', 'PinyonScript-Regular.ttf'), { family: 'PinyonScript' })
registerFont(path.join(process.cwd(), '../fonts', 'Roboto-Regular.ttf'), { family: 'Roboto' })
registerFont(path.join(process.cwd(), '../fonts', 'Nunito-Regular.ttf'), { family: 'Nunito' })

const initializeCanvasWithImage = async (imagePath) => {
    try {
        const image = await loadImage(imagePath)
        const canvas = createCanvas(image.width, image.height)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(image, 0, 0, image.width, image.height)
        canvas.isImageDrawn = true
        return { canvas, ctx }
    } catch (error) {
        console.error('Error loading image onto canvas:', error)
        throw error
    }
}

const saveCanvasAsImage = (outputPath, canvas) => {
    try {
        const buffer = canvas.toBuffer('image/png')
        fs.writeFileSync(outputPath, buffer)
        console.log(`Image saved successfully at: ${outputPath}`)
    } catch (error) {
        console.error('Error saving canvas as image:', error)
        throw error
    }
}

const getImageSizes = async (imagePath) => {
    try {
        const image = await loadImage(imagePath)
        const width = image.width
        const height = image.height
        return { width, height }
    } catch (error) {
        console.error('Error loading image onto canvas:', error)
        throw error
    }
}

export { initializeCanvasWithImage, saveCanvasAsImage, getImageSizes }