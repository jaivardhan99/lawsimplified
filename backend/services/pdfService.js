import puppeteer from 'puppeteer';

export const htmlToPdf = async (htmlContent) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();

        // Wrap content in proper HTML structure
        const fullHtml = `
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        body { margin: 0; padding: 0; }
                    </style>
                </head>
                <body>
                    ${htmlContent}
                </body>
            </html>
        `;

        await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                bottom: '20px',
                left: '20px',
                right: '20px',
            },
        });

        await browser.close();
        return pdfBuffer;
    } catch (error) {
        console.error('Puppeteer error:', error);
        throw new Error('PDF Generation failed');
    }
};
