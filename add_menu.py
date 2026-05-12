import glob

html_files = glob.glob("*.html")

for file in html_files:
    # Skip financing.html as it's a standalone page
    if file == "financing.html":
        continue
    
    with open(file, 'r') as f:
        content = f.read()
    
    # Only add if not already present
    if 'services-fees.html' not in content:
        # Add to desktop navigation
        content = content.replace(
            '<a href="stories.html">Stories</a>',
            '<a href="stories.html">Stories</a>\n        <a href="services-fees.html">Services & fees</a>'
        )
        # Add to mobile navigation
        content = content.replace(
            '<a href="stories.html">Client Stories</a>',
            '<a href="stories.html">Client Stories</a>\n    <a href="services-fees.html">Services & fees</a>'
        )
        
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated: {file}")
    else:
        print(f"Already has link: {file}")

print("Done!")
