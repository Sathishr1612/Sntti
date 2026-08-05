$files = Get-ChildItem -Path "e:\My-Projects-Sathish\Sntti" -Recurse -Include *.html,*.css -Exclude node_modules
foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $original = $content
    
    $content = $content -replace 'â€¢', '•'
    $content = $content -replace 'â€“', '–'
    $content = $content -replace 'â€”', '—'
    $content = $content -replace 'â€™', "'"
    $content = $content -replace 'â€œ', '"'
    $content = $content -replace 'â€', '"'
    $content = $content -replace 'â†’', '→'
    $content = $content -replace 'â€', '"'
    $content = $content -replace 'Â£', '£'
    $content = $content -replace 'Â©', '©'
    $content = $content -replace 'Â ', ' '
    $content = $content -replace 'Â', ''
    
    if ($content -cne $original) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Fixed encoding in $($file.Name)"
    }
}
Write-Host "Encoding fix complete."
