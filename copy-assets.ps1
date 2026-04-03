# Script to copy OSRS Tools assets to your public assets folder
# Run this whenever you update osrs-tools

param(
    [string]$AssetType = "caskets"
)

$osrsToolsPath = "node_modules/osrs-tools/public/assets"
$publicAssetsPath = "public/assets/items"

# Create directory if it doesn't exist
if (!(Test-Path $publicAssetsPath)) {
    New-Item -ItemType Directory -Path $publicAssetsPath -Force | Out-Null
    Write-Host "Created directory: $publicAssetsPath"
}

switch ($AssetType) {
    "caskets" {
        Copy-Item "$osrsToolsPath/items/reward-casket-*.png" -Destination $publicAssetsPath -Force
        Write-Host "Copied casket images"
    }
    "items" {
        Copy-Item "$osrsToolsPath/items/*.png" -Destination $publicAssetsPath -Force
        Write-Host "Copied all item images"
    }
    "all" {
        Copy-Item "$osrsToolsPath/items/*.png" -Destination $publicAssetsPath -Force
        Write-Host "Copied all images from osrs-tools"
    }
    default {
        Write-Host "Usage: .\copy-assets.ps1 -AssetType [caskets|items|all]"
        Write-Host "Example: .\copy-assets.ps1 -AssetType caskets"
    }
}
