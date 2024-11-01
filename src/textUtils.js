const drawTextOnCanvas = (ctx, text, xPosition, yPosition, fontsize, alignment = 'center', fontFamily = 'Roboto', fontColor = 'black', maxWidth = null) => {
    ctx.font = `${fontsize}px ${fontFamily}`
    ctx.fillStyle = fontColor
    ctx.textAlign = alignment
    ctx.textBaseline = 'middle'
    
    if (maxWidth) {
        wrapText(ctx, text, xPosition, yPosition, maxWidth, fontsize * 1.2)
    } else {
        ctx.fillText(text, xPosition, yPosition)
    }
}

const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ')
    let line = ''

    words.forEach((word) => {
        const testLine = line + word + ' '
        const testWidth = ctx.measureText(testLine).width

        if (testWidth > maxWidth && line) {
            ctx.fillText(line, x, y)
            line = word + ' '
            y += lineHeight
        } else {
            line = testLine
        }
    })
    
    ctx.fillText(line, x, y)
}

export { drawTextOnCanvas, wrapText }