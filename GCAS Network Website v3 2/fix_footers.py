import re

# Read contact.html to get the correct footer
with open('contact.html', 'r') as f:
    contact_content = f.read()

# Extract the exact footer from contact.html
footer_match = re.search(r'(<footer class="footer">.*?</footer>)', contact_content, re.DOTALL)
if not footer_match:
    print("ERROR: Could not find footer in contact.html")
    exit(1)

CORRECT_FOOTER = footer_match.group(1)

# List all HTML files to update
files_to_fix = ['index.html', 'method.html', 'network.html', 'compliance.html', 
                'sba.html', 'stories.html', 'specialties.html', 'contract-vehicles.html',
                'consulting.html', 'mentorship.html', 'qualify.html', 'services-fees.html']

for filename in files_to_fix:
    try:
        with open(filename, 'r') as f:
            content = f.read()
        
        # Remove ALL existing footers
        content = re.sub(r'<footer class="footer">.*?</footer>', '', content, flags=re.DOTALL)
        
        # Insert the correct footer before the closing body tag
        content = content.replace('</body>', CORRECT_FOOTER + '\n</body>')
        
        with open(filename, 'w') as f:
            f.write(content)
        
        # Verify
        footer_count = content.count('<footer class="footer">')
        print(f'{filename}: {footer_count} footer(s) - OK' if footer_count == 1 else f'{filename}: {footer_count} footer(s)')
    
    except FileNotFoundError:
        print(f'Skipping {filename} - not found')

print('\nDone!')
