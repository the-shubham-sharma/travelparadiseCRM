$projectRoot = "c:\Users\Shubham_Sharma\OneDrive\Desktop\travelparadise crmworkflow"
$distFolder = "$projectRoot\dist"
$zipInProject = "$projectRoot\travel-paradise-flowchart-website.zip"
$zipOnDesktop = "c:\Users\Shubham_Sharma\OneDrive\Desktop\travel-paradise-flowchart-website.zip"

if (Test-Path $zipInProject) { Remove-Item $zipInProject -Force }
if (Test-Path $zipOnDesktop) { Remove-Item $zipOnDesktop -Force }

Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($distFolder, $zipInProject, [System.IO.Compression.CompressionLevel]::Optimal, $false)

Copy-Item $zipInProject -Destination $zipOnDesktop -Force

Write-Host "ZIP created successfully at:"
Write-Host "1. $zipInProject"
Write-Host "2. $zipOnDesktop"
