<#
.SYNOPSIS
Generate social sharing image sizes from the authored Miru thumbnail.

.DESCRIPTION
Reads docs/public/miru-thumbnail.png and writes four JPEG variants to docs/public/social.
Uses proportional scaling and centered cropping at JPEG quality 92.
Run manually after replacing the source artwork; normal website builds do not call this script.
Requires Windows System.Drawing and leaves the source image unchanged.

.EXAMPLE
powershell -File scripts/generate-social-images.ps1
#>
Add-Type -AssemblyName System.Drawing
$sourcePath = Join-Path $PSScriptRoot '../docs/public/miru-thumbnail.png'
$outputDirectory = Join-Path $PSScriptRoot '../docs/public/social'
[System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)
$variants = @(
    @{ Name = 'miru-og-1200x630.jpg'; Width = 1200; Height = 630 },
    @{ Name = 'miru-twitter-1200x600.jpg'; Width = 1200; Height = 600 },
    @{ Name = 'miru-reka-1600x900.jpg'; Width = 1600; Height = 900 },
    @{ Name = 'miru-thumbnail-800x450.jpg'; Width = 800; Height = 450 }
)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }
$encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
    [System.Drawing.Imaging.Encoder]::Quality, [long]92
)
try {
    foreach ($variant in $variants) {
        $bitmap = [System.Drawing.Bitmap]::new($variant.Width, $variant.Height)
        $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
        try {
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
            # Center crop to fill each format; preserve proportions and all main content.
            $scale = [Math]::Max($variant.Width / $sourceImage.Width, $variant.Height / $sourceImage.Height)
            $cropWidth = $variant.Width / $scale
            $cropHeight = $variant.Height / $scale
            $sourceRect = [System.Drawing.RectangleF]::new(
                ($sourceImage.Width - $cropWidth) / 2, ($sourceImage.Height - $cropHeight) / 2,
                $cropWidth, $cropHeight
            )
            $destinationRect = [System.Drawing.RectangleF]::new(0, 0, $variant.Width, $variant.Height)
            $graphics.DrawImage($sourceImage, $destinationRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
            $destinationPath = Join-Path $outputDirectory $variant.Name
            $bitmap.Save($destinationPath, $jpegCodec, $encoderParameters)
            Get-Item -LiteralPath $destinationPath | Select-Object Name, Length
        }
        finally {
            $graphics.Dispose()
            $bitmap.Dispose()
        }
    }
}
finally {
    $encoderParameters.Dispose()
    $sourceImage.Dispose()
}
