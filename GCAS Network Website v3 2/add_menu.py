import os
import glob

# Get all HTML files
html_files = glob.glob("*.html")

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Add desktop menu link after Stories
    if '<a href="stories.html">Stories</a>' in content:
        content = content.replace(
            '<a href="stories.html">Stories</a>',
            '<a href="stories.html">Stories</a>\n        <a href="services-fees.html">Services & fees</a>'
        )
        print(f"Updated desktop menu in: {file}")
    
    # Add mobile menu link after Client Stories  
    if '<a href="stories.html">Client Stories</a>' in content:
        content = content.replace(
            '<a href="stories.html">Client Stories</a>',
            '<a href="stories.html">Client Stories</a>\n    <a href="services-fees.html">Services & fees</a>'
        )
        print(f"Updated mobile menu in: {file}")
    
    with open(file, 'w') as f:
        f.write(content)

print("Done!")
EOFpython3 add_menu.py
grep -A2 "services-fees.html" index.html
cat > add_menu.py << 'EOF'
import glob

html_files = glob.glob("*.html")

for file in html_files:
    with open(file, 'r') as f:
        content = f.read()
    
    if '<a href="stories.html">Stories</a>' in content:
        content = content.replace(
            '<a href="stories.html">Stories</a>',
            '<a href="stories.html">Stories</a>\n        <a href="services-fees.html">Services & fees</a>'
        )
        print(f"Updated desktop menu in: {file}")
    
    if '<a href="stories.html">Client Stories</a>' in content:
        content = content.replace(
            '<a href="stories.html">Client Stories</a>',
            '<a href="stories.html">Client Stories</a>\n    <a href="services-fees.html">Services & fees</a>'
        )
        print(f"Updated mobile menu in: {file}")
    
    with open(file, 'w') as f:
        f.write(content)

print("Done!")
